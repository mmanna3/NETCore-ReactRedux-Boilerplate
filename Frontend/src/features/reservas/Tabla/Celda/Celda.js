import React, { useState, useEffect } from 'react';
import { tablaDeReservasSelector } from 'features/reservas/Tabla/slice'
import { useSelector } from 'react-redux'

const Celda = ({dia, camaId}) => {

    const {tabla} = useSelector(tablaDeReservasSelector);
    const [contenido, actualizarContenido] = useState('');

    useEffect(() => {
        actualizarContenido(tabla[dia-1][`${camaId}`]);
    }, [tabla, dia, camaId]); 

    return (
        <td dia={dia} camaid={camaId}><div>{contenido}</div></td>
    )
}

export default Celda;