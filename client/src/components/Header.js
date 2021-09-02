import React from 'react'
import './Header.css'
import { connect } from 'react-redux'
import { logout } from '../actions'
import { Link } from 'react-router-dom'

const Header = ({ auth, logout }) => {
  const name = localStorage.getItem('user')
  return (
    <div className='header'>
      <Link to='/'>
        <h1>Virtual Wallet</h1>
      </Link>
      <div className='user'>
        {localStorage.getItem('user') ? <p>Hello {name}</p> : null}
        <button className='logout' type='submit' onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  )
}
const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}
export default connect(mapStateToProps, { logout })(Header)
