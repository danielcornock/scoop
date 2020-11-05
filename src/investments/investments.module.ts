import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';

import { InvestmentsController } from './controllers/investments/investments.controller';
import { Investment, InvestmentsSchema } from './schemas/investments.schema';
import { InvestmentsService } from './services/investments/investments.service';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      {
        name: Investment.name,
        schema: InvestmentsSchema
      }
    ])
  ],
  controllers: [InvestmentsController],
  providers: [InvestmentsService],
  exports: [InvestmentsService]
})
export class InvestmentsModule {}
