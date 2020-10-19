import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { UserId } from 'src/common/decorators/user-id.decorator';
import { HttpResponse } from 'src/common/interfaces/http-response.interface';
import { INetWorthMeta } from 'src/net-worth/interfaces/net-worth-meta.interface';
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
    private readonly _settingsService: SettingsService
  ) {}

  @Post()
  public async create(
    @Body() body: INetWorthCreate,
    @UserId() user: string
  ): HttpResponse<NetWorth> {
    const data = await this._netWorthService.createEntry(body, user);

    return { data };
  }

  @Get()
  public async getAll(
    @UserId() user: string
  ): HttpResponse<NetWorthResponse[], INetWorthMeta> {
    const [data, settings] = await Promise.all([
      this._netWorthService.getAll(user),
      this._settingsService.getSettings(user)
    ]);

    const meta = {
      fields: ['date', ...settings.netWorthFields, 'total', 'change'],
      summaryItems: this._netWorthService.getSummaryItemsMeta(
        data[0],
        settings.netWorthSummaryItems
      )
    };

    return { data, meta };
  }
}
