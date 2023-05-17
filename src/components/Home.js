import React, {useState, useEffect, useContext, Fragment} from "react"
import "../styles/home.css"
import image from "../images/nomads.png"
import { ThemeContext } from '../themeContext.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreditCard, faPiggyBank } from '@fortawesome/fontawesome-free-solid'
import { Container, CircularProgress, Typography, Box, Grid, TextField, Button, Link, Paper } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home( {} ){
    const navigate = useNavigate();
    const [account, setAccount] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    let isMounted
    let source

    useEffect(() => {
        isMounted = true;
        source = axios.CancelToken.source();
    
        // Clean up function
        return () => {
          isMounted = false;
          source.cancel('Request canceled');
        };
      }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        const username = event.target.username.value;
        const password = event.target.password.value;

        axios.post('/.netlify/functions/api/login', { username, password }, { cancelToken: source.token })
        .then(response => {
            if (isMounted) {
                // Update state and navigate if component is still mounted
                console.log(response.data);
                localStorage.setItem('userId', response.data.userId);
                navigate(`/overview/${response.data.userId}`);
                setIsLoading(false);
              }
        })
        .catch(error => {
            console.error(error);
        if (isMounted) {
            // Update state if component is still mounted
            setIsLoading(false);
            alert("Incorrect username or password");
      }
        });
    };

    const handleSignIn = (event) =>{
        event.preventDefault();
        setIsLoading(true);
        const username = event.target.username.value;
        const password = event.target.password.value;
        const creditCardNumber = event.target.cardNumber.value;
        axios.post('/.netlify/functions/api/accounts', { creditCardNumber, username, password }, { cancelToken: source.token })
        .then(response => {
            if (isMounted) {
                // Update state and navigate if component is still mounted
                localStorage.setItem('userId', response.data.userId);
                navigate(`/overview/${response.data.userId}`);
                setIsLoading(false);
            }
        })
        .catch(error => {
            if (isMounted) {
                // Update state if component is still mounted
                setIsLoading(false);
                alert("Credit card not found");
            }
        });
    }
   
    return(
        <Fragment>
        {isLoading && (
            <div className="loading-overlay">
              <CircularProgress size={80} thickness={40} />
            </div>
          )}
            <Fragment>
            <div className="home">
                <img src = {image} width="350" />
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
                            <input type="password" name="password" required="required" />
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

            <Grid container spacing={2}>
      <Grid item xs={3}>
        <div style={{ padding: '20px' }}>
          <Typography variant="h6" style={{ color: '#614aeb' }}>
            Checking with the right features
          </Typography>
          <Typography variant="body2" style={{ color: 'black' }}>
          Our checking account offers a range of features designed to meet your banking needs. Enjoy seamless online banking, mobile deposit, and easy fund transfers. Stay in control of your finances with real-time balance updates and customizable alerts. Plus, take advantage of our fee-free ATM network and earn rewards on qualifying transactions. Open an account today and experience hassle-free banking with all the right features.
          </Typography>
          <Link href="#" style={{ color: 'blue' }}>
            Get Started
          </Link>
        </div>
      </Grid>
      <Grid item xs={3}>
        <div style={{ padding: '20px' }}>
          <Typography variant="h6" style={{ color: '#614aeb' }}>
            Cash Back offers
          </Typography>
          <Typography variant="body2" style={{ color: 'black' }}>
          Earn cash back on your everyday purchases with our Cash Back program. Get rewarded for using your debit card at participating merchants, including popular retailers, restaurants, and online stores. Whether you're grabbing your morning coffee, shopping for groceries, or treating yourself to a night out, you can earn a percentage of your purchase back as cash. It's a simple and convenient way to make your money go further. Start enjoying the benefits of our Cash Back offers today!
          </Typography>
          <Link href="#" style={{ color: 'blue' }}>
            Learn More
          </Link>
        </div>
      </Grid>
      <Grid item xs={3}>
        <div style={{ padding: '20px' }}>
          <Typography variant="h6" style={{ color: '#614aeb' }}>
            Invest your way
          </Typography>
          <Typography variant="body2" style={{ color: 'black' }}>
          Take control of your financial future and invest your way with our flexible investment options. Whether you're a seasoned investor or just starting out, we offer a range of investment products to suit your goals and risk tolerance. Choose from a diverse selection of funds, stocks, and bonds, or explore our managed portfolios for hands-off investing. With our user-friendly online platform, you can track your investments, make adjustments, and stay informed about market trends.
          </Typography>
          <Link href="#" style={{ color: 'blue' }}>
            Learn More
          </Link>
        </div>
      </Grid>
      <Grid item xs={3}>
        <div style={{padding: '20px' }}>
          <Typography variant="h6" style={{ color: '#614aeb' }}>
            Save on interest
          </Typography>
          <Typography variant="body2" style={{ color: 'black' }}>
          With our savings accounts, you can save on interest and make your money work harder for you. Earn competitive interest rates on your savings balance and watch your funds grow over time. Whether you're saving for a specific goal, building an emergency fund, or planning for the future, our savings accounts offer security and peace of mind. Take advantage of features like automatic transfers, round-up options, and personalized savings goals to stay on track.
          </Typography>
          <Link href="#" style={{ color: 'blue' }}>
            Learn More
          </Link>
        </div>
      </Grid>
            </Grid>
            </Fragment>
          
        </Fragment>
    )
}

export default Home