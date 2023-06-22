import { IsString, Length } from 'class-validator';

export class UserDto {
  @IsString({ message: 'login must be string' })
  @Length(3, 40, {
    message: 'Login shoud contain from 3 to 40 symbols',
  })
  readonly login: string;

  @IsString({ message: 'firstname must be string' })
  readonly firstname: string;

  @IsString({ message: 'lastname must be string' })
  readonly lastname: string;

  @Length(8, undefined, {
    message: 'Password shoud contain at least 8 symbols',
  })
  readonly password: string;
}
