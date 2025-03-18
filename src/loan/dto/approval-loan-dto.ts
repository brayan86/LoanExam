import { IsIn, IsInt, IsPositive } from "class-validator";


export class ApprovalLoanDto{

    @IsInt()
    @IsPositive()
    loanId:number

    @IsIn(['reject', 'approved'])
    status:string

}