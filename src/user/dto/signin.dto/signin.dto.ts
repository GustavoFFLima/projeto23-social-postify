import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInDto {
  @IsNotEmpty({ message: 'O campo e-mail é obrigatório' })
  @IsEmail({}, { message: 'Informe um e-mail válido' })
  email: string;

  @IsNotEmpty({ message: 'O campo senha é obrigatório' })
  password: string;
}
