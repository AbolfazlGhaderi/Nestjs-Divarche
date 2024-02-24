import { IsEmail, IsNotEmpty, IsNumberString, IsOptional, IsString, Length, MaxLength, length } from "class-validator"


export class loginDTO{
    @IsNotEmpty()
    @IsNumberString()
    @Length(11,11)
    phoneNumber:string

    @IsOptional()
    @IsNumberString()
    @Length(5,5)
    code?:string
}