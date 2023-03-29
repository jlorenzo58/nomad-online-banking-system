import React, {useState, useEffect, useContext, Fragment} from "react"
import "../styles/home.css"
import { ThemeContext } from '../themeContext.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreditCard, faPiggyBank } from '@fortawesome/fontawesome-free-solid'
import { Container, Typography, Box, Grid, TextField, Button, Link, Paper } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Home( {} ){
    const navigate = useNavigate();
    const [account, setAccount] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event.target.username.value);
        console.log(event.target.password.value);
        const username = event.target.username.value;
        const password = event.target.password.value;

        axios.post('http://localhost:3001/api/login', { username, password })
        .then(response => {
            console.log(response.data);
            localStorage.setItem('userId', response.data.userId);
            navigate(`/overview/${response.data.userId}`);
        })
        .catch(error => {
            console.error(error);
        });
      };

      const handleSignIn = (event) =>{
        event.preventDefault();
        console.log(event.target.cardNumber.value);
        console.log(event.target.username.value);
        console.log(event.target.password.value);

        const username = event.target.username.value;
        const password = event.target.password.value;
        const creditCardNumber = event.target.cardNumber.value;
        axios.post('http://localhost:3001/api/accounts', { creditCardNumber, username, password })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
        navigate('/overview');
      }
   
    return(
        <Fragment>
            <div className="home">
                <h3 className="float-left"> Nomad Banking Solutions </h3>
            </div>

            {!account &&
            <div className="welcome">
                <div className="signIn">
                    <div className="span-welcome">
                        <span>Welcome</span>
                    </div>
                    <form onSubmit = {handleSubmit}>
                    <div className="row100">
                    <div className="col">
                        <div className="inputBox"> 
                            <input type="text" name="username" required="required" />
                            <span className="text">Username</span>
                            <span className="line"></span>
                        </div>
                    </div>
                    </div>
                    <div className="row100">
                    <div className="col">
                        <div className="inputBox">
                            <input type="password" name="password" required="required" />
                            <span className="text">Password</span>
                            <span className="line"></span>
                        </div>
                    </div>
                    </div>
                    <div className="row100">
                    <div className="col">
                        <div className="signIn-align">
                        <input type="submit" value="Sign In" />
                        </div>
                    </div>
                    </div>
                    </form>
                </div>
                <div className="open-account">
                    <div className="icons">
                        <FontAwesomeIcon icon={faCreditCard} size="2xl"  />
                        <div className="mt-1">
                            <span>Debit Cards</span>
                        </div>
                    </div>
                    <div className="icons">
                        <FontAwesomeIcon icon="fas fa-money-check-alt" size="2xl"  />
                        <div className="mt-1">
                            <span>Checkings</span>
                        </div>
                    </div>
                    <div className="icons">
                    <FontAwesomeIcon icon="fa-solid fa-piggy-bank" size="2xl"  />
                        <div className="mt-1">
                            <span>Savings</span>
                        </div>
                    </div>
                    <div className="prompt">
                        <span>New to Nomads Banking? Open an Account here!</span>
                    </div>
                    <div className="mt-2">
                        <button className="btn-create-account" onClick={()=>setAccount(true)}>Create Account</button>
                    </div>
                </div>
            </div>
            }
            {account &&
            <div className="welcome">
                <div className="signIn">
                    <div className="span-welcome">
                        <span>Welcome</span>
                    </div>
                    <form onSubmit={handleSignIn}>
                    <div className="row100">
                    <div className="col">
                        <div className="inputBox"> 
                            <input type="text" name="cardNumber" required="required" />
                            <span className="text">Card Number</span>
                            <span className="line"></span>
                        </div>
                    </div>
                    </div>
                    <div className="row100">
                    <div className="col">
                        <div className="inputBox"> 
                            <input type="text" name="username" required="required" />
                            <span className="text">Username</span>
                            <span className="line"></span>
                        </div>
                    </div>
                    </div>
                    <div className="row100">
                    <div className="col">
                        <div className="inputBox">
                            <input type="text" name="password" required="required" />
                            <span className="text">Password</span>
                            <span className="line"></span>
                        </div>
                    </div>
                    </div>
                    <div className="row100">
                    <div className="col">
                        <div className="signIn-align">
                        <input type="submit" value="Create Account" />
                        </div>
                    </div>
                    </div>
                    </form>
                </div>
                <div className="open-account">
                    <div className="icons">
                        <FontAwesomeIcon icon={faCreditCard} size="2xl"  />
                        <div className="mt-1">
                            <span>Debit Cards</span>
                        </div>
                    </div>
                    <div className="icons">
                        <FontAwesomeIcon icon="fas fa-money-check-alt" size="2xl"  />
                        <div className="mt-1">
                            <span>Checkings</span>
                        </div>
                    </div>
                    <div className="icons">
                    <FontAwesomeIcon icon="fa-solid fa-piggy-bank" size="2xl"  />
                        <div className="mt-1">
                            <span>Savings</span>
                        </div>
                    </div>
                    <div className="prompt">
                        <span>Already have an account? Sign in here!</span>
                    </div>
                    <div className="mt-2">
                        <button className="btn-create-account" onClick = {()=>setAccount(false)}>Sign In Here</button>
                    </div>
                </div>
            </div>
            }
            <div>
                <div style={{ padding: '20px', textAlign: 'justify' }}>
                <div style={{ marginBottom: '20px' }}>
                    <Typography variant="h5">FAQs</Typography>
                <div>
                <Typography variant="subtitle1"><b>What is online banking and how does it work?</b></Typography>
                <Typography variant="body1">Online banking allows you to manage your bank account through a website or mobile app, instead of having to visit a physical bank branch. You can check your account balance, view transaction history, transfer money, and pay bills.</Typography>
                </div>
                <div>
                    <Typography variant="subtitle1"><b>Is online banking secure?</b></Typography>
                    <Typography variant="body1">Yes, online banking is generally considered secure, as long as you take appropriate precautions such as using a strong password, logging out after each session, and avoiding public Wi-Fi when accessing your account.</Typography>
                </div>
                <div>
                    <Typography variant="subtitle1"><b>How do I transfer money between accounts?</b></Typography>
                    <Typography variant="body1">To transfer money between accounts, log in to your online banking account and navigate to the transfer or payments section. </Typography>
                </div>
                </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Home