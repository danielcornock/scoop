import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { UserId } from 'src/common/decorators/user-id.decorator';
import { HttpResponse } from 'src/common/interfaces/http-response.interface';
import { Investment } from 'src/investments/schemas/investments.schema';
import { InvestmentsService } from 'src/investments/services/investments/investments.service';
import { InvestmentCreate } from 'src/investments/transfer-objects/investment-create.dto';
import { InvestmentResponse } from 'src/investments/transfer-objects/investment-response.dto';

@Controller('investments')
@UseGuards(AuthGuard)
export class InvestmentsController {
  constructor(private readonly _investmentsService: InvestmentsService) {}

  @Post()
  public async createInvestmentLog(
    @Body() body: InvestmentCreate,
    @UserId() userId: string
  ): HttpResponse<Investment> {
    const data = await this._investmentsService.createLog(body, userId);

    return { data };
  }

  @Get()
  public async getAllInvestments(
    @UserId() userId: string
  ): HttpResponse<InvestmentResponse[]> {
    const data = await this._investmentsService.getAll(userId);

    return { data };
  }
}
