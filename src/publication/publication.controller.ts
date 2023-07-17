import { Body, Controller, Get, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PublicationService } from './publication.service';
import { CreatePublicationDto } from './dto/create-publication.dto/create-publication.dto';

@Controller('publication')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async criarPublicacao(@Request() req, @Body() createPublicationDto: CreatePublicationDto) {
    const publicacao = await this.publicationService.criarPublicacao(req.user.userId, createPublicationDto);
    return {
      statusCode: HttpStatus.CREATED,
      mensagem: 'Publicação criada com sucesso',
      dados: publicacao,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async obterTodasPublicacoes(@Request() req) {
    const publicacoes = await this.publicationService.obterTodasPublicacoes(req.user.userId);
    return {
      statusCode: HttpStatus.OK,
      mensagem: 'Publicações recuperadas com sucesso',
      dados: publicacoes,
    };
  }
}
