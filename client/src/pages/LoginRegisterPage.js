import React from 'react'
import { Link } from 'react-router-dom'
import './LoginRegisterPage.css'
import { connect } from 'react-redux'
import { login, register } from '../actions'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

const LoginRegisterPage = ({ register, login, isRegister }) => {
  const FormSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    password: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Required')
  })

  const handleSubmit = (name, email, password) => {
    if (isRegister) {
      register(name, email, password)
    } else {
      login(email, password)
    }
  }

  return (
    <div className='form container login'>
      <h1>Welcome to Virtual Wallet</h1>
      <Formik
        initialValues={{
          name: '',
          password: '',
          email: ''
        }}
        validationSchema={FormSchema}
        onSubmit={values => {
          handleSubmit(values.name, values.email, values.password)
        }}
      >
        {({ errors, touched }) => (
          <Form>
            {isRegister ? (
              <div className='form-group'>
                <Field
                  name='name'
                  placeholder='Name'
                  className='form-control'
                />
                {errors.name && touched.name ? <div>{errors.name}</div> : null}
              </div>
            ) : null}
            <div className='form-group'>
              <Field name='email' type='email' className='form-control' />
              {errors.email && touched.email ? <div>{errors.email}</div> : null}
            </div>
            <div className='form-group'>
              <Field name='password' type='password' className='form-control' />
              {errors.password && touched.password ? (
                <div>{errors.password}</div>
              ) : null}
            </div>
            <button type='submit' className='btn btn-primary'>
              {isRegister ? 'Sign In' : 'Log In'}
            </button>
          </Form>
        )}
      </Formik>
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
