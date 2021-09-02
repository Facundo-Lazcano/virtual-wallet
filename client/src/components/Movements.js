import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Movements.css'
import { connect } from 'react-redux'
import { deleteMovement, sortMovementsByCategory } from '../actions'

const Movements = ({
  type,
  movements,
  entrysAmount,
  expensesAmount,
  deleteMovement,
  sortMovementsByCategory,
  auth
}) => {
  useEffect(() => {
    renderMovements()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const renderMovements = () => {
    return (
      <>
        {movements.map(movement => {
          return (
            <tbody key={movement['id']}>
              <tr key={movement['id']}>
                <td>${movement['amount']}</td>
                <td>{movement['description']}</td>
                <td>{movement['category']}</td>
                <td>{movement['createdAt'].split('T')[0]}</td>
                <td className='actions'>
                  <Link to={`/${movement['id']}/edit`}>
                    <i className='fas fa-edit'></i>
                  </Link>
                  <button
                    onClick={() =>
                      deleteMovement(
                        movement['id'],
                        localStorage.getItem('token')
                      )
                    }
                  >
                    <i className='fas fa-trash-alt'></i>
                  </button>
                </td>
              </tr>
            </tbody>
          )
        })}
      </>
    )
  }

  return (
    <div>
      <h3>{type}</h3>
      <table className='table'>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Description</th>
            <th>
              <input
                type='button'
                onClick={sortMovementsByCategory}
                value='Category'
              />
            </th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        {renderMovements()}
      </table>
      <div className='add'>
        <Link to={`/add/${type}`}>
          <i className='fas fa-plus-square'></i>
        </Link>
      </div>
      <div className='total'>
        <p>Total {type}:</p>
        <p>${type === 'entrys' ? entrysAmount : expensesAmount}</p>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, {
  deleteMovement,
  sortMovementsByCategory
})(Movements)
