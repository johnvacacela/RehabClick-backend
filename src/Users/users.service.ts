import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Prisma/prisma.service';
import { CreateUserFullType } from './Types/users.types';
import { Usuarios } from '@prisma/client'; // Importa el tipo Users de Prisma, que representa la tabla users en la base de datos

@Injectable() // Decorador que indica que la clase UserService es un servicio inyectable, sin esto no se puede instanciar la clase en otro lugar
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    // Incluye las relaciones con terapeutas y pacientes
    return await this.prisma.usuarios.findMany({
      include: {
        datosExtraTerapeuta: true,
        datosExtraPaciente: true
      },
    });
  }

  async getUserById(id: number): Promise<Usuarios | null> {
    //Devuelve un solo usuario o null si no existe
    return this.prisma.usuarios.findUnique({
      where: {
        id,
      },
      include: {
        datosExtraTerapeuta: true, // Incluye los datos extra del terapeuta
        datosExtraPaciente: true, // Incluye los datos extra del paciente
      }
    }); // Devuelve un usuario de la base de datos por su id
  }

  //Método generalizado para obtener un usuario por cualquier campo
  async getUserByField(field: string, value: string): Promise<Usuarios | null> {
    //Devuelve un solo usuario o null si no existe
    return this.prisma.usuarios.findFirst({
      where: {
        [field]: value,
      },
    }); // Devuelve un usuario de la base de datos por su correo
  }

  async createUser(data: CreateUserFullType): Promise<Usuarios> {
    //Recibe un objeto de tipo Usuarios y devuelve un objeto de tipo Usuarios
    const usuario = await this.prisma.usuarios.create({
      data: {
        nombres: data.name,
        apellidos: data.lastName,
        cedula: data.idCard,
        correo: data.email,
        password: data.password,
        genero: data.sex,
        fechaNacimiento: new Date(data.birthDate),
        fotoCedula: data.idCardPath, // Ruta de la foto de la cédula
        fotoUsuario: data.imagePath, // Ruta de la foto del usuario
        tipoUsuario: data.typeUser, // 'paciente' o 'terapeuta'
      },
    }); // Crea un nuevo usuario en la base de datos

    if (data.typeUser === 'paciente') {
      await this.prisma.pacientes.create({
        data: {
          idUsuario: usuario.id,
        },
      });
    } else if (data.typeUser === 'terapeuta') {
      const anios = Number(data.terapeutaData?.experience);
      await this.prisma.terapeutas.create({
        data: {
          idUsuario: usuario.id,
          aniosExperiencia: isNaN(anios) ? 0 : anios,
          titulo: data.terapeutaData?.titlePath || '',
        },
      });
    }
    return usuario;
  }

  async updateUser(id: number, data: Partial<Usuarios>): Promise<Usuarios> {
    //Recibe un id y un objeto de tipo Usuarios y devuelve un objeto de tipo Usuarios
    return this.prisma.usuarios.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteUser(id: number): Promise<Usuarios> {
    //Recibe un id y devuelve un objeto eliminado de tipo Usuarios
    return this.prisma.usuarios.delete({
      where: {
        id,
      },
    });
  }
}
