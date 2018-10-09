import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

let PrivateRoute = ({component: Component, ...rest}) => {
  
  return (
    <Route
      {...rest}
      render={
        props => {
          return rest.isAuthorized ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location }
              }}
            />
          );
        }
      }
    />
  );
};

const mapStateToProps = state => {
  return {
    isAuthorized: state.auth.isAuthorized
  };
};

PrivateRoute = connect(
  mapStateToProps
)(PrivateRoute);

export default PrivateRoute;