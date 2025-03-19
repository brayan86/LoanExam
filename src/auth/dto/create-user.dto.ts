import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";


export class CreateUserDto {

    @ApiProperty({
     description: 'User name',
     minLength: 3,
    })
    @IsString()
    @MinLength(3)
    firstName:string

    @ApiProperty({
     description: 'User lastname',
     minLength: 3,
    })
    @IsString()
    @MinLength(3)
    lastName:string

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
