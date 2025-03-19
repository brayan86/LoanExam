import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';


@Controller({path:'loan', version:'1.0'})
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('payment')
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Payment successfully created'})
  @ApiResponse({ status: 403, description: 'Forbidden'})
  @UseGuards(AuthGuard('jwt'))
  create(
    @Request() req,
    @Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.createPayment(createPaymentDto, req.user.id);
  }

  @Post('abono')
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'abono successfully created'})
  @ApiResponse({ status: 403, description: 'Forbidden'})
  @UseGuards(AuthGuard('jwt'))
  abono(
    @Request() req,
    @Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.createAbono(createPaymentDto, req.user.id);
  }


}
