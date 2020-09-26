export function convertirAString(objetoDate) {
    
    //Si son las 23.59.99999 (como en el hasta del daterangepicker), al pasar a ISOString redondea a un día más
    objetoDate.setHours(0);

    return objetoDate.toISOString().slice(0,10);
}