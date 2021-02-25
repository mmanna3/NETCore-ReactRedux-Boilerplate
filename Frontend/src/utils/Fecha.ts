export function convertirAString(objetoDate: any) {
    
    //Si son las 23.59.99999 (como en el hasta del daterangepicker), al pasar a ISOString redondea a un día más
    objetoDate.setHours(0);

    return objetoDate.toISOString().slice(0,10);
}

export function obtenerMes(fechaString: any) {    
    return fechaString.slice(5, 7);
}

export function obtenerDia(fechaString: any) {    
    return fechaString.slice(8);
}

export function obtenerAnio(fechaString: any) {    
    return fechaString.slice(0, 4);
}

export function hoy() {
    return new Date();
}

export function maniana() {
    let maniana = new Date();
    maniana.setDate(maniana.getDate() + 1);
    return maniana;
}

export function restarFechas(b: any, a: any) {
    
    const _Milisegundos_por_dia = 1000 * 60 * 60 * 24;

    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _Milisegundos_por_dia);
}