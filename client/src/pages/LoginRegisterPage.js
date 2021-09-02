import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './LoginRegisterPage.css'
import { connect } from 'react-redux'
import { login, register } from '../actions'

const LoginRegisterPage = ({ register, login, isRegister }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    if (isRegister) {
      register(name, email, password)
    } else {
      login(email, password)
    }
  }
  return (
    <div className='form'>
      <h1>Welcome to Virtual Wallet</h1>
      <form>
        {isRegister ? (
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              className='form-control'
              name='name'
              id='name'
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
        ) : null}
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            className='form-control'
            name='email'
            id='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            className='form-control'
            name='password'
            id='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <input
          type='submit'
          className='btn btn-primary'
          onClick={handleSubmit}
          value={isRegister ? 'Sign In' : 'Log In'}
        />
      </form>
      {isRegister ? (
        <>
          <p>
            You've already have an account? <Link to='/login'>Login</Link>{' '}
          </p>
        </>
      ) : (
        <>
          <p>
            Don't have an account? <Link to='/register'>Sign In</Link>
          </p>
        </>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, { login, register })(LoginRegisterPage)
