import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentType } from './Types/appointment.types';
import { JwtAuthGuard } from 'src/Auth/jwt-auth.guard';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get('getByTherapistPatientId/:id')
  async getAllAppointmentsByTherapistPatientId(
    @Param('id') id: number,
    @Res() res: any,
  ) {
    try {
      const appointments =
        await this.appointmentService.getAllAppointsByTherapistPatientId(
          Number(id),
        );
      return res.status(200).json({
        status: 200,
        message: 'Citas obtenidas correctamente',
        appointments,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Error al obtener las citas',
        error: error.message,
      });
    }
  }

  @Post('create')
  async createAppointment(@Body() data: AppointmentType, @Res() res: any) {
    try {
      const appointment = await this.appointmentService.createAppointment(data);
      return res.status(201).json({
        status: 201,
        message: 'Cita creada correctamente',
        appointment,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Error al crear la cita',
        error: error.message,
      });
    }
  }
}
