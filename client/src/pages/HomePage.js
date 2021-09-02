import React, { useEffect } from 'react'
import Header from '../components/Header'
import Movements from '../components/Movements'
import { connect } from 'react-redux'
import { getMovements } from '../actions'
import history from '../history'
import './HomePage.css'
import Loader from 'react-loader-spinner'

const HomePage = ({ getMovements, auth, movements }) => {
  useEffect(() => {
    if (localStorage.getItem('user')) {
      getMovements(localStorage.getItem('token'))
    } else {
      history.push('/login')
    }
  }, [getMovements, auth])
  const ingresos = []
  const gastos = []
  if (movements.movements) {
    for (let i = 0; i < movements.movements.length; i++) {
      if (movements.movements[i].movement_type === 'entrys') {
        ingresos.push(movements.movements[i])
      } else {
        gastos.push(movements.movements[i])
      }
    }
  }
  const entrysAmount = () => {
    let res = 0
    ingresos.forEach(entry => {
      res += entry['amount']
    })
    return res
  }
  const expensesAmount = () => {
    let res = 0
    gastos.forEach(expense => {
      res += expense['amount']
    })
    return res
  }
  const handleTotal = () => {
    if (entrysAmount() > expensesAmount()) {
      return (
        <h4 style={{ backgroundColor: 'green' }}>
          Total: ${entrysAmount() - expensesAmount()}
        </h4>
      )
    } else {
      return (
        <h4 style={{ backgroundColor: 'red' }}>
          Total: ${entrysAmount() - expensesAmount()}
        </h4>
      )
    }
  }

  if (movements.length < 1) {
    return (
      <div className='loader'>
        <Loader type='Puff' color='#00BFFF' height={100} width={100} />
      </div>
    )
  } else {
    return (
      <div className='container'>
        <Header />
        <div className='row'>
          <div className='col-xl-6'>
            <Movements
              type='entrys'
              entrysAmount={entrysAmount()}
              movements={ingresos}
            />
          </div>
          <div className='col-xl-6'>
            <Movements
              type='expenses'
              expensesAmount={expensesAmount()}
              movements={gastos}
            />
          </div>
        </div>

        <div className='balance'>{handleTotal()}</div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    movements: state.movements
  }
}

export default connect(mapStateToProps, { getMovements })(HomePage)
