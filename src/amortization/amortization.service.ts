import { Injectable, NotFoundException } from '@nestjs/common';
import { GetAmortizationDto } from './dto/get-amortization.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Loan } from 'src/loan/entities/loan.entity';
import { AmortizationTable } from './interfaces/amortization.interface';



@Injectable()
export class AmortizationService {
  constructor(
    @InjectRepository(Loan)
    private readonly loanRepository: Repository <Loan>
  ){}
  async calculateLoanTable(getAmortizationDto: GetAmortizationDto) {
    const {loanId} = getAmortizationDto
    const loan = await this.loanRepository.findOne({where:{id:loanId}})
    if(!loan)
      throw new NotFoundException('loan not found')

    const amortization = loan.type === 'fixed'
    ?  this.calculateFixedAmor(loan.amount,loan.interest,loan.terms)
    :  this.calculateVariableAmor(loan.amount,loan.interest,loan.terms)

    const loanData = [{
      id:loan.id,
      interest:loan.interest,
      terms:loan.terms,
      amount:loan.amount,
      type:loan.type
    }]
    return{loanDetails:loanData ,amortization}
  }

  calculateFixedAmor(amount:number, interest:number, term:number){
    const monthly = interest/ 1200
    const installment = (amount * monthly) / (1 - Math.pow(1 + monthly, - term))
    let balance = amount 

    let month = 1
    const table : AmortizationTable[] = []

    while (month <= term)
    {
      const interestPay = balance * monthly
      const capitalPay = installment - interestPay
      balance -= capitalPay

      table.push({
        month,
        installment: +installment.toFixed(2),
        capital: +capitalPay.toFixed(2),
        interest: +interestPay.toFixed(2),
        balance: +balance.toFixed(2)
      })
      month++
    }
    return table
  }

  calculateVariableAmor(amount:number, interest:number, term:number){
    const monthly = interest / 1200
    let balance = amount

    let month = 1
    const table: AmortizationTable[] = []

    while(month <= term){
      const interestPay = balance * monthly
      const capital = amount / term
      const installment = interestPay + capital
      balance -= capital

      table.push({
        month,
        installment: +installment.toFixed(2),
        capital: +capital.toFixed(2),
        interest: +interestPay.toFixed(2),
        balance: +balance.toFixed(2)
      })
      month++
    }

    return table
  }


}
