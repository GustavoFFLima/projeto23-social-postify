import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  name: string;

  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  @IsEmail({}, { message: 'Informe um e-mail válido' })
  email: string;

  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @Length(6, 20, { message: 'A senha deve ter entre 6 e 20 caracteres' })
  password: string;

  @IsNotEmpty({ message: 'O avatar é obrigatório' })
  avatar: string;
}
