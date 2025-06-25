import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { PrismaModule } from "src/Prisma/prisma.module";
import { UsersModule } from "src/Users/users.module";
import { AuthService } from "./auth.service";

@Module({
    controllers:[AuthController],
    providers: [AuthService],
    imports: [PrismaModule, UsersModule], // Esto es necesario para poder usar la base de datos, ya que el servicio PrismaService se inyecta en el servicio AuthService
})
export class AuthModule {}