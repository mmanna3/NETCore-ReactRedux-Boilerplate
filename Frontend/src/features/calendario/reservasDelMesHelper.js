import {setInitialState} from './reservasDelMesSlice'
import {store} from 'index'

export const init = (diasDelMes, camas) => {        

    var initialState = diasDelMes.map((dia, row) => 
        camas.map((cama, column) => {
            return {selected: 'none'}
        })
    );

    store.dispatch(setInitialState(initialState));
}

