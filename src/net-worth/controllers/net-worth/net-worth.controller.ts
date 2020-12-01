import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { UserSettingsService } from 'src/auth/services/user-settings/user-settings.service';
import { UserId } from 'src/common/decorators/user-id.decorator';
import { HttpResponse } from 'src/common/interfaces/http-response.interface';
import { INetWorthCustomValues } from 'src/net-worth/interfaces/net-worth-log.interface';
import { INetWorthMeta } from 'src/net-worth/interfaces/net-worth-meta.interface';
import { INetWorthSingleMeta } from 'src/net-worth/interfaces/net-worth-single-meta.interface';
import { NetWorth } from 'src/net-worth/schemas/net-worth.schema';
import { NetWorthProjectionService } from 'src/net-worth/services/net-worth-projection/net-worth-projection.service';
import { NetWorthService } from 'src/net-worth/services/net-worth/net-worth.service';
import { INetWorthCreate } from 'src/net-worth/transfer-objects/net-worth-create.dto';
import { NetWorthResponse } from 'src/net-worth/transfer-objects/net-worth-response.dto';
import { SettingsService } from 'src/settings/services/settings/settings.service';

@Controller('net-worth')
@UseGuards(AuthGuard)
export class NetWorthController {
  constructor(
    private readonly _netWorthService: NetWorthService,
    private readonly _settingsService: SettingsService,
    private readonly _userSettingsService: UserSettingsService,
    private readonly _netWorthProjectionService: NetWorthProjectionService
  ) {}

  @Post()
  public async create(
    @Body() body: INetWorthCreate,
    @UserId() user: string
  ): HttpResponse<NetWorth> {
    const data = await this._netWorthService.createEntry(body, user);

    return { data };
  }

  @Get('/:netWorthDate')
  public async getNetWorthEntry(
    @UserId() userId: string,
    @Param('netWorthDate') date: string
  ): HttpResponse<NetWorth, INetWorthSingleMeta> {
    const data = await this._netWorthService.getOne(date, userId);
    const fields = await this._netWorthService.getAllFieldsFromCurrentResourceAndActiveFields(
      userId,
      data
    );

    const meta = {
      fields
    };

    return { data, meta };
  }

  @Put('/:netWorthDate')
  public async updateLog(
    @UserId() userId: string,
    @Body() body: INetWorthCustomValues,
    @Param('netWorthDate') date: string
  ): HttpResponse<NetWorth> {
    const data = await this._netWorthService.updateLogByDate(
      date,
      body,
      userId
    );

    return { data };
  }

  @Delete('/:netWorthDate')
  public async deleteOne(
    @UserId() user: string,
    @Param('netWorthDate') date: string
  ): Promise<void> {
    await this._netWorthService.deleteOne(user, date);
  }

  @Get()
  public async getAll(
    @UserId() user: string
  ): HttpResponse<NetWorthResponse[], INetWorthMeta> {
    const [data, settings, preferredCurrency] = await Promise.all([
      this._netWorthService.getAll(user),
      this._settingsService.getSettings(user),
      this._userSettingsService.getPreferredCurrency(user)
    ]);

    const barChartData =
      data.length &&
      this._netWorthService.getSortedAndGroupedValues(
        data[0].customValues,
        settings.netWorthFields
      );

    const meta: INetWorthMeta = {
      fields: ['date', ...settings.netWorthFields, 'total', 'change'],
      preferredCurrency,
      summaryItems: this._netWorthService.getSummaryItemsMeta(
        data[0],
        settings.netWorthSummaryItems
      ),
      barChartData,
      projectedNetWorth: this._netWorthProjectionService.getProjectedNetWorth(
        data
      )
    };

    return { data, meta };
  }
}
