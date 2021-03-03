import * as React from 'react'
import { useState, useEffect } from 'react';
import { tablaDeReservasSelector } from 'features/reservas/Tabla/slice'
import { useSelector } from 'react-redux'
import { IReserva } from 'interfaces/reserva';

export interface IParams {
    dia: number;
    camaId: number;
    claseCss: string;
}

const Celda = ({dia, camaId, claseCss}: IParams) => {
    
    //Creo que no debería pasarle la claseCss, es medio sucio, mejor decile si es HOY o no

    const {tabla} = useSelector(tablaDeReservasSelector);
    const [contenido, actualizarContenido] = useState<IReserva>({} as IReserva);

    useEffect(() => {
        actualizarContenido(tabla[`${dia}`][`${camaId}`]);
    }, [tabla, dia, camaId]); 

    return (<td className={claseCss} data-reserva-id={contenido.id} data-dia={dia} data-cama-id={camaId}>
                <div>
                    {contenido.aNombreDe}
                </div>
            </td>);
    
}

export default Celda;