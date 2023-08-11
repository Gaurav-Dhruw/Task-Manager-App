import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class GenerateVerificationLinkDto {
    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsString()
    @IsNotEmpty()
    otp:string;
}