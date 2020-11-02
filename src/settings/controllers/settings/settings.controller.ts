import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { UserId } from 'src/common/decorators/user-id.decorator';
import { HttpResponse } from 'src/common/interfaces/http-response.interface';
import { ISettingsMeta } from 'src/settings/interfaces/settings-meta.interface';
import { Settings } from 'src/settings/schemas/settings.schema';
import { SettingsService } from 'src/settings/services/settings/settings.service';
import { UpdateSettings } from 'src/settings/transfer-objects/update-settings.dto';

@Controller('settings')
@UseGuards(AuthGuard)
export class SettingsController {
  constructor(private readonly _settingsService: SettingsService) {}

  @Put()
  public async updateSettings(
    @UserId() user: string,
    @Body() settings: UpdateSettings
  ): HttpResponse<Settings, ISettingsMeta> {
    const data = await this._settingsService.updateSettings(user, settings);
    const meta = this._createSettingsMeta(data);

    return { data, meta };
  }

  @Get()
  public async getSettings(
    @UserId() user: string
  ): HttpResponse<Settings, ISettingsMeta> {
    const data = await this._settingsService.getSettings(user);
    const meta = this._createSettingsMeta(data);

    return { data, meta };
  }

  private _createSettingsMeta(data: Settings): ISettingsMeta {
    return {
      netWorthSummaryItems: {
        sumOf: {
          options: [...data.netWorthFields, 'change', 'total']
        }
      }
    };
  }
}
