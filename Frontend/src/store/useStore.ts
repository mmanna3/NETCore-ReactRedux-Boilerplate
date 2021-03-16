import { useHabitacionStore } from './api/habitacion/crear/useHabitacionStore';

interface IStore {
  habitaciones: {
    crear: () => any; //Probablemente acá pueda devolver una misma firma para todos los CREAR
  };
}

const store: IStore = {
  habitaciones: {
    crear: useHabitacionStore,
  },
};

export default store;
