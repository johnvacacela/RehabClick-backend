import { Controller, Get, Post, Body, Res, Param } from '@nestjs/common';
import { ExcerciseService } from './exercise.service';
import { ExcerciseType } from './Types/exercise.types';

@Controller('exercise')
export class ExerciseController {
  constructor(private readonly excerciseService: ExcerciseService) {}

  @Post('create')
  async createExercise(@Body() data: ExcerciseType, @Res() res: any) {
    try {
      const exercise = await this.excerciseService.createExcercise(data);
      return res.status(201).json({
        status: 201,
        message: 'Exercise created successfully',
        exercise,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Error creating exercise',
        error: error.message,
      });
    }
  }
}
