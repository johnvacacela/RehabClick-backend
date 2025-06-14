import { Controller, Get, Post, Body, Param, Res } from '@nestjs/common';
import { UserService } from 'src/Users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: UserService) {}

  @Post('validate')
  async validateUser(
    @Body() body: { email: string; password: string },
    @Res() res: any
  ) {
    const user = await this.authService.getUserByField("correo", body.email);
    
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: 'Usuario no encontrado o contraseña incorrecta',
      });
    }

    if(user.password !== body.password) {
        return res.status(401).json({
            status: 401,
            message: 'Contraseña incorrecta',
        });
    }

    return res.status(200).json({
      status: 200,
      message: 'Usuario validado correctamente',
      user: {
        id: user.id,
        name: user.nombres,
        lastName: user.apellidos,
        email: user.correo,
        typeUser: user.tipoUsuario,
      }
    });

  }
}
