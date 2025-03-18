import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { LoanService } from './loan.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApprovalLoanDto } from './dto/approval-loan-dto';

@Controller({path:'loan', version:'1.0'})
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(
    @Request() req,
    @Body() createLoanDto: CreateLoanDto) {
    return this.loanService.create(createLoanDto, req.user.id);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.loanService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: number) {
    return this.loanService.findOne(id);
  }

  @Post('approval')
  @UseGuards(AuthGuard('jwt'))
  approval(
    @Body() approvalLoanDto: ApprovalLoanDto) {
    return this.loanService.approval(approvalLoanDto);
  }

}

@Controller({path:'loan', version:'2.0'})
export class LoanControllerV2 {
  constructor(private readonly loanService: LoanService) {}

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOneAmor(@Param('id') id: number) {
    return this.loanService.findOneAmor(id);
  }

}
