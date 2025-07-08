export class AppointmentType {
  id: number;
  id_terapeuta_paciente: number;
  fechaHoraProgramada: Date;
  estado: string;
  notas?: string;
  direccion: string;
}
