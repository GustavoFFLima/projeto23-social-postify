import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { SignInDto } from './dto/signin.dto/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '.prisma/client';
import { compare, hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async criarUsuario(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password, avatar } = createUserDto;
  
    const usuarioExistente = await this.prisma.user.findUnique({ where: { email } });
    if (usuarioExistente) {
      throw new ConflictException('E-mail já está em uso');
    }
  
    const senhaHash = await hash(password, 10);
    const usuario = await this.prisma.user.create({
      data: {
        name: 'João',
        email: 'joao@example.com',
        password: '$2b$10$IBgm8hwOMzJx9KmWvqE83evRrKn4P/BE0ttTA4/WLHu81taTUGxdu',
        avatar: 'caminho/para/o/avatar.jpg', // Forneça o caminho do avatar válido aqui
      },
    });
    
  
    return usuario;
  }
  

  async autenticarUsuario(signInDto: SignInDto): Promise<string> {
    const { email, password } = signInDto;

    const usuario = await this.prisma.user.findUnique({ where: { email } });
    if (!usuario) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const senhaCorreta = await compare(password, usuario.password);
    if (!senhaCorreta) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const token = this.jwtService.sign({ userId: usuario.id });

    return token;
  }

  async obterTodosUsuarios(): Promise<User[]> {
    const usuarios = await this.prisma.user.findMany();
    return usuarios;
  }
}
