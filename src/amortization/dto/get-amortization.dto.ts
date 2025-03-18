import { IsInt, IsPositive } from "class-validator";


export class GetAmortizationDto {

    @IsInt()
    @IsPositive()
    loanId:number

}
