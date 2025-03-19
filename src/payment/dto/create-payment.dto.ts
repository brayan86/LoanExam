import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber, IsPositive } from "class-validator";


export class CreatePaymentDto {

    @ApiProperty({
     description: 'Id Loan',
     minimum: 1,
     maximum:1,
     default: 0,
    })
    @IsInt()
    loanId:number

    @ApiProperty({
     description: 'Amount payment',
     minLength: 1,
     default: 0,
    })
    @IsNumber()
    @IsPositive()
    amount : number
}
