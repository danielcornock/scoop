import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { UserId } from 'src/common/decorators/user-id.decorator';
import { HttpResponse } from 'src/common/interfaces/http-response.interface';
import { Salary } from 'src/salary/schemas/salary.schema';
import { SalaryPredictionService } from 'src/salary/services/salary-prediction/salary-prediction.service';
import { SalaryService } from 'src/salary/services/salary/salary.service';
import { GrossSalaryPrediction } from 'src/salary/transfer-objects/gross-salary-prediction.dto';
import { SalaryCreateRequest } from 'src/salary/transfer-objects/salary-create-request.dto';

@Controller('salary')
@UseGuards(AuthGuard)
export class SalaryController {
  constructor(
    private readonly _salaryPredictionService: SalaryPredictionService,
    private readonly _salaryService: SalaryService
  ) {}

  @Post('gross')
  public async getSalaryFormPredictions(
    @Body() body: GrossSalaryPrediction,
    @UserId() user: string
  ): HttpResponse<Partial<Salary>> {
    const data = await this._salaryPredictionService.getSalaryReductionPredictions(
      body,
      user
    );

    return { data };
  }

  @Post()
  public async createSalaryLog(
    @Body() body: SalaryCreateRequest,
    @UserId() userId: string
  ): HttpResponse<Salary> {
    const data = await this._salaryService.createLogEntry(body, userId);

    return { data };
  }
}
