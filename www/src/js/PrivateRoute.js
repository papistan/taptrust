
import React,{ Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { signedin } from './api';

let authenticated = false;

const PrivateRoute = ({ component: Component, ...rest }) => (
    
  signedin()
  .then((res) => {
     authenticated = true;
  })
  .catch((error) => {
    console.log(error)
  }),

    <Route {...rest} render={(props) => (
      authenticated === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/signin',
          state: { from: props.location }
        }} />
    )} />
  )

  export default PrivateRoute;