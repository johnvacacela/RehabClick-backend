import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ExcerciseService } from './exercise.service';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { Response } from 'express';

@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExcerciseService) {}

  @Post('create')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const ext = path.extname(file.originalname);
          const baseName = path.basename(file.originalname, ext);
          cb(null, `${baseName}-${Date.now()}${ext}`);
        },
      }),
    }),
  )
  async createExercise(
    @UploadedFile() file: Express.Multer.File,
    @Body('nombre') nombre: string,
    @Res() res: Response,
  ) {
    try {
      if (!file) {
        return res
          .status(400)
          .json({ status: 400, message: 'Falta el archivo' });
      }

      const ejercicio = await this.exerciseService.createExcercise(
        file.path,
        nombre,
      );

      fs.unlinkSync(file.path); // Borrar archivo temporal

      return res.status(201).json({
        status: 201,
        message: 'Ejercicio creado con video',
        exercise: ejercicio,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Error al crear el ejercicio',
        error: error.message,
      });
    }
  }
}
