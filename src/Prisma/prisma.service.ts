import { Injectable, OnModuleInit } from '@nestjs/common'; // OnModuleInit es una interfaz de NestJS que permite ejecutar código cuando el módulo se inicializa
import { PrismaClient } from '@prisma/client'; //Contiene todos lo métodos para acceder a los modelos definidos en shema.prisma

@Injectable() // Decorador que indica que la clase PrismaService es un servicio inyectable, sin esto no se puede instanciar la clase en otro lugar
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
  // Método que se ejecuta cuando el módulo se destruye
  async enableShutdownHooks(app: any) {
    (this as any).$on('beforeExit', async () => {
      //Se lanza un evento antes de que Prisma se desconecte
      await app.close(); //Cierra la aplicación de NestJS
    });
  }
}
