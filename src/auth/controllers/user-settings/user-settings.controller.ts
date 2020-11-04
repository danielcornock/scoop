import { Controller, Get, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { UserSettings } from 'src/auth/schemas/user-settings.schema';
import { UserSettingsService } from 'src/auth/services/user-settings/user-settings.service';
import { UpdateUserSettingsRequest } from 'src/auth/transfer-objects/update-user-settings-request.dto';
import { UserId } from 'src/common/decorators/user-id.decorator';
import { HttpResponse } from 'src/common/interfaces/http-response.interface';

@Controller('user-settings')
@UseGuards(AuthGuard)
export class UserSettingsController {
  constructor(private readonly _userSettingsService: UserSettingsService) {}

  @Get()
  public async getSettings(
    @UserId() userId: string
  ): HttpResponse<UserSettings> {
    const data = await this._userSettingsService.getSettings(userId);

    return { data };
  }

  @Put()
  public async updateSettings(
    @UserId() userId: string,
    settings: UpdateUserSettingsRequest
  ): HttpResponse<UserSettings> {
    const data = await this._userSettingsService.updateSettings(
      settings,
      userId
    );

    return { data };
  }
}
