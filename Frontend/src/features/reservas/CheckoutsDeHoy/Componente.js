import React, { useCallback, useEffect, useState } from 'react';
import { fetchCheckoutsDeHoy, checkoutsDeHoySelector } from './slice';
import { useDispatch, useSelector } from 'react-redux';
import ESTADOS from 'store/estadosFetch';
import { BotonSalir } from 'components/botones/botones';

const CheckoutsDeHoy = () => {
  const dispatch = useDispatch();
  const { datos, estado } = useSelector(checkoutsDeHoySelector);
  const [visible, mostrar] = useState(true);

  const fetchData = useCallback(() => {
    dispatch(fetchCheckoutsDeHoy());
  }, [dispatch]);

  useEffect(() => fetchData(), [fetchData]);

  if (visible)
    return (
      <div className="notification is-primary is-light">
        <BotonSalir onClick={() => mostrar(false)} />
        {estado === ESTADOS.huboError ? (
          'Hubo un error.'
        ) : estado === ESTADOS.cargando ? (
          'Cargando...'
        ) : estado === ESTADOS.exitoso ? (
          <>
            <strong>Checkouts de hoy</strong>
            <ul>
              {datos.map((e, i) => (
                <li key={i}>{e.aNombreDe}</li>
              ))}
            </ul>
          </>
        ) : (
          <></>
        )}
      </div>
    );
  else return <></>;
};

export default CheckoutsDeHoy;
