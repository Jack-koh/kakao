import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsMobilePhone,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  readonly password: string;

  @IsString()
  readonly name: string;

  @IsMobilePhone()
  readonly phone: number;

  // @IsOptional()
  // @IsString({ each: true })
  // readonly genres: string[];
}
