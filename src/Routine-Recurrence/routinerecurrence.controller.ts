import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  Param,
  UseGuards,
} from '@nestjs/common';
import { RoutineRecurrenceService } from './routinerecurrence.service';
import { RoutineRecurrenceType } from './Types/routinesrecurrence.types';
import { JwtAuthGuard } from 'src/Auth/jwt-auth.guard';

@Controller('routine-recurrence')
export class RoutineRecurrenceController {
  constructor(
    private readonly routineRecurrenceService: RoutineRecurrenceService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createRoutineRecurrence(
    @Res() res: any,
    @Body() data: RoutineRecurrenceType,
  ) {
    try {
      const newRoutineRecurrence =
        await this.routineRecurrenceService.createRoutineRecurrence(data);
      return res.status(201).json({
        status: 201,
        message: 'Recurrencia de rutina creada correctamente',
        newRoutineRecurrence,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Error creando recurrencia de rutina',
        error: error.message,
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('get')
  async getAllRoutineRecurrences(@Res() res: any) {
    try {
      const routineRecurrences =
        await this.routineRecurrenceService.getAllRoutineRecurrence();
      return res.status(200).json({
        status: 200,
        message: 'Recurrencias de rutina obtenidas correctamente',
        routineRecurrences,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Error retrieving Routine Recurrences',
        error: error.message,
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('getByIdRoutine/:id')
  async getAllRoutineRecurrencesByIdRoutine(
    @Res() res: any,
    @Param('id') id: number,
  ) {
    try {
      const routineRecurrences =
        await this.routineRecurrenceService.getAllRoutineRecurrencesByIdRoutine(
          Number(id),
        );
      return res.status(200).json({
        status: 200,
        message: 'Recurrencias de rutina obtenidas correctamente',
        routineRecurrences,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Error retrieving Routine Recurrences by Routine ID',
        error: error.message,
      });
    }
  }
}
