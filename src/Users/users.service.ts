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
        datosExtraPaciente: true,
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
        datosExtraPaciente: {
          include: {
            terapeuta_paciente: {
              include: {
                rutina: {
                  include: {
                    recurrencia_rutina: true, // Incluye la recurrencia de la rutina
                    ejercicio_rutina: {
                      include: {
                        ejercicio: true, // Incluye los ejercicios de la rutina
                      },
                    },
                    terapeuta_paciente: {
                      include: {
                        terapeuta: {
                          include: {
                            usuario: {
                              include: {
                                datosExtraTerapeuta: true, // Incluye los datos extra del terapeuta
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        datosExtraTerapeuta: {
          include: {
            terapeuta_paciente: {
              include: {
                rutina: {
                  include: {
                    recurrencia_rutina: true,
                    ejercicio_rutina: {
                      include: {
                        ejercicio: true,
                      },
                    },
                    terapeuta_paciente: {
                      include: {
                        paciente: {
                          include: {
                            usuario: {
                              include: {
                                datosExtraPaciente: true,
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
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

  async updateUser(
    id: number,
    updateData: {
      nombres?: string;
      apellidos?: string;
      correo?: string;
      fechaNacimiento?: string;
      fotoUsuario?: string;
      password?: string;
      terapeutaData?: any;
    },
  ): Promise<Omit<Usuarios, 'password'> | null> {
    console.log('UserService - updateData recibido:', updateData);

    // 1. Actualizar datos básicos del usuario
    const dataToUpdate: Partial<Usuarios> = {};

    if (updateData.nombres) dataToUpdate.nombres = updateData.nombres;
    if (updateData.apellidos) dataToUpdate.apellidos = updateData.apellidos;
    if (updateData.correo) dataToUpdate.correo = updateData.correo;
    if (updateData.fechaNacimiento)
      dataToUpdate.fechaNacimiento = new Date(updateData.fechaNacimiento);
    if (updateData.fotoUsuario)
      dataToUpdate.fotoUsuario = updateData.fotoUsuario;
    if (updateData.password) dataToUpdate.password = updateData.password;

    console.log('UserService - dataToUpdate para Usuario:', dataToUpdate);

    // Actualizar usuario principal
    await this.prisma.usuarios.update({
      where: { id },
      data: dataToUpdate,
    });

    // 2. Si hay datos de terapeuta, actualizar tabla terapeutas
    if (updateData.terapeutaData) {
      const user = await this.prisma.usuarios.findUnique({
        where: { id },
        include: { datosExtraTerapeuta: true },
      });

      if (user?.datosExtraTerapeuta && user.datosExtraTerapeuta.length > 0) {
        const terapeutaId = user.datosExtraTerapeuta[0].id;

        console.log('Actualizando terapeuta ID:', terapeutaId);
        console.log(
          'Nuevos años de experiencia:',
          updateData.terapeutaData.añosExperiencia,
        );

        await this.prisma.terapeutas.update({
          where: { id: terapeutaId },
          data: {
            aniosExperiencia:
              Number(updateData.terapeutaData.añosExperiencia) || 0,
          },
        });
      }
    }

    // 3. Devolver usuario actualizado sin password
    return this.prisma.usuarios.findUnique({
      where: { id },
      select: {
        id: true,
        nombres: true,
        apellidos: true,
        correo: true,
        fechaNacimiento: true,
        fotoUsuario: true,
        tipoUsuario: true,
        cedula: true,
        genero: true,
        createdAt: true,
        updatedAt: true,
        fotoCedula: true,
        datosExtraTerapeuta: {
          select: {
            id: true,
            aniosExperiencia: true,
          },
        },
        datosExtraPaciente: {
          select: {
            id: true,
          },
        },
      },
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
