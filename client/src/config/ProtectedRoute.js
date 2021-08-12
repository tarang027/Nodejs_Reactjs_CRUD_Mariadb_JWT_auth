import React from "react";
import { Route, Redirect } from "react-router-dom";
import jwtDecode from 'jwt-decode';



const isAuthTokenValid = () => {

    let access_token =  localStorage.getItem('jwt_access_token')

    if (!access_token) {
        return false;
    }
    const decoded = jwtDecode(access_token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        return false;
    }
    else {
        return true;
    }
};


const ProtectedRoute = ({ component: Component, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if ( isAuthTokenValid() ) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};


export default (ProtectedRoute)