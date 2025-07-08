import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  Param,
  UseGuards,
} from '@nestjs/common';
import { TherapistPatientService } from './therapistpatient.service';
import { TherapistPatientType } from './Types/therapistpatient.types';
import { JwtAuthGuard } from 'src/Auth/jwt-auth.guard';

@Controller('therapist-patient')
export class TherapistPatientController {
  constructor(
    private readonly therapistPatientService: TherapistPatientService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('get')
  async getAllTherapistPatients(@Res() res: any) {
    try {
      const therapistPatients =
        await this.therapistPatientService.getAllTherapistPatients();
      return res.status(200).json({
        status: 200,
        message: 'Asignaciones obtenidas correctamente',
        therapistPatients,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Error retrieving Therapist-Patient relationships',
        error: error.message,
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('getByPatientId/:id')
  async getTherapistPatientByPatientId(
    @Res() res: any,
    @Param('id') id: number,
  ) {
    try {
      const therapistPatient =
        await this.therapistPatientService.getTherapistPatientByPatientId(
          Number(id),
        );
      if (!therapistPatient) {
        return res.status(404).json({
          status: 404,
          message: 'Asignación no encontrada',
        });
      }
      return res.status(200).json({
        status: 200,
        message: 'Asignación obtenida correctamente',
        therapistPatient,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Error retrieving Therapist-Patient relationship',
        error: error.message,
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('getByTherapistId/:id')
  async getTherapistPatientByTherapistId(
    @Res() res: any,
    @Param('id') id: number,
  ) {
    try {
      const therapistPatient =
        await this.therapistPatientService.getTherapistPatientByTherapistId(
          Number(id),
        );
      if (!therapistPatient) {
        return res.status(404).json({
          status: 404,
          message: 'Asignación no encontrada',
        });
      }
      return res.status(200).json({
        status: 200,
        message: 'Asignación obtenida correctamente',
        therapistPatient,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Error retrieving Therapist-Patient relationship',
        error: error.message,
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createTherapistPatient(
    @Body() data: TherapistPatientType,
    @Res() res: any,
  ) {
    try {
      const therapistPatient =
        await this.therapistPatientService.createTherapistPatient(data);
      return res.status(201).json({
        status: 201,
        message: 'Asignación creada correctamente',
        therapistPatient,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Error creating Therapist-Patient relationship',
        error: error.message,
      });
    }
  }
}
