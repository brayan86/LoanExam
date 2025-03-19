import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AmortizationService } from './amortization.service';
import { GetAmortizationDto } from './dto/get-amortization.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@Controller({path:'loan', version:'1.0'})
export class AmortizationController {
  constructor(private readonly amortizationService: AmortizationService) {}

  @Post('amor')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 201, description: 'amortization return successfully'})
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() getAmortizationDto: GetAmortizationDto) {
    return this.amortizationService.calculateLoanTable(getAmortizationDto.loanId);
  }


}
