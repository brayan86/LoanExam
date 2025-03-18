import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";


export class CreateUserDto {

    @IsString()
    @MinLength(3)
    firstName:string

    @IsString()
    @MinLength(3)
    lastName:string

    @IsEmail()
    email:string

    @IsString()
    @MinLength(6)
    @MaxLength(25)
    password:string

}
