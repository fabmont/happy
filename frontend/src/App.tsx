import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import OrphanagesMap from "./pages/OrphanagesMap";
import Orphanage from "./pages/Orphanage";
import CreateOrphanage from "./pages/CreateOrphanage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/orfanatos" exact component={OrphanagesMap} />
        <Route path="/orfanatos/:id" component={Orphanage} />
        <Route path="/criar-orfanato" component={CreateOrphanage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
