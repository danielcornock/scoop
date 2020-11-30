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
import { IInvestmentsMeta } from 'src/investments/interfaces/investments-meta.interface';
import { Investment } from 'src/investments/schemas/investments.schema';
import { InvestmentsService } from 'src/investments/services/investments/investments.service';
import { InvestmentCreate } from 'src/investments/transfer-objects/investment-create.dto';
import { InvestmentResponse } from 'src/investments/transfer-objects/investment-response.dto';
import { InvestmentUpdate } from 'src/investments/transfer-objects/investment-update.dto';

@Controller('investments')
@UseGuards(AuthGuard)
export class InvestmentsController {
  constructor(
    private readonly _investmentsService: InvestmentsService,
    private readonly _userSettingsService: UserSettingsService
  ) {}

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
  ): HttpResponse<InvestmentResponse[], IInvestmentsMeta> {
    const [data, preferredCurrency] = await Promise.all([
      this._investmentsService.getAll(userId),
      this._userSettingsService.getPreferredCurrency(userId)
    ]);

    const meta: IInvestmentsMeta = {
      preferredCurrency
    };

    return { data, meta };
  }

  @Put('/:logDate')
  public async updateLog(
    @UserId() userId: string,
    @Body() body: InvestmentUpdate,
    @Param('logDate') date: string
  ): HttpResponse<Investment> {
    const data = await this._investmentsService.update(date, body, userId);

    return { data };
  }

  @Get('/:logDate')
  public async getOne(
    @UserId() userId: string,
    @Param('logDate') date: string
  ): HttpResponse<Investment> {
    const data = await this._investmentsService.getOne(date, userId);

    return { data };
  }

  @Delete('/:logDate')
  public deleteInvestmentLog(
    @UserId() userId: string,
    @Param('logDate') date: string
  ): HttpResponse<void> {
    return this._investmentsService.deleteOne(userId, date);
  }
}
