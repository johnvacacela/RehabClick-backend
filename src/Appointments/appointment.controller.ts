import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  Param,
  UseGuards,
  Put,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentType } from './Types/appointment.types';
import { JwtAuthGuard } from 'src/Auth/jwt-auth.guard';
import { Response } from 'express';

@UseGuards(JwtAuthGuard)
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

  @Get('getByPatientId/:id')
  async getAllAppointmentsByPatientId(
    @Param('id') id: number,
    @Res() res: any,
  ) {
    try {
      const appointments =
        await this.appointmentService.getAllAppointmentsByPatientId(Number(id));
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

  @Get('getByTherapistId/:id')
  async getAllAppointmentsByTherapistId(
    @Param('id') id: number,
    @Res() res: any,
  ) {
    try {
      const appointments =
        await this.appointmentService.getAllApointmentsByTherapistId(
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

  @UseGuards(JwtAuthGuard)
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
      console.error('Error creating appointment:', error);
      return res.status(500).json({
        status: 500,
        message: 'Error al crear la cita',
        error: error.message,
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('complete/:id') // localhost:3000/appointments/complete/:id
  async completeAppointment(@Param('id') id: number, @Res() res: any) {
    try {
      const appointment = await this.appointmentService.completeAppointment(
        Number(id),
      );
      return res.status(201).json({
        status: 201,
        message: 'Cita completada correctamente',
        appointment,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Error al completar la cita',
        error: error.message,
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('cancel/:id') // localhost:3000/appointments/cancel/:id
  async cancelAppointment(@Param('id') id: number, @Res() res: Response) {
    try {
      const appointment = await this.appointmentService.cancelAppointment(
        Number(id),
      );
      return res.status(201).json({
        status: 201,
        message: 'Cita cancelada correctamente',
        appointment,
      });
    } catch (error) {
      console.error('Error canceling appointment:', error);
      return res.status(500).json({
        status: 500,
        message: 'Error al cancelar la cita',
        error: error.message,
      });
    }
  }
}
