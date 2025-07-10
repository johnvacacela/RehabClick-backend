import {
  Controller,
  Get,
  Post,
  Patch,
  UploadedFiles,
  UseInterceptors,
  Body,
  Res,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './users.service';
import { SupabaseService } from 'src/Supabase/supabase.service';
import { CreateUserFullType } from './Types/users.types';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/Auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly UserService: UserService,
    private readonly SupabaseService: SupabaseService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('get') //localhost:3000/users/get
  async getAllUsers(@Res() res: Response) {
    try {
      const usuarios = await this.UserService.getAllUsers();
      return res.status(200).json({
        status: 200,
        message: 'Usuarios obtenidos correctamente',
        usuarios,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Error al obtener los usuarios',
        error: error.message,
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('getById/:id')
  async getUserById(@Res() res: Response, @Param('id') id: number) {
    try {
      const usuario = await this.UserService.getUserById(Number(id));
      if (!usuario) {
        return res.status(404).json({
          status: 404,
          message: 'Usuario no encontrado',
        });
      }
      return res.status(200).json({
        status: 200,
        message: 'Usuario obtenido correctamente',
        usuario,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Error al obtener el usuario',
        error: error.message,
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'idCardPath', maxCount: 1 },
        { name: 'imagePath', maxCount: 1 },
        { name: 'titlePath', maxCount: 1 },
      ],
      { dest: './uploads' },
    ),
  )
  async createUser(
    @UploadedFiles()
    files: {
      idCardPath?: Express.Multer.File[];
      imagePath?: Express.Multer.File[];
      titlePath?: Express.Multer.File[];
    },
    @Body() data: CreateUserFullType,
    @Res() res: Response,
  ) {
    try {
      const user = await this.UserService.getUserByField('cedula', data.idCard);

      if (user) {
        return res.status(400).json({
          status: 400,
          message: 'Ya existe un usuario con esa cédula',
        });
      }

      if (files.idCardPath?.[0]) {
        const url = await this.SupabaseService.uploadFile(
          files.idCardPath[0].path,
          'Cedula_' +
            data.idCard +
            path.extname(files.idCardPath[0].originalname),
          'imagenes',
          process.env.SUPABASE_BUCKET_IMAGES || '',
        );
        data.idCardPath = url;
      }

      if (files.imagePath?.[0]) {
        const url = await this.SupabaseService.uploadFile(
          files.imagePath[0].path,
          'Foto_' + data.idCard + path.extname(files.imagePath[0].originalname),
          'imagenes',
          process.env.SUPABASE_BUCKET_IMAGES || '',
        );
        data.imagePath = url;
      }

      if (files.titlePath?.[0]) {
        const url = await this.SupabaseService.uploadFile(
          files.titlePath[0].path,
          'Titulo_' +
            data.idCard +
            path.extname(files.titlePath[0].originalname),
          'imagenes',
          process.env.SUPABASE_BUCKET_IMAGES || '',
        );

        if (typeof data.terapeutaData === 'string') {
          try {
            data.terapeutaData = JSON.parse(data.terapeutaData);
          } catch {
            throw new Error('terapeutaData debe ser un JSON válido');
          }
        }

        if (!data.terapeutaData) {
          data.terapeutaData = {};
        }
        data.terapeutaData.titlePath = url;
      }

      const usuario = await this.UserService.createUser(data);
      return res.status(200).json({
        status: 200,
        message: 'Usuario creado correctamente',
        data: usuario,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Error al crear el usuario',
        error: error.message,
      });
    }
  }

  @Patch('update/:id')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'imagePath', maxCount: 1 }], {
      dest: './uploads',
    }),
  )
  async updateUser(
    @Param('id') id: number,
    @UploadedFiles()
    files: {
      imagePath?: Express.Multer.File[];
    },
    @Body()
    updateData: {
      nombres?: string;
      apellidos?: string;
      correo?: string;
      fechaNacimiento?: string;
      currentPassword?: string;
      newPassword?: string;
      confirmPassword?: string;
    },
    @Res() res: Response,
  ) {
    try {
      // 1. Obtener usuario actual
      const existingUser = await this.UserService.getUserById(Number(id));
      if (!existingUser) {
        return res.status(404).json({
          status: 404,
          message: 'Usuario no encontrado',
        });
      }

      // 2. Validaciones de contraseña (igual que antes)
      if (updateData.currentPassword && updateData.newPassword) {
        if (updateData.newPassword !== updateData.confirmPassword) {
          return res.status(400).json({
            status: 400,
            message: 'Las contraseñas nuevas no coinciden',
          });
        }

        if (existingUser.password !== updateData.currentPassword) {
          return res.status(400).json({
            status: 400,
            message: 'La contraseña actual es incorrecta',
          });
        }
      }

      // 3. Validar email único
      if (updateData.correo && updateData.correo !== existingUser.correo) {
        const emailExists = await this.UserService.getUserByField(
          'correo',
          updateData.correo,
        );
        if (emailExists) {
          return res.status(400).json({
            status: 400,
            message: 'Ya existe un usuario con ese correo electrónico',
          });
        }
      }

      // 4. Manejar nueva foto de perfil
      if (files.imagePath?.[0]) {
        // 4a. Subir nueva foto
        const nuevaFotoUrl = await this.SupabaseService.uploadFile(
          files.imagePath[0].path,
          'Foto_Update_' +
            existingUser.cedula +
            '_' +
            Date.now() +
            path.extname(files.imagePath[0].originalname),
          'imagenes',
          process.env.SUPABASE_BUCKET_IMAGES || '',
        );

        // 4b. Borrar foto anterior si existe
        if (existingUser.fotoUsuario) {
          try {
            await this.SupabaseService.deleteFile(existingUser.fotoUsuario);
            console.log('Foto anterior eliminada:', existingUser.fotoUsuario);
          } catch (error) {
            console.warn(
              'No se pudo eliminar la foto anterior:',
              error.message,
            );
            // No interrumpir el proceso si no se puede borrar
          }
        }

        updateData['imagePath'] = nuevaFotoUrl;
      }

      // 5. Actualizar usuario
      // En tu controlador, reemplaza la sección "5. Actualizar usuario":

      // 5. Actualizar usuario
      const dataToUpdate = {
        nombres: updateData.nombres,
        apellidos: updateData.apellidos,
        correo: updateData.correo,
        fechaNacimiento: updateData.fechaNacimiento,
        password: updateData.newPassword, // <-- Mapear newPassword a password
        fotoUsuario: updateData['imagePath'], // <-- Mapear imagePath a fotoUsuario
      };

      // Filtrar campos undefined para no enviar valores vacíos
      const filteredData = Object.fromEntries(
        Object.entries(dataToUpdate).filter(
          ([_, value]) => value !== undefined,
        ),
      );

      const updatedUser = await this.UserService.updateUser(
        Number(id),
        filteredData,
      );

      return res.status(200).json({
        status: 200,
        message: 'Usuario actualizado correctamente',
        usuario: updatedUser,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Error al actualizar el usuario',
        error: error.message,
      });
    }
  }
}
