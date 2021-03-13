export function convertirAString(fecha: Date): string {
  //Si son las 23.59.99999 (como en el hasta del daterangepicker), al pasar a ISOString redondea a un día más
  fecha.setHours(0);

  return fecha.toISOString().slice(0, 10);
}

export function obtenerMes(fechaString: string): number {
  return parseInt(fechaString.slice(5, 7));
}

export function obtenerDia(fechaString: string): number {
  return parseInt(fechaString.slice(8));
}

export function obtenerAnio(fechaString: string): number {
  return parseInt(fechaString.slice(0, 4));
}

export function hoy(): Date {
  return new Date();
}

export function maniana(): Date {
  let maniana = new Date();
  maniana.setDate(maniana.getDate() + 1);
  return maniana;
}

export function restarFechas(b: Date, a: Date): number {
  const _milisegundosQueTieneCadaDia = 1000 * 60 * 60 * 24;

  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _milisegundosQueTieneCadaDia);
}
