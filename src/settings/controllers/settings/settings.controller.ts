import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { UserId } from 'src/common/decorators/user-id.decorator';
import { HttpResponse } from 'src/common/interfaces/http-response.interface';
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
  ): HttpResponse<Settings> {
    const data = await this._settingsService.updateSettings(user, settings);

    return { data };
  }

  @Get()
  public async getSettings(@UserId() user: string): HttpResponse<Settings> {
    const data = await this._settingsService.getSettings(user);

    return { data };
  }
}
