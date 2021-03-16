import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { crearHabitacion, cleanErrors, crearHabitacionSelector } from './slice';

export function useCrearHabitacion(): any {
  const dispatch = useDispatch();
  const { loading, validationErrors } = useSelector(crearHabitacionSelector);

  const agregarHabitacion = useCallback((data: any, onSuccess: any): any => dispatch(crearHabitacion(data, onSuccess)), [
    dispatch,
  ]);

  const limpiarErrores = useCallback((): any => dispatch(cleanErrors()), [dispatch]);

  return {
    loading,
    validationErrors,
    agregarHabitacion,
    cleanErrors: limpiarErrores,
  };
}

export default useCrearHabitacion;
