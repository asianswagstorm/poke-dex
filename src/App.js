import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import background from "./images/background.png";
import Home from "./Components/Home";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

import "./styles/App.css";
function App() {
  return (
    <BrowserRouter>
      <div className="App" style={{ background: `url(${background})` }} >
        <Header />
        <div className="content" >
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="*" exact component={Header} />
        </Switch>
        </div>
        <div className="footer-seperator">
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
