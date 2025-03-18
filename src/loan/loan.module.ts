import { Module } from '@nestjs/common';
import { LoanService } from './loan.service';
import { LoanController, LoanControllerV2 } from './loan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loan } from './entities/loan.entity';

@Module({
  controllers: [LoanController,LoanControllerV2],
  providers: [LoanService],
  imports:[TypeOrmModule.forFeature([Loan])],
  exports:[LoanService,TypeOrmModule.forFeature([Loan])]
})
export class LoanModule {}
