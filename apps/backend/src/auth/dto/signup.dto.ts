import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  name: string;  // ✅ Name is required for signup

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}