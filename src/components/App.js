import React from "react";
import {
  HashRouter, Redirect,
  Route,
  Switch
} from "react-router-dom";

// components
import Layout from "./Layout";

export default function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/app/prep" />} />
        <PrivateRoute path="/" component={Layout}/>
      </Switch>
    </HashRouter>
  );
}

function PrivateRoute({ component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => React.createElement(component, props)}
    />
  );
}
