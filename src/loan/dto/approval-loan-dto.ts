import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsInt, IsPositive } from "class-validator";


export class ApprovalLoanDto{

     @ApiProperty({
     description: 'Id Loan',
     minimum: 1,
     maximum:1,
     default: 0,
    })
    @IsInt()
    @IsPositive()
    loanId:number

    @ApiProperty({
        enum:[ 'reject', 'approved' ]
    })
    @IsIn(['reject', 'approved'])
    status:string

}