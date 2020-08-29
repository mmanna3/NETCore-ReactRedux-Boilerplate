import {setInitialState, seleccionarPrimeraCelda, seleccionarCeldaUnica, seleccionarCeldaIntermedia, reservasDelMesSelector} from './slice'
import {store} from 'index'

const invokeSelector = (selector) => selector(store.getState());

const dispatchAction = (action) => store.dispatch(action);

export const init = (diasDelMes, camas) => {        

    var initialState = diasDelMes.map((dia, row) => 
        camas.map((cama, column) => {
            return {selected: 'none'}
        })
    );

    dispatchAction(setInitialState(initialState));
}

export const seleccionarUnSoloDiaEnUnaSolaCama = (row, column) => {    
    dispatchAction(seleccionarCeldaUnica(row, column));
}

export const getCamaDiaInfo = (row, column) => {    
    var reservasDelMes = invokeSelector(reservasDelMesSelector);
    return reservasDelMes.calendario[row][column];
}

export const iniciarSeleccion = (row, column) => {    
    dispatchAction(seleccionarPrimeraCelda(row, column));
}

export const seleccionarDiaIntermedio = (row, column) => {
    dispatchAction(seleccionarCeldaIntermedia(row, column));
}

