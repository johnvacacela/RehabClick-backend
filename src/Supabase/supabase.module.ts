import { Module } from "@nestjs/common";
import { SupabaseService } from "./supabase.service";

@Module({
  providers: [SupabaseService], // Servicios disponibles dentro de este modulo
  exports: [SupabaseService], // Servicios que este modulo expone para otros modulos
})
export class SupabaseModule {}
