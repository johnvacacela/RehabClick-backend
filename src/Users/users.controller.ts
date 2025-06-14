import {
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors,
  Body,
  Res,
  Param,
} from '@nestjs/common';
import { UserService } from './users.service';
import { SupabaseService } from 'src/Supabase/supabase.service';
import { CreateUserFullType } from './Types/users.types';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(
    private readonly UserService: UserService,
    private readonly SupabaseService: SupabaseService,
  ) {}

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

  @Post('create') //localhost:3000/users/create
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'idCardPath', maxCount: 1 },
        { name: 'imagePath', maxCount: 1 },
        { name: 'titlePath', maxCount: 1 },
      ],
      {
        dest: './uploads', // Ruta donde se guardarán las imágenes subidas
      },
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
        const url = await this.SupabaseService.uploadImage(
          files.idCardPath[0].path,
          'Cedula_' +
            data.idCard +
            path.extname(files.idCardPath[0].originalname),
        );
        data.idCardPath = url;
      }

      if (files.imagePath?.[0]) {
        const url = await this.SupabaseService.uploadImage(
          files.imagePath[0].path,
          'Foto_' + data.idCard + path.extname(files.imagePath[0].originalname),
        );
        data.imagePath = url;
      }

      if (files.titlePath?.[0]) {
        const url = await this.SupabaseService.uploadImage(
          files.titlePath[0].path,
          'Titulo_' +
            data.idCard +
            path.extname(files.titlePath[0].originalname),
        );

        if (typeof data.terapeutaData === 'string') {
          try {
            data.terapeutaData = JSON.parse(data.terapeutaData);
          } catch (e) {
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
}
