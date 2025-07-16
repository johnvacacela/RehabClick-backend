import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/Users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, plainPassword: string) {
    const user = await this.userService.getUserByField('correo', email);
    if (!user) return null;

    const passwordMatch = user.password === plainPassword;
    return passwordMatch ? user : null;
  }

  async login(user: any) {
    const payload = { 
      sub: user.id, 
      correo: user.correo, 
      rol: user.tipoUsuario 
    };

    const access_token = this.jwtService.sign(payload, { expiresIn: '20m' });
    const refresh_token = this.jwtService.sign(payload, { expiresIn: '7d' });

    return {
      access_token,
      refresh_token,
      user: {
        id: user.id,
        nombres: user.nombres,
        apellidos: user.apellidos,
        correo: user.correo,
        tipoUsuario: user.tipoUsuario,
      },
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const user = await this.userService.getUserById(payload.sub); // Ya funciona

      if (!user) {
        throw new UnauthorizedException('Usuario no encontrado');
      }

      const newPayload = { 
        sub: user.id, 
        correo: user.correo, 
        rol: user.tipoUsuario 
      };

      const access_token = this.jwtService.sign(newPayload, { expiresIn: '20m' });

      return {
        access_token,
        user: {
          id: user.id,
          nombres: user.nombres,
          apellidos: user.apellidos,
          correo: user.correo,
          tipoUsuario: user.tipoUsuario,
        },
      };
    } catch (error) {
      throw new UnauthorizedException('Refresh token inválido');
    }
  }

  async validateToken(payload: any) {
    return await this.userService.getUserById(payload.sub); // Ya funciona
  }
}