import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import MainPage from "./user/MainPage";
const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/main" exact component={MainPage} />
        {/* <Route path="signup" exact component />
        <Route path="signin" exact component /> */}
      </Switch>
    </Router>
  );
};

export default Routes;
