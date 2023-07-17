import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { PublicationController } from './publication/publication.controller';
import { PublicationService } from './publication/publication.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [AppController, UserController, PublicationController],
  providers: [AppService, UserService, PublicationService, PrismaService],
})
export class AppModule {}
