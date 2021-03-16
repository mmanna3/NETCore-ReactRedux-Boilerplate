import useCrearHabitacion from './api/habitacion/crear/useCrearHabitacion';

interface IStore {
  habitaciones: {
    crear: () => any; //Probablemente acá pueda devolver una misma firma para todos los CREAR
  };
}

const store: IStore = {
  habitaciones: {
    crear: useCrearHabitacion,
  },
};

export default store;
