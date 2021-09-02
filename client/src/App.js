import HomePage from './pages/HomePage'
import { Route, Router, Switch } from 'react-router-dom'
import LoginRegisterPage from './pages/LoginRegisterPage'
import history from './history'
import AddOrEditMovements from './pages/AddOrEditMovement'
import Page404 from './pages/Page404'

function App () {
  return (
    <Router history={history}>
      <Switch>
        <Route path='/' component={HomePage} exact />
        <Route path='/login' component={LoginRegisterPage} exact />
        <Route
          path='/register'
          render={props => <LoginRegisterPage {...props} isRegister={true} />}
          exact
        />
        <Route
          path='/add/:type'
          render={props => <AddOrEditMovements {...props} Add={true} />}
        />
        <Route
          path='/:id/edit'
          render={props => <AddOrEditMovements {...props} Add={false} />}
        />
        <Route component={Page404} />
      </Switch>
    </Router>
  )
}

export default App
