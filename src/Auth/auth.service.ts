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

    const passwordMatch = user.password === plainPassword; // Reemplazar con bcrypt.compare()

    return passwordMatch ? user : null;
  }

  async login(user: any) {
    const payload = { id: user.id, correo: user.correo, rol: user.tipoUsuario };

    // Token de acceso (corta duración)
    const access_token = this.jwtService.sign(payload, { expiresIn: '15m' });

    // Refresh token (larga duración)
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
      // Verifica el refresh token
      const payload = this.jwtService.verify(refreshToken);
      const user = await this.userService.getUserById(payload.sub);

      if (!user) {
        throw new UnauthorizedException('Usuario no encontrado');
      }

      // Genera nuevo access token
      const newPayload = { id: user.id, correo: user.correo, rol: user.tipoUsuario };

      const access_token = this.jwtService.sign(newPayload, { expiresIn: '15m' });

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
    return await this.userService.getUserById(payload.sub);
  }
}
