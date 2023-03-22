import logo from './logo.svg';
import Home from './components/Home.js'
import './App.css';
import * as React from 'react'
// import React, {useState, useEffect, useContext, Fragment} from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route, Redirect,Navigate
} from "react-router-dom";



function App() {

  return (
    <React.Fragment>
        <div className = "light" style={{ position: "relative", minHeight: "100vh" }}>
          <Home />
        </div>
    </React.Fragment>
  );
}

export default App;
