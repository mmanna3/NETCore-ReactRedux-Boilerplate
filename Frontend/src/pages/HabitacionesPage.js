import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchHabitaciones, habitacionesSelector } from '../slices/habitaciones'

import { useTable } from 'react-table'

const HabitacionesPage = () => {
  const dispatch = useDispatch()
  const { habitaciones, loading, hasErrors } = useSelector(habitacionesSelector)

  useEffect(() => {
    dispatch(fetchHabitaciones())
  }, [dispatch])


const data = React.useMemo(
  () => habitaciones, [habitaciones]
)

const columns = React.useMemo(
  () => [
    {
      Header: 'Id',
      accessor: 'id',
    },
    {
      Header: 'Nombre',
      accessor: 'nombre',
    },
    {
      Header: 'Camas matrimoniales',
      accessor: 'camasMatrimoniales',
    },
    {
      Header: 'Camas marineras',
      accessor: 'camasMarineras',
    },
    {
      Header: 'Camas individuales',
      accessor: 'camasIndividuales',
    },
  ],
  []
)

const {
  getTableProps,
  getTableBodyProps,
  headerGroups,
  rows,
  prepareRow,
} = useTable({ columns, data })


  const render = () => {
    if (loading) return <p>Loading posts...</p>
    if (hasErrors) return <p>Unable to display posts.</p>

    return (
      <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: 'solid 3px red',
                    background: 'aliceblue',
                    color: 'black',
                    fontWeight: 'bold',
                  }}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>                
                {row.cells.map(cell => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: '10px',
                        border: 'solid 1px gray',
                        background: 'papayawhip',
                      }}
                    >
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }

  return (
    <section>
      <h1>Habitaciones</h1>
      {render()}
    </section>
  )
}

export default HabitacionesPage