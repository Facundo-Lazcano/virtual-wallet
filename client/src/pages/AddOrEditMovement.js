import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { updateMovement, getMovement, addMovement } from '../actions'
import Header from '../components/Header'
import history from '../history'
import './AddOrEditMovement.css'

const AddOrEditMovements = ({
  Add,
  getMovement,
  updateMovement,
  addMovement,
  auth,
  match,
  movement
}) => {
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const movement_type = match.params.type

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      history.push('/login')
    }
    if (!Add) {
      getMovement(match.params.id, localStorage.getItem('token'))
      if (movement.movements) {
        setAmount(movement.movements.amount || '')
        setDescription(movement.movements.description || '')
        setCategory(movement.movements.category || '')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movement.movements.amount])

  const handleAddOrEdit = () => {
    if (Add) {
      addMovement(
        amount,
        description,
        movement_type,
        category,
        localStorage.getItem('token')
      )
    } else {
      updateMovement(
        movement.movements.id,
        amount,
        description,
        category,
        localStorage.getItem('token')
      )
    }
  }

  return (
    <div className='container'>
      <Header />
      <div className='form'>
        <h2>
          {Add ? 'Add' : 'Edit'} {match.params.type}
        </h2>
        <div className='form-group'>
          <label htmlFor='amount'>Amount</label>
          <input
            type='number'
            name='amount'
            id='amount'
            value={amount}
            className='form-control'
            onChange={e => setAmount(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='Description'>Description</label>
          <input
            type='text'
            name='Description'
            id='Description'
            value={description}
            onChange={e => setDescription(e.target.value)}
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='Category'>Category</label>
          <input
            type='text'
            name='Category'
            id='Category'
            value={category}
            onChange={e => setCategory(e.target.value)}
            className='form-control'
          />
        </div>
        <div className='buttons'>
          <input
            onClick={handleAddOrEdit}
            type='button'
            value={Add ? 'Add' : 'Edit'}
            className='btn btn-primary'
          />
          <div className='btn btn-danger'>
            <Link to='/'>Cancel</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = state => {
  return {
    auth: state.auth,
    movement: state.movements
  }
}
export default connect(mapStateToProps, {
  getMovement,
  updateMovement,
  addMovement
})(AddOrEditMovements)
