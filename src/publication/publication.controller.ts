import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PublicationService } from './publication.service';
import { CreatePublicationDto } from './dto/create-publication.dto/create-publication.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserRequest } from 'src/auth/user.request.decorator';
import { User } from '@prisma/client';

@Controller('publication')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @UseGuards(AuthGuard)
  @Post()
  async criarPublicacao(
    @UserRequest() user: User,
    @Body() createPublicationDto: CreatePublicationDto,
  ) {
    const publicacao = await this.publicationService.criarPublicacao(
      user.id,
      createPublicationDto,
    );
    return {
      statusCode: HttpStatus.CREATED,
      mensagem: 'Publicação criada com sucesso',
      dados: publicacao,
    };
  }

  @UseGuards(AuthGuard)
  @Get()
  async obterTodasPublicacoes(@UserRequest() user: User) {
    const publicacoes = await this.publicationService.obterTodasPublicacoes(
      user.id,
    );
    return {
      statusCode: HttpStatus.OK,
      mensagem: 'Publicações recuperadas com sucesso',
      dados: publicacoes,
    };
  }
}
