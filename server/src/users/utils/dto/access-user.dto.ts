import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator';

export class AccessUserDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  readonly password: string;
}
