import React, {useCallback, useEffect} from 'react'
import { fetchCheckoutsDeHoy, checkoutsDeHoySelector } from './slice'
import { useDispatch, useSelector } from 'react-redux'
// import Estilos from './Componente.module.scss'

const CheckoutsDeHoy = () => {

  const dispatch = useDispatch();
  const { datos, estado } = useSelector(checkoutsDeHoySelector);

  const fetchData = useCallback(() => {
    dispatch(fetchCheckoutsDeHoy())
  }, [dispatch]);

  useEffect(() => fetchData(), [fetchData]);

  return (
    <div class="notification is-primary is-light">
      <button class="delete"></button>
      Primar lorem ipsum dolor sit amet, consectetur
      adipiscing elit lorem ipsum dolor. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum efficitur. Sit amet,
      consectetur adipiscing elit
    </div>
  )
}

export default CheckoutsDeHoy;