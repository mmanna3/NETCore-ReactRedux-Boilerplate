export enum CamaTipo {
  Individual = 'Individual',
  Matrimonial = 'Matrimonial',
  CuchetaArriba = 'Cucheta Arriba',
  CuchetaAbajo = 'Cucheta Abajo',
}
export interface ICama {
  id: number;
  nombre: string;
  tipo: CamaTipo;
}

interface ICamaCucheta {
  id: number;
  nombre: string;
  abajo: ICama;
  arriba: ICama;
}

export interface IHabitacion {
  id: number;
  nombre: string;
  tieneBanio: boolean;
  esPrivada: boolean;
  informacionAdicional: string;
  camasIndividuales: ICama[];
  camasCuchetas: ICamaCucheta[];
  camasMatrimoniales: ICama[];
}
