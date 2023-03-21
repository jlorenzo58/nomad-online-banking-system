import React, {useState, useEffect, useContext, Fragment} from "react"
import "../styles/home.css"
import { ThemeContext } from '../themeContext.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreditCard, faPiggyBank } from '@fortawesome/fontawesome-free-solid'

function Home( {} ){

   
    return(
        <Fragment>
            <div className="home">
                <h3 className="float-left"> Nomad Banking Solutions </h3>
            </div>
            <div className="welcome">
                <div className="signIn">
                    <div className="span-welcome">
                        <span>Welcome</span>
                    </div>
                    <form>
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
                        <button className="btn-create-account">Create Account</button>
                    </div>
                </div>
            </div>
            <div className="content">
                <div className="tile">
                    <div className="title-header">
                        <span>News</span>
                    </div>
                    <div>
                        <p><a href="https://www.cnbc.com/2023/03/20/first-republic-falls-sp-credit-rating-downgrade.html">First Republic continues tanking</a></p>
                        <p><a href="https://www.cnn.com/business/live-news/stock-market-credit-suisse-bank-merger-03-20-23/index.html">Latest on the banking crisis and global markets</a></p>
                        <p><a href="https://www.cnn.com/2023/03/20/investing/global-markets-banking-sector-intl-hnk/index.html">Asia Pacific stocks rise as investor worries about global banking turmoil ease</a></p>
                        <p><a href="https://www.usnews.com/news/politics/articles/2023-03-21/army-of-lobbyists-helped-water-down-banking-regulations">Army of Lobbyists Helped Water Down Banking Regulations</a></p>
                    </div>
                </div>
                <div className="tile"> 
                    <div className="title-header">
                        <span>FAQs</span>
                    </div>
                    <div className="faqs">
                        <p><b>What is online banking and how does it work?</b></p>
                        <p>Online banking allows you to manage your bank account through a website or mobile app, instead of having to visit a physical bank branch. You can check your account balance, view transaction history, transfer money, and pay bills.</p>
                        <p><b>Is online banking secure?</b></p>
                        <p>Yes, online banking is generally considered secure, as long as you take appropriate precautions such as using a strong password, logging out after each session, and avoiding public Wi-Fi when accessing your account.</p>
                        <p><b>How do I transfer money between accounts?</b></p>
                        <p>To transfer money between accounts, log in to your online banking account and navigate to the transfer or payments section. You can then select the accounts you want to transfer money between, enter the amount, and confirm the transaction.</p>
                        <p><b>Can I deposit checks through online banking?</b></p>
                        <p>Yes! Just snap a photo of your check with your phone and submit.</p>
                    </div>
                </div>
                <div className="tile">
                    <div className="title-header">
                        <span>About Us</span>
                    </div>
                    <div>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur consequatur facilis possimus deleniti doloribus, sed necessitatibus perferendis repellendus earum praesentium.</p>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Home