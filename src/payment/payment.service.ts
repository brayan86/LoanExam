import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { Loan } from 'src/loan/entities/loan.entity';
import { LoanService } from 'src/loan/loan.service';
import { AmortizationService } from 'src/amortization/amortization.service';
import { User } from 'src/auth/entities/user.entity';


@Injectable()
export class PaymentService {

  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository : Repository <Payment>,

    @InjectRepository(Loan)
    private readonly loanRepository : Repository <Loan>,

    private readonly loanService : LoanService,

    private readonly amortizationService : AmortizationService
  ){}

  async createPayment(createPaymentDto: CreatePaymentDto, user: User) {
    const {loanId, amount} = createPaymentDto

    const loan = await this.loanService.findOne(loanId)

    if(!loan)
      throw new NotFoundException(' loan not found')
    if(loan.status === 'paid')
      throw new BadRequestException('loan was paid')
    if(loan.status === 'pending')
      throw new BadRequestException('loan pending approval')
    if(loan.status === 'reject')
      throw new BadRequestException('loan was reject')

    const table = loan.type === 'fixed'
    ? this.amortizationService.calculateFixedAmor(loan.terms, loan.amount, loan.interest)
    : this.amortizationService.calculateVariableAmor (loan.terms, loan.amount, loan.interest)

    const findPayment = await this.paymentRepository.count({where:{loan:{id:loanId}}})

    const installment = table[findPayment]

    if(amount !== Number(installment.installment))
      throw new BadRequestException(`amount is incorrect, installment correct are ${installment.installment}`)

    const payment =  this.paymentRepository.create({
      createdAt:new Date(),
      loan,
      type: 'payment',
      user,
      amount
    })

    loan.amountPaid =  (+loan.amountPaid) + (amount )
    loan.amountPending = (+loan.amountPending) - amount
    loan.termsPaid = loan.termsPaid + 1

    if(loan.amountPending === 0){
      loan.status = 'paid'
      throw new BadRequestException('loan was paid')
    }
      

    await this.loanRepository.save(loan)
    await this.paymentRepository.save(payment)
    return payment
  }

  async createAbono (createPaymentDto: CreatePaymentDto, user :User) {
    const {loanId, amount} = createPaymentDto

    const loan = await this.loanService.findOne(loanId)

    if(!loan)
      throw new NotFoundException(' loan not found')
    if(loan.status === 'paid')
      throw new BadRequestException('loan was paid')
    if(loan.status === 'pending')
      throw new BadRequestException('loan pending approval')
    if(loan.status === 'reject')
      throw new BadRequestException('loan was reject')

    if(amount > Number(loan.amountPending))
      throw new BadRequestException('amount exceeds amount pending')

    const payment =  this.paymentRepository.create({
      createdAt:new Date(),
      loan,
      type: 'abono',
      user,
      amount
    })

    loan.amountPaid = Number(loan.amountPaid) + amount
    loan.amountPending = Number(loan.amountPending) - amount

    if(loan.amountPending === 0){
      loan.status = 'paid'
      await this.loanRepository.save(loan)
      throw new BadRequestException('loan was paid')
    }
 
    await this.loanRepository.save(loan)
    await this.paymentRepository.save(payment)
    return payment


  }
}
