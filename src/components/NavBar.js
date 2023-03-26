import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function navBar(){
    return (
        <Fragment>

        <nav style={{ backgroundColor: '#614aeb', display: 'flex', alignItems: 'center', padding: '10px' }}>
        <div style={{ marginRight: 'auto', marginLeft: '10px' }}>
            <Link to ="/"><FontAwesomeIcon icon="fas fa-bars" size="xl" style={{color: "#ffffff",}} /></Link>
        </div>
        <div style={{ marginLeft: 'auto', marginRight: '10px' }}>
            <Link to="/settings"><FontAwesomeIcon icon="fa-solid fa-user" size="xl" style={{color: "#ffffff",}} /></Link>
        </div>
        </nav>
        </Fragment>
      );
}