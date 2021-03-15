import { useHabitacionStore } from './useHabitacionStore';

interface IStore {
  habitaciones: () => any;
}

const store: IStore = {
  habitaciones: useHabitacionStore,
};

export default store;
