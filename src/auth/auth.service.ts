import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {constructor(
    private readonly jwtService: JwtService,
  ) {}
    checkToken(token: string) {
        try {
          const data = this.jwtService.verify(token)
    
          return data;
        } catch (error) {
          console.log(error);
          throw new BadRequestException(error);
        }
      }
}
