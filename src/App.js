import logo from './logo.svg';
import Home from './components/Home.js'
import './App.css';
import React, {useState, useEffect, useContext, Fragment} from "react"


function App() {

  return (
    <Fragment>
        <div className = "light" style={{ position: "relative", minHeight: "100vh" }}>
          <Home />
        </div>
    </Fragment>
  );
}

export default App;
