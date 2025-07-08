import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  Param,
  UseGuards,
} from '@nestjs/common';
import { TherapistPlansService } from './therapistplans.service';
import { SupabaseService } from 'src/Supabase/supabase.service';
import { Response } from 'express'; // Ensure Response type is imported
import { CartItemType, TherapistPlansType } from './Types/therapistplans.types';
import { JwtAuthGuard } from 'src/Auth/jwt-auth.guard';

@Controller('therapist-plans')
export class TherapistPlansController {
  constructor(
    private readonly TherapistPlansService: TherapistPlansService,
    private readonly SupabaseService: SupabaseService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('get') //localhost:3000/therapist-plans/get
  async getAllTherapistPlans(@Res() res: Response) {
    try {
      const plans = await this.TherapistPlansService.getAllTherapistPlans();
      return res.status(200).json({
        status: 200,
        message: 'Planes de terapeutas obtenidos correctamente',
        plans,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Error al obtener los planes de los terapeutas',
        error: error.message,
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('getByTherapistId/:id') //localhost:3000/therapist-plans/getByTherapistId/:id
  async getTherapistPlanById(@Res() res: Response, @Param('id') id: number) {
    try {
      const plan =
        await this.TherapistPlansService.getTherapistPlansByTherapistId(
          Number(id),
        );
      if (!plan) {
        return res.status(404).json({
          status: 404,
          message: 'Plan de terapeuta no encontrado',
        });
      }
      return res.status(200).json({
        status: 200,
        message: 'Plan de terapeuta obtenido correctamente',
        plan,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Error al obtener el plan de terapeuta',
        error: error.message,
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('getPlanTypeByCartItems') //localhost:3000/therapist-plans/getPlanTypeByCartItems
  async getTherapistPlanTypeById(
    @Res() res: Response,
    @Body() cartItems: CartItemType[],
  ) {
    try {
      const plans = await Promise.all(
        cartItems.map(async (item) => {
          const plan =
            await this.TherapistPlansService.getTherapistPlanTypeByTherapistId(
              item.id_terapeuta,
              item.tipo,
            );

          if (!plan) {
            return {
              status: 404,
              message: `Plan de terapeuta con ID ${item.id_terapeuta} no encontrado`,
            };
          }

          return plan;
        }),
      );

      return res.status(200).json({
        status: 200,
        message: 'Planes del carrito obtenidos correctamente',
        plans,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Error al obtener los planes del carrito',
        error: error.message,
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('set') //localhost:3000/therapist-plans/set
  async setTherapistPlan(@Body() data: TherapistPlansType, @Res() res: any) {
    try {
      const plan = await this.TherapistPlansService.setTherapistPlan(data);
      return res.status(201).json({
        status: 201,
        message: 'Plan de terapeuta creado correctamente',
        plan,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Error al crear el plan de terapeuta',
        error: error.message,
      });
    }
  }
}
