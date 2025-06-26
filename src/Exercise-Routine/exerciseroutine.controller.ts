import { Controller, Get, Post, Body, Res, Param } from '@nestjs/common';
import { ExerciseRoutineService } from './exerciseroutine.service';
import { ExerciseRoutineType } from './Types/exerciseroutine.types';

@Controller('exercise-routine')
export class ExerciseRoutineController {
    constructor(
        private readonly exerciseRoutineService: ExerciseRoutineService,
    ) {}
    
    @Post('create')
    async createExerciseRoutine(
        @Res() res: any,
        @Body() data: ExerciseRoutineType,
    ) {
        try {
        const newExerciseRoutine =
            await this.exerciseRoutineService.createExerciseRoutine(data);
        return res.status(201).json({
            status: 201,
            message: 'Ejercicio-Rutina creado correctamente',
            newExerciseRoutine,
        });
        } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Error creando Ejercicio-Rutina',
            error: error.message,
        });
        }
    }
    
    @Get('getByIdRoutine/:id')
    async getAllExerciseRoutinesByIdRoutine(
        @Res() res: any,
        @Param('id') id: number,
    ) {
        try {
        const exerciseRoutines =
            await this.exerciseRoutineService.getAllExerciseRoutinesByIdRoutine(
            Number(id),
            );
        return res.status(200).json({
            status: 200,
            message: 'Ejercicios de rutina obtenidos correctamente',
            exerciseRoutines,
        });
        } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Error retrieving Exercise Routines by Routine ID',
            error: error.message,
        });
        }
    }
}