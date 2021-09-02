import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import './Page404.css'

const Page404 = () => {
  return (
    <div className='container text-center'>
      <Header />
      <div className='title'>
        <h1>404</h1>
      </div>

      <h3>Page Not Found</h3>
      <div className='link'>
        <Link to='/'>Go to Home Page</Link>
      </div>
    </div>
  )
}

export default Page404
