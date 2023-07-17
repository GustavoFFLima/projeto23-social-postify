import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePublicationDto } from './dto/create-publication.dto/create-publication.dto';
import { Publication } from '.prisma/client';

@Injectable()
export class PublicationService {
  constructor(private prisma: PrismaService) {}

  async criarPublicacao(userId: number, createPublicationDto: CreatePublicationDto): Promise<Publication> {
    const { image, title, text, dateToPublish, published, socialMedia } = createPublicationDto;

    const publicacaoExistente = await this.prisma.publication.findFirst({ where: { title } });
    if (publicacaoExistente) {
      throw new NotFoundException('Já existe uma publicação com o mesmo título');
    }

    const publicacao = await this.prisma.publication.create({
      data: {
        image,
        title,
        text,
        dateToPublish,
        published,
        socialMedia,
        userId,
      },
    });

    return publicacao;
  }

  async obterTodasPublicacoes(userId: number): Promise<Publication[]> {
    const publicacoes = await this.prisma.publication.findMany({ where: { userId } });
    return publicacoes;
  }
}
