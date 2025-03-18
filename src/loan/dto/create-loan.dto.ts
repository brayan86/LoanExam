import { IsIn, IsNumber, IsPositive, IsString, MaxLength, maxLength, min, MinLength } from "class-validator"


export class CreateLoanDto {


    @IsString()
    @MinLength(3)
    clientFirstName:string

    @IsString()
    @MinLength(3)
    clientLastName:string

    @IsString()
    @MinLength(8)
    @MaxLength(12)
    clientPhoneNumber:string

    @IsNumber()
    @IsPositive()
    amount:number

    @IsNumber()
    @IsPositive()
    monthlyIncome:number

    @IsIn([6,12,24,36,48,60])
    terms:number

    @IsIn([18,20,22,25])
    interest:number

    @IsIn(['fixed','variable'])
    type:string


}
