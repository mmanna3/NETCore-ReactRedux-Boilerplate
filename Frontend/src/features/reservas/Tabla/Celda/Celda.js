import React from 'react';
import { tablaDeReservasSelector } from 'features/reservas/Tabla/slice'
import { useSelector } from 'react-redux'

const Celda = ({dia, camaId}) => {

    const {tabla} = useSelector(tablaDeReservasSelector);

    return (
        <td dia={dia} camaid={camaId}>{tabla[dia-1][`${camaId}`]}</td>
    )
}

export default Celda;