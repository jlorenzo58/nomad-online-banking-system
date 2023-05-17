import logo from './logo.svg';
import Home from './components/Home.js'
import './App.css';
import * as React from 'react'
import NavBar from "./components/NavBar";
import Footer from "./components/Footer.js";
import Overview from "./components/Overview.js";
import Settings from "./components/Settings.js";
import Send from "./components/Send.js";
import DepositCheck from "./components/DepositCheck.js";
import Contact from "./components/Contact.js";
import Transfer from "./components/Transfer.js";
import {
  BrowserRouter as Router,
  Routes,
  Route, Redirect,Navigate
} from "react-router-dom";



function App() {

  return (
    <React.Fragment>
    <Router>
        <div className = "light" style={{ position: "relative", minHeight: "100vh" }}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/overview/:id" element={<Overview />} />
          <Route path ="/depositcheck" element={<DepositCheck/>} />
          <Route path ="/contact" element={<Contact />} />
          <Route path="/send" element={<Send />} /> 
          <Route path="/settings" element ={<Settings />} />
        </Routes>
        <Footer />
        </div>
      </Router>
    </React.Fragment>
  );
}

export default App;
