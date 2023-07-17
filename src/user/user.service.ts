import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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

    const usuarioExistente = await this.prisma.user.findUnique({
      where: { email },
    });
    if (usuarioExistente) {
      throw new ConflictException('E-mail já está em uso');
    }

    const senhaHash = await hash(password, 10);
    const usuario = await this.prisma.user.create({
      data: {
        name,
        email,
        password: senhaHash,
        avatar,
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

    const token = this.createToken(usuario);
    return token.token;
  }

  async obterTodosUsuarios(): Promise<User[]> {
    const usuarios = await this.prisma.user.findMany();
    return usuarios;
  }
  async findUserById(id: number) {
    const usuario = await this.prisma.user.findUnique({ where: { id } });
    if (!usuario) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    return usuario;
  }
  createToken(user: User) {
    const token = this.jwtService.sign(
      {
        name: user.name,
        email: user.email,
      },
      {
        expiresIn: '7 days',
        subject: String(user.id),
      },
    );

    return { token };
  }
}
