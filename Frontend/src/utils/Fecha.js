export function convertirAString(fechaDateTime) {
    return fechaDateTime.toISOString().slice(0,10);
}