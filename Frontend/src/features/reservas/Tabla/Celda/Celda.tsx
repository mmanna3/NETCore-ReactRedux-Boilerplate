import * as React from 'react'
import { useState, useEffect } from 'react';
import { tablaDeReservasSelector } from 'features/reservas/Tabla/slice'
import { useSelector } from 'react-redux'
import { IReserva } from 'interfaces/reserva';
import estilos from './Celda.module.scss'

export interface IParams {
    dia: number;
    camaId: number;
    claseCss: string;
}

const Celda = ({dia, camaId, claseCss}: IParams) => {
    
    //Creo que no debería pasarle la claseCss, es medio sucio, mejor decile si es HOY o no

    const {tabla} = useSelector(tablaDeReservasSelector);
    const [contenido, actualizarContenido] = useState<IReserva>({} as IReserva);
    const [claseCssColor, actualizarClaseCssColor] = useState<string | undefined>("");

    interface IColor {
        numero: number,
        claseCss: string,        
    }
    
    //No creo que esta sea la forma óprima, pero después lo cambiaremos
    const colores : IColor[] = [
        { numero: 1, claseCss: estilos.colorCero },
        { numero: 2, claseCss: estilos.colorDos },
        { numero: 3, claseCss: estilos.colorTres },
        { numero: 4, claseCss: estilos.colorCuatro }, //{ numero: 4, claseCss: Estilos.colorCuatro },
        { numero: 5, claseCss: estilos.colorCinco },
        { numero: 6, claseCss: estilos.colorSeis },
        { numero: 7, claseCss: estilos.colorSiete },
        { numero: 8, claseCss: estilos.colorOcho },
        { numero: 9, claseCss: estilos.colorNueve },
        { numero: 0, claseCss: estilos.colorCero },
    ];
    
    useEffect(() => {
        var contenido = tabla[`${dia}`][`${camaId}`];
        actualizarContenido(contenido);
        if (contenido)
            debugger;

        var codigoColorSegunTerminacionDelId = contenido.id % 10;
        actualizarClaseCssColor(colores.find(i => i.numero === codigoColorSegunTerminacionDelId)?.claseCss);

    }, [tabla, dia, camaId, colores]);

    return (<td className={`${claseCss} ${claseCssColor}`} data-reserva-id={contenido.id} data-dia={dia} data-cama-id={camaId}>
                <div>
                    {contenido.aNombreDe}
                </div>
            </td>);
    
}

export default Celda;