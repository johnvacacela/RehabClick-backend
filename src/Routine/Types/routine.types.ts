export class RoutineType {
  id_terapeuta_paciente: number;
  nombre: string;
  ejercicios: {
    id_ejercicio: number;
    repeticiones: number;
    orden: number;
  }[];
}
