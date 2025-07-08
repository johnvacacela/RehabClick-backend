import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Res,
  UseGuards,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ExcerciseService } from './exercise.service';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/Auth/jwt-auth.guard';

@Controller('exercises')
export class ExerciseController {
  constructor(private readonly exerciseService: ExcerciseService) {}

  @UseGuards(JwtAuthGuard)
  @Get('get') //localhost:3000/exercises/get
  async getAllExercises(@Res() res: Response) {
    try {
      const exercises = await this.exerciseService.getAllExcercises();
      return res.status(200).json({
        status: 200,
        message: 'Ejercicios obtenidos correctamente',
        exercises,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Error al obtener los ejercicios',
        error: error.message,
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('create') //localhost:3000/exercises/create
  @UseInterceptors(
    FileInterceptor('video', {
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
