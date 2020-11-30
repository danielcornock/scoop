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
import { Dictionary } from 'lodash';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { UserSettingsService } from 'src/auth/services/user-settings/user-settings.service';
import { UserId } from 'src/common/decorators/user-id.decorator';
import { HttpResponse } from 'src/common/interfaces/http-response.interface';
import { IMonthlyDistributionMeta } from 'src/monthly-distribution/interfaces/monthly-distribution-meta.interface';
import { MonthlyDistribution } from 'src/monthly-distribution/schemas/monthly-distribution.schema';
import { MonthlyDistributionService } from 'src/monthly-distribution/services/monthly-distribution/monthly-distribution.service';
import { MonthlyDistributionCreate } from 'src/monthly-distribution/transfer-objects/monthly-distribution-create.dto';
import { MonthlyDistributionUpdate } from 'src/monthly-distribution/transfer-objects/monthly-distribution-update.dto';
import { SettingsService } from 'src/settings/services/settings/settings.service';

@Controller('monthly-distribution')
@UseGuards(AuthGuard)
export class MonthlyDistributionController {
  constructor(
    private readonly _monthlyDistributionService: MonthlyDistributionService,
    private readonly _settingsService: SettingsService,
    private readonly _userSettingsService: UserSettingsService
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
    const [rawData, settings, preferredCurrency] = await Promise.all([
      this._monthlyDistributionService.getAllSorted(user),
      this._settingsService.getSettings(user),
      this._userSettingsService.getPreferredCurrency(user)
    ]);

    const incomeFields = settings.monthlyDistributionIncomeFields;
    const outgoingFields = settings.monthlyDistributionOutgoingFields;

    const data = rawData.map((item) => {
      return {
        ...item.toObject(),
        income: this._getOrderedFields(incomeFields, item.income),
        outgoing: this._getOrderedFields(outgoingFields, item.outgoing)
      };
    });

    const allTimeDistribution = this._monthlyDistributionService.getAllTimeDistribution(
      data
    );

    const uncommittedSpendingData = this._monthlyDistributionService.getUncommittedSpendingChartData(
      data
    );

    const meta: IMonthlyDistributionMeta = {
      fields: ['date', ...incomeFields, ...outgoingFields, 'remaining'],
      preferredCurrency,
      allTimeDistribution,
      uncommittedSpendingData
    };

    return { data, meta };
  }

  @Get('/:monthlyDistributionDate')
  public async getOne(
    @UserId() userId: string,
    @Param('monthlyDistributionDate') date: string
  ): HttpResponse<
    MonthlyDistribution,
    { incomeFields: string[]; outgoingFields: string[] }
  > {
    const data = await this._monthlyDistributionService.getSingleResource(
      date,
      userId
    );

    const settings = await this._settingsService.getSettings(userId);

    const incomeFields = await this._monthlyDistributionService.getAllFieldsFromCurrentResourceAndActiveFields(
      data.income,
      settings.monthlyDistributionIncomeFields
    );

    const outgoingFields = await this._monthlyDistributionService.getAllFieldsFromCurrentResourceAndActiveFields(
      data.outgoing,
      settings.monthlyDistributionOutgoingFields
    );

    const meta = {
      incomeFields,
      outgoingFields
    };

    return { data, meta };
  }

  @Put('/:monthlyDistributionDate')
  public async updateLog(
    @UserId() userId: string,
    @Body() body: MonthlyDistributionUpdate,
    @Param('monthlyDistributionDate') date: string
  ): HttpResponse<MonthlyDistribution> {
    const data = await this._monthlyDistributionService.updateLogByDate(
      date,
      body.income,
      body.outgoing,
      userId
    );

    return { data };
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
