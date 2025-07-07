import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('validate')
  async validateUser(
    @Body() body: { email: string; password: string },
    @Res() res: any,
  ) {
    const user = await this.authService.validateUser(body.email, body.password);

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: 'Usuario no encontrado o contraseña incorrecta',
      });
    }

    const loginResult = await this.authService.login(user);

    return res.status(200).json({
      status: 200,
      message: 'Usuario validado correctamente',
      ...loginResult,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req, @Res() res: any) {
    return res.status(200).json({
      status: 200,
      message: 'Token válido',
      user: req.user,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('verify-token')
  async verifyToken(@Request() req, @Res() res: any) {
    return res.status(200).json({
      status: 200,
      message: 'Token verificado correctamente',
      valid: true,
      user: req.user,
    });
  }

  @Post('refresh')
  async refreshToken(
    @Body() body: { refresh_token: string },
    @Res() res: any,
  ) {
    try {
      const result = await this.authService.refreshToken(body.refresh_token);
      return res.status(200).json({
        status: 200,
        message: 'Token refrescado correctamente',
        ...result,
      });
    } catch (error) {
      return res.status(401).json({
        status: 401,
        message: 'Refresh token inválido o expirado',
        error: error.message,
      });
    }
  }
}
