import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Tracker from "./pages/Tracker";

export const App = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Tracker" component={Tracker} />
      </Switch>
    </Layout>
  </BrowserRouter>
);
