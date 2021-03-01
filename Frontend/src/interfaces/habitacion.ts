interface ICama {
  id: number,
  nombre: string,
  tipo: string //Pasar a enum
}

interface ICamaCucheta {
  id: number,
  nombre: string,
  abajo: ICama,
  arriba: ICama
}

export interface IHabitacion {
  id: number;
  nombre: string,
  tieneBanio: boolean,
  esPrivada: boolean,
  informacionAdicional: string,
  camasIndividuales: ICama[],
  camasCuchetas: ICamaCucheta[],
  camasMatrimoniales: ICama[]
}