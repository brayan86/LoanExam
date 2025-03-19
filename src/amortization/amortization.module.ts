import { Module } from '@nestjs/common';
import { AmortizationService } from './amortization.service';
import { AmortizationController } from './amortization.controller';
import { LoanModule } from 'src/loan/loan.module';

@Module({
  controllers: [AmortizationController],
  providers: [AmortizationService],
  imports:[LoanModule],
  exports:[AmortizationService]
})
export class AmortizationModule {}
