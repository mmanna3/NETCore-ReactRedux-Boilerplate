import { ICama } from './habitacion';

export interface IReservasDelMes {
  desde: string;
  hasta: string;
  reservas: ReservaParaConsultaMensualDTO[];
}

export interface ReservaParaConsultaMensualDTO {
  estaSeleccionada: boolean;
  id: number;
  diaInicio: number;
  diaFin: number;
  aNombreDe: string;
  CamasIds: number[];
}

export interface IHabitacionParaTablaReservas {
  id: number;
  nombre: string;
  esPrivada: boolean;
  camas: ICama[];
}
