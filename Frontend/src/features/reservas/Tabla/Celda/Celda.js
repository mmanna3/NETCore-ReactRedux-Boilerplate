import React, { useState, useEffect } from 'react';
import { tablaDeReservasSelector } from 'features/reservas/Tabla/slice'
import { useSelector } from 'react-redux'

const Celda = ({dia, camaId, claseCss}) => {

    const {tabla} = useSelector(tablaDeReservasSelector);
    const [contenido, actualizarContenido] = useState('');

    useEffect(() => {
        actualizarContenido(tabla[`${dia}`][`${camaId}`]);
    }, [tabla, dia, camaId]); 

    return (
        <td className={claseCss} dia={dia} camaid={camaId}><div>{contenido}</div></td>
    )
}

export default Celda;