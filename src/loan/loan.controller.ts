import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { LoanService } from './loan.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApprovalLoanDto } from './dto/approval-loan-dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller({path:'loan', version:'1.0'})
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post()
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Successfully created'})
  @ApiResponse({ status: 403, description: 'Forbidden'})
  @UseGuards(AuthGuard('jwt'))
  create(
    @Request() req,
    @Body() createLoanDto: CreateLoanDto) {
    return this.loanService.create(createLoanDto, req.user.id);
  }

  @Get()
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Loans return successfully '})
  @ApiResponse({ status: 403, description: 'Forbidden'})
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.loanService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Loan return successfully '})
  @ApiResponse({ status: 403, description: 'Forbidden'})
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: number) {
    return this.loanService.findOne(id);
  }

  
  @Post('approval')
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Successfully approved'})
  @ApiResponse({ status: 403, description: 'Forbidden'})
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
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Loan with amortization return successfully '})
  @ApiResponse({ status: 403, description: 'Forbidden'})
  @UseGuards(AuthGuard('jwt'))
  findOneAmor(@Param('id') id: number) {
    return this.loanService.findOneAmor(id);
  }

}
