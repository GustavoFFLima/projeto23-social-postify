import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { SignInDto } from './dto/signin.dto/signin.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async criarUsuario(@Body() createUserDto: CreateUserDto) {
    const usuario = await this.userService.criarUsuario(createUserDto);
    return {
      statusCode: HttpStatus.CREATED,
      mensagem: 'Usuário criado com sucesso',
      dados: usuario,
    };
  }

  @Post('signin')
  async autenticarUsuario(@Body() signInDto: SignInDto) {
    const token = await this.userService.autenticarUsuario(signInDto);
    return {
      statusCode: HttpStatus.OK,
      mensagem: 'Usuário autenticado com sucesso',
      dados: { token },
    };
  }

  @Get()
  async obterTodosUsuarios() {
    const usuarios = await this.userService.obterTodosUsuarios();
    return {
      statusCode: HttpStatus.OK,
      mensagem: 'Usuários recuperados com sucesso',
      dados: usuarios,
    };
  }
}
