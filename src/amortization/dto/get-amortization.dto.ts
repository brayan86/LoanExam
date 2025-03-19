import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsPositive } from "class-validator";


export class GetAmortizationDto {

    @ApiProperty({
     description: 'Id Loan',
     minimum: 1,
     maximum:1,
     default: 0,
    })
    @IsInt()
    @IsPositive()
    loanId:number

}
