import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AmortizationService } from './amortization.service';
import { GetAmortizationDto } from './dto/get-amortization.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller({path:'loan', version:'1.0'})
export class AmortizationController {
  constructor(private readonly amortizationService: AmortizationService) {}

  @Post('amor')
  @UseGuards(AuthGuard('jwt'))
  create(@Body() getAmortizationDto: GetAmortizationDto) {
    return this.amortizationService.calculateLoanTable(getAmortizationDto);
  }


}
