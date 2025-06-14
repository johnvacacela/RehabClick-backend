import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UserService } from "./users.service";
import { PrismaModule } from "src/Prisma/prisma.module";
import { SupabaseModule } from "src/Supabase/supabase.module";

@Module({
    controllers: [UsersController], // Los controladores que pertenecen a este modulo (Aqui se definen los endpoints)
    providers: [UserService], // Los servicios que pertenecen a este modulo (Aqui se definen la logica de negocio), es decir las consultas a la base de datos
    exports: [UserService],
    imports: [PrismaModule, SupabaseModule], //Esto es necesario para poder usar la base de datos, ya que el servicio PrismaService se inyecta en el servicio UserService
})
export class UsersModule {}