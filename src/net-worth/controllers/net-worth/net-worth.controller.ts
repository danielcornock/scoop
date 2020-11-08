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
import { INetWorthMeta } from 'src/net-worth/interfaces/net-worth-meta.interface';
import { INetWorthUpdate } from 'src/net-worth/interfaces/net-worth-update.interface';
import { NetWorth } from 'src/net-worth/schemas/net-worth.schema';
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
    private readonly _userSettingsService: UserSettingsService
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
  ): HttpResponse<NetWorth> {
    const data = await this._netWorthService.getNetWorthLogEntry(date, userId);

    return { data };
  }

  @Put('/:netWorthDate')
  public async updateLog(
    @UserId() userId: string,
    @Body() body: INetWorthUpdate,
    @Param('netWorthDate') date: string
  ): HttpResponse<NetWorth> {
    const data = await this._netWorthService.updateLogByDate(
      date,
      body.customValues,
      userId
    );

    return { data };
  }

  @Delete('/:netWorthDate')
  public deleteOne(
    @UserId() user: string,
    @Param('netWorthDate') date: string
  ): Promise<void> {
    return this._netWorthService.deleteOne(user, date);
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

    const meta = {
      fields: ['date', ...settings.netWorthFields, 'total', 'change'],
      preferredCurrency,
      summaryItems: this._netWorthService.getSummaryItemsMeta(
        data[0],
        settings.netWorthSummaryItems
      )
    };

    return { data, meta };
  }
}
