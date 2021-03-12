import * as React from 'react'
import { useState, useEffect } from 'react';
import { tablaDeReservasSelector, seleccionarTodasLasCeldasDeLaReserva } from 'features/reservas/Tabla/slice'
import { useSelector, useDispatch } from 'react-redux'
import estilos from './Celda.module.scss'
import { ReservaParaConsultaMensualDTO } from 'interfaces/reservasDelMes';

export interface IParams {
    dia: number;
    camaId: number;
    esHoy: boolean;
}

const Celda = ({dia, camaId, esHoy}: IParams) => {    

    const dispatch = useDispatch();
    const {tabla} = useSelector(tablaDeReservasSelector);
    const [contenido, actualizarContenido] = useState<ReservaParaConsultaMensualDTO>({} as ReservaParaConsultaMensualDTO);
    const [claseCssColor, actualizarClaseCssColor] = useState<string | undefined>("");
    
    const claseCssEsHoy = useState<string | undefined>(esHoy ? estilos.esHoy : "");

    const colores = new Map<number,string>([
        [0, estilos.colorCero],
        [1, estilos.colorUno],
        [2, estilos.colorDos],
        [3, estilos.colorTres],
        [4, estilos.colorCuatro],
        [5, estilos.colorCinco],
        [6, estilos.colorSeis],
        [7, estilos.colorSiete],
        [8, estilos.colorOcho],
        [9, estilos.colorNueve],
    ]);    
    
    const onMouseOver = () => {
        dispatch(seleccionarTodasLasCeldasDeLaReserva(contenido.id));
    }

    useEffect(() => {
        var contenido = tabla[`${dia}`][`${camaId}`];
        actualizarContenido(contenido);

        var codigoColorSegunTerminacionDelId = contenido.id % 10;
        actualizarClaseCssColor(colores.get(codigoColorSegunTerminacionDelId));

    }, [tabla, dia, camaId, colores]);

    return (<td className={`${claseCssEsHoy} ${claseCssColor} ${contenido.estaSeleccionada ? estilos.estaSeleccionada : ""}`} 
                data-reserva-id={contenido.id} data-dia={dia} data-cama-id={camaId} onMouseOver={onMouseOver}>
                <div>
                    {/* {contenido.aNombreDe} */}
                </div>
            </td>);
    
}

export default Celda;