export function convertirAString(objetoDate) {
    
    //Si son las 23.59.99999 (como en el hasta del daterangepicker), al pasar a ISOString redondea a un día más
    objetoDate.setHours(0);

    return objetoDate.toISOString().slice(0,10);
}

export function obtenerMes(fechaString) {    
    return fechaString.slice(5, 7);
}

export function obtenerDia(fechaString) {    
    return fechaString.slice(8);
}

export function obtenerAnio(fechaString) {    
    return fechaString.slice(0, 4);
}