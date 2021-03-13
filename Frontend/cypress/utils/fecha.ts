import * as fechaUtils from '../../src/utils/Fecha';

export function diaDeHoy(): number {
  return fechaUtils.obtenerDia(fechaUtils.convertirAString(fechaUtils.hoy()));
}

export function fechaDeHoy(): string {
  return fechaUtils.convertirAString(fechaUtils.hoy());
}

export function fechaDentroDe30Dias(): string {
  return fechaUtils.convertirAString(fechaUtils.sumarDiasALaFecha(fechaUtils.hoy(), 30));
}
