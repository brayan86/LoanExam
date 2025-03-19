import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator"


export class LoginUserDto {
    
    @ApiProperty({
     description: 'User email',
     minLength: 1,
    })
    @IsEmail()
    email:string

    @ApiProperty({
     description: 'User password',
     minLength: 6,
     maxLength:25
    })
    @IsString()
    @MinLength(6)
    @MaxLength(25)
    password:string
}