import React, { Fragment, Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//import router
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import './App.css';
//components
import Movies from './components/Movies';
import NavBar from './components/NavBar';
import Customers from './components/Customers';
import Rentals from './components/Rentals';
import NotFound from './components/NotFound';
import MovieForm from './components/MovieForm';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Logout from './components/logout';
import ProtectedRoutes from './common/protectedRoutes';

//services
import auth from './services/authService';

class App extends Component {
  state = {};

  componentDidMount() {
    this.setState({ user: auth.getCurrentUser() });
  }

  render() {
    const { user } = this.state;
    return (
      <Fragment>
        <ToastContainer />
        <Router>
          <NavBar user={user} />
          <main className='container'>
            <Switch>
              <ProtectedRoutes path='/movies/:id' component={MovieForm} />
              <Route
                path='/movies'
                render={props => <Movies {...props} user={user} />}
              />
              <Route path='/login' component={LoginForm} />
              <Route path='/logout' component={Logout} />
              <Route path='/register' component={RegisterForm} />
              <Redirect exact from='/' to='/movies' />
              <Route path='/customers' component={Customers} />
              <Route path='/rentals' component={Rentals} />
              <Route path='/not-found' component={NotFound} />
              <Redirect to='/not-found' />
            </Switch>
          </main>
        </Router>
      </Fragment>
    );
  }
}

export default App;
