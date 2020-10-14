import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import OrphanagesMap from "./pages/OrphanagesMap";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/orfanatos" component={OrphanagesMap} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
