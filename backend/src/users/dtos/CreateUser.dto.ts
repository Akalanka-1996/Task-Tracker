import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Unique } from "typeorm";

export class CreateUserDto {
    
    @IsNotEmpty()
    @MinLength(3)
    username: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
}