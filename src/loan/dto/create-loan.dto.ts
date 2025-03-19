import { ApiProperty } from "@nestjs/swagger"
import { IsIn, IsNumber, IsPositive, IsString, MaxLength, maxLength, min, MinLength } from "class-validator"


export class CreateLoanDto {


    @ApiProperty({
     description: 'client name',
     minLength: 3,
    })
    @IsString()
    @MinLength(3)
    clientFirstName:string

    @ApiProperty({
     description: 'client lastname',
     minLength: 3,
    })
    @IsString()
    @MinLength(3)
    clientLastName:string

    @ApiProperty({
     description: 'client phone number',
     minLength: 8,
     maxLength:12
    })
    @IsString()
    @MinLength(8)
    @MaxLength(12)
    clientPhoneNumber:string

    @ApiProperty({
     description: 'loan amount',
     default:0
    })
    @IsNumber()
    @IsPositive()
    amount:number

    @ApiProperty({
     description: 'client monthlyIncome',
     default:0
    })
    @IsNumber()
    @IsPositive()
    monthlyIncome:number

    @ApiProperty({
     description: 'loan terms',
     enum:[6,12,24,36,48,60]
    })
    @IsIn([6,12,24,36,48,60])
    terms:number

    @ApiProperty({
     description: 'loan terms',
     enum:[18,20,22,25]
    })
    @IsIn([18,20,22,25])
    interest:number

    
    @ApiProperty({
     enum:['fixed','variable']
    })
    @IsIn(['fixed','variable'])
    type:string


}
