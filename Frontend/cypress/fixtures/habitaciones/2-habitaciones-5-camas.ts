import { IHabitacion } from '../../../src/interfaces/habitacion';

const b: IHabitacion[] = [
    {
        id: 1,
        nombre: "Azul",
        tieneBanio: false,
        esPrivada: false,
        informacionAdicional: "",
        camasIndividuales: [
            {
                id: 1,
                nombre: "1",
                tipo: "Individual"
            }
        ],
        camasCuchetas: [],
        camasMatrimoniales: [
            {
                id: 2,
                nombre: "Matri",
                tipo: "Matrimimonial"
            }
        ]
    },
    {
        id: 2,
        nombre: "Roja",
        tieneBanio: true,
        esPrivada: true,
        informacionAdicional: "",
        camasIndividuales: [
            {
                id: 5,
                nombre: "1",
                tipo: "Individual"
            },
            {
                id: 6,
                nombre: "2",
                tipo: "Individual"
            }
        ],
        camasCuchetas: [
            {
                id: 1,
                nombre: null,
                abajo: {
                    id: 3,
                    nombre: "Cucheta",
                    tipo: "Cucheta Abajo"
                },
                arriba: {
                    id: 4,
                    nombre: "Cucheta",
                    tipo: "Cucheta Arriba"
                }
            }
        ],
        camasMatrimoniales: []
    }    
]

export default b;