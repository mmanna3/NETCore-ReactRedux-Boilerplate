import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTable } from 'react-table'

const Tabla = ({getData, selector, columnas}) => {
  const dispatch = useDispatch()
  const { datos, loading, hasErrors } = useSelector(selector)

  useEffect(() => {
    dispatch(getData())
  }, [dispatch, getData])


  const data = React.useMemo(
    () => datos, [datos]
  )

  const columns = React.useMemo(
    () => columnas, [columnas]
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data })

  const bodyConDatos = 
  (
    <tbody {...getTableBodyProps()}>
    {rows.map(row => {
      prepareRow(row)
      return (
        <tr {...row.getRowProps()}>                
          {row.cells.map(cell => {
            return (
              <td {...cell.getCellProps()}>
                {cell.render('Cell')}
              </td>
            )
          })}
        </tr>
      )
    })}
  </tbody>
  ); 
  
  if (hasErrors) return <p>Unable to display posts.</p>

  return (
    <table {...getTableProps()} className="table is-striped is-hoverable is-bordered is-fullwidth">
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} className="is-primary">
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      {( loading ? (<p> Loading...</p>) : bodyConDatos)}
    </table>
  )  
}

export default Tabla