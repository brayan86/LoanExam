import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { LoanModule } from 'src/loan/loan.module';
import { AmortizationModule } from 'src/amortization/amortization.module';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
  imports:[TypeOrmModule.forFeature([Payment]), LoanModule, AmortizationModule]
})
export class PaymentModule {}
