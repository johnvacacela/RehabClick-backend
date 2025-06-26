import { Controller, Get, Post, Body, Res, Param } from '@nestjs/common';
import { RoutineService } from './routine.service';
import { RoutineType } from './Types/routine.types';

@Controller('routine')
export class RoutineController {
  constructor(private readonly routineService: RoutineService) {}

  @Post('create')
  async createRoutine(@Body() data: RoutineType, @Res() res: any) {
    try {
      const routine = await this.routineService.createRoutine(data);
      return res.status(201).json({
        status: 201,
        message: 'Routine created successfully',
        routine,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Error creating routine',
        error: error.message,
      });
    }
  }

  @Get('getByIdTherapistPatient/:id')
  async getAllRoutinesByIdTherapistPatient(
    @Res() res: any,
    @Param('id') id: number,
  ) {
    try {
      const routines =
        await this.routineService.getAllRoutinesByIdTherapistPatient(
          Number(id),
        );
      if (!routines || routines.length === 0) {
        return res.status(404).json({
          status: 404,
          message: 'No routines found for this therapist-patient relationship',
        });
      }
      return res.status(200).json({
        status: 200,
        message: 'Routines retrieved successfully',
        routines,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Error retrieving routines',
        error: error.message,
      });
    }
  }
}
