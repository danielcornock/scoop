import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards
} from '@nestjs/common';
import { Dictionary } from 'lodash';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { UserId } from 'src/common/decorators/user-id.decorator';
import { HttpResponse } from 'src/common/interfaces/http-response.interface';
import { IMonthlyDistributionMeta } from 'src/monthly-distribution/interfaces/monthly-distribution-meta.interface';
import { MonthlyDistribution } from 'src/monthly-distribution/schemas/monthly-distribution.schema';
import { MonthlyDistributionService } from 'src/monthly-distribution/services/monthly-distribution/monthly-distribution.service';
import { MonthlyDistributionCreate } from 'src/monthly-distribution/transfer-objects/monthly-distribution-create.dto';
import { SettingsService } from 'src/settings/services/settings/settings.service';

@Controller('monthly-distribution')
@UseGuards(AuthGuard)
export class MonthlyDistributionController {
  constructor(
    private readonly _monthlyDistributionService: MonthlyDistributionService,
    private readonly _settingsService: SettingsService
  ) {}

  @Post()
  public async createEntry(
    @Body() body: MonthlyDistributionCreate,
    @UserId() user: string
  ): HttpResponse<MonthlyDistribution> {
    const data = await this._monthlyDistributionService.createEntry(body, user);

    return { data };
  }

  @Get()
  public async getAll(
    @UserId() user: string
  ): HttpResponse<MonthlyDistribution[], IMonthlyDistributionMeta> {
    const [rawData, settings] = await Promise.all([
      this._monthlyDistributionService.getAll(user),
      this._settingsService.getSettings(user)
    ]);

    const incomeFields = settings.monthlyDistributionIncomeFields;
    const outgoingFields = settings.monthlyDistributionOutgoingFields;

    const meta = {
      fields: ['date', ...incomeFields, ...outgoingFields, 'remaining']
    };

    const data = rawData.map((item) => {
      return {
        ...item.toObject(),
        income: this._getOrderedFields(
          settings.monthlyDistributionIncomeFields,
          item.income
        ),
        outgoing: this._getOrderedFields(
          settings.monthlyDistributionOutgoingFields,
          item.outgoing
        )
      };
    });

    return { data, meta };
  }

  @Delete('/:monthlyDistributionDate')
  public async deleteOne(
    @UserId() user: string,
    @Param('monthlyDistributionDate') date: string
  ): Promise<void> {
    return this._monthlyDistributionService.deleteOne(user, date);
  }

  private _getOrderedFields(
    list: Array<string>,
    object: Dictionary<number>
  ): Dictionary<number> {
    const orderedFields = {};

    list.forEach((fieldName) => {
      orderedFields[fieldName] = object[fieldName];
    });

    return orderedFields;
  }
}
