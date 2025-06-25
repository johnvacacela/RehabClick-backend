import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/Users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(email: string, plainPassword: string) {
    const user = await this.userService.getUserByField('correo', email);
    if (!user) return null;

    const passwordMatch = user.password === plainPassword; // Reemplazar con bcrypt.compare()

    return passwordMatch ? user : null;
  }
}
