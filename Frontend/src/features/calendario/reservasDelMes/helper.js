import {setInitialState, updateCell, reservasDelMesSelector} from './slice'
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
    dispatchAction(updateCell(row, column));
}

export const getCamaDiaInfo = (row, column) => {    
    var reservasDelMes = invokeSelector(reservasDelMesSelector);
    return reservasDelMes.calendario[row][column].selected;
}

