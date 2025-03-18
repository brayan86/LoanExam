import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Loan } from './entities/loan.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { ApprovalLoanDto } from './dto/approval-loan-dto';


@Injectable()
export class LoanService {
  constructor(
    @InjectRepository(Loan)
    private readonly loanRepository : Repository <Loan>
  ){}
  async create(createLoanDto: CreateLoanDto, user:User) {
   try {
    const {amount,...loanData} = createLoanDto

    const loan = this.loanRepository.create({
      amount,
      amountPending: amount,
      createdAt: new Date(),
      lastUpdate:new Date(),
      lastPayment: new Date(),
      user:user,
      ...loanData
    })

    return await this.loanRepository.save(loan)
  } catch (error){
    this.handleDBError(error)
  }

  }

  findAll() {
    return this.loanRepository.find()
  }

  async findOne(id: number) {
    const loan = await this.loanRepository.findOneBy({id})
    if(!loan)
      throw new NotFoundException(`loan with id: ${id} not found`)

    return loan
  }

  async findOneAmor(id: number) {
    const loan = await this.loanRepository.findOneBy({id})
    if(!loan)
      throw new NotFoundException(`loan with id: ${id} not found`)

    return {loan, amortization:[]}
  }

  async approval(approvalLoanDto: ApprovalLoanDto){
    const {loanId, status} = approvalLoanDto

    const loan = await this.loanRepository.findOneBy({id:loanId})

    if(!loan)
      throw new NotFoundException('loan not found')

    if(loan.status === 'paid')
      throw new BadRequestException('loan was paid')


    
    loan.status = status

    await this.loanRepository.save(loan)

    return loan

  }



  private handleDBError (error:any){
    if(error.code === '23505')
      throw new BadRequestException(error.detail)

    console.log(error)
    throw new InternalServerErrorException('please check server logs')
  }


}
