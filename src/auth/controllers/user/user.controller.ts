import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/auth/guards/admin/admin.guard';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { User } from 'src/auth/schemas/user.schema';
import { UserService } from 'src/auth/services/user/user.service';
import { HttpResponse } from 'src/common/interfaces/http-response.interface';

@Controller('users')
@UseGuards(AuthGuard, AdminGuard)
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get()
  public async getAll(): HttpResponse<User[]> {
    const data = await this._userService.getAll();

    return { data };
  }

  @Delete('/:userId')
  public async deleteOne(@Param('userId') userId: string): Promise<void> {
    await this._userService.deleteOne(userId);
  }
}
