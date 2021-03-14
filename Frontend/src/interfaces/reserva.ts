export interface IReserva {
  id: number;
  aNombreDe: string;
  diaInicio: number;
  diaFin: number;
  camasIds: number[];
  estaSeleccionada: boolean; //Es igual a IReservaParaConsultaMensualDTO salvo por esta property. RE FAC TOR   BRO
}
