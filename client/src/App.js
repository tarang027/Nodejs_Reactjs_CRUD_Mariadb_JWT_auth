import { Provider } from 'react-redux';
import store from './store/store';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProtectedRoute from './config/ProtectedRoute';
import UnprotectedRoute from './config/UnprotectedRoute';
import { UnAuthRoutes, AuthRoutes } from '../src/config/Routes'
import React from 'react';
import 'antd/dist/antd.css'; 
import { notification, Space } from 'antd';


export const showMessage = ({type, message}) => {
  notification[type]({
    message,
  });
};

function App() {
  return (
    <Provider store={store} >
      <Router basename="/" >
          <Switch>
            {AuthRoutes.map((RouteObj, index) => (
              <ProtectedRoute
                key={index}
                path={RouteObj.path}
                exact
                component={RouteObj.component}
              />
            ))}
            {UnAuthRoutes.map((RouteObj, index) => (
              <UnprotectedRoute
                key={index}
                path={RouteObj.path}
                exact
                component={RouteObj.component}
              />
            ))}
          </Switch>
      </Router>
    </Provider>
  );
}

export default App;