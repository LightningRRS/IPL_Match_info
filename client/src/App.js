import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import BallByBall from "./Components/BallByBall";
import Header from "./Components/Header";
import TeamDetails from "./Components/TeamDetails";
import TeamInfo from "./Components/TeamInfo";
import Teams from "./Components/Teams";
import Error from "./Components/Error";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/team/:id/more" exact>
          <TeamDetails />
        </Route>
        <Route path="/match/details/:id" exact>
          <BallByBall />
        </Route>
        <Route path="/team/:id" exact>
          <TeamInfo />
        </Route>
        <Route path="/" exact>
          <Teams />
        </Route>
        <Route path="/404" component={Error} />
        <Redirect to="/404" />
      </Switch>
    </Router>
  );
}

export default App;
