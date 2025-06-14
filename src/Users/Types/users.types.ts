export class CreateUserFullType {
  name: string;
  lastName: string;
  idCard: string;
  email: string;
  password: string;
  sex: string;
  idCardPath: string;
  imagePath: string;
  typeUser: string; // 'paciente' o 'terapeuta'
  birthDate: Date;

  // Opcionales según el tipo
  pacienteData?: {};
  terapeutaData?: {
    experience?: number;
    titlePath?: string;
  };
}