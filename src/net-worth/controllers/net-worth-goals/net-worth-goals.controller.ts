import { BadRequestException, Body, Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { UserId } from 'src/common/decorators/user-id.decorator';
import { HttpResponse } from 'src/common/interfaces/http-response.interface';
import { NetWorthGoal } from 'src/net-worth/schemas/net-worth-goals.schema';
import { NetWorthGoalsService } from 'src/net-worth/services/net-worth-goals/net-worth-goals.service';
import { NetWorthService } from 'src/net-worth/services/net-worth/net-worth.service';
import { CreateNetWorthGoalRequest } from 'src/net-worth/transfer-objects/net-worth-goal-create.dto';

@Controller('net-worth-goals')
@UseGuards(AuthGuard)
export class NetWorthGoalsController {
  constructor(
    private readonly _netWorthGoalsService: NetWorthGoalsService,
    private readonly _netWorthService: NetWorthService
  ) {}

  @Post()
  public async create(
    @UserId() userId: string,
    @Body() body: CreateNetWorthGoalRequest
  ): HttpResponse<NetWorthGoal> {
    if (body.fields.includes('total') && body.fields.length > 1) {
      throw new BadRequestException(
        'If choosing to measure your total net worth, you cannot include other fields!'
      );
    }

    const [lastEntry] = await this._netWorthService.getAll(userId);

    const data = await this._netWorthGoalsService.createGoal(
      body,
      userId,
      lastEntry
    );

    return { data };
  }

  @Delete('/:id')
  public async deleteOne(
    @UserId() userId: string,
    @Param('id') id: string
  ): Promise<void> {
    await this._netWorthGoalsService.deleteOne(userId, id);
  }
}
