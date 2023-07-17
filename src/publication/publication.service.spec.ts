import { Test, TestingModule } from '@nestjs/testing';
import { PublicationService } from './publication.service';
import { PrismaService } from '../prisma/prisma.service';

describe('PublicationService', () => {
  let service: PublicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PublicationService, PrismaService],
    }).compile();

    service = module.get<PublicationService>(PublicationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
