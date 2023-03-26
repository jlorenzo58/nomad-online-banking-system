import React, { Fragment } from 'react';
import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Link, useParams } from "react-router-dom"
import { Box, Button, Paper, Typography } from '@material-ui/core';
import { Lifecycle } from "./Lifecycle.ts"
import axios from "axios"

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#dcdcdc',
    padding: theme.spacing(3),
  },
  greeting: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
  },
  section: {
    backgroundColor: 'white',
    borderRadius: '10px',
    marginTop: theme.spacing(3),
    padding: theme.spacing(3),
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
  },
  accountBox: {
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  accountType: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
  },
}));

const AccountOverview = () => {
  let params=useParams();
  const classes = useStyles();
  const now = new Date();
  const [listLifecycle, setListLifecycle] = useState(Lifecycle.Never)
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good Morning' : 'Good Afternoon';
  const dateOptions = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
  const dateString = now.toLocaleDateString('en-US', dateOptions);
  const [info, setInfo] = useState({});

  useEffect(() => {
    let lifecycle = listLifecycle
    if( lifecycle === Lifecycle.Reload ) {
      lifecycle = Lifecycle.Never
      setListLifecycle(lifecycle)
      return
    }
    if( lifecycle === Lifecycle.Never ) {
      setListLifecycle(Lifecycle.Loading)
      axios.get(`http://localhost:3001/api/overview/${params.id}`)
      .then(response => {
        console.log(response.data)
        setInfo(response.data);
        setListLifecycle(Lifecycle.Success)
      })
      .catch( err => {
        setListLifecycle(Lifecycle.Error)
        console.error(err)
      })
    }
  }, [listLifecycle])


  return (
    <Box className={classes.root}>
      <Typography className={classes.greeting}>{greeting}</Typography>
      <Typography>{dateString}</Typography>

      <Box display="flex" justifyContent="space-between" mt={3}>
        <Button variant="contained" color="primary"><Link to="/paybill" style={{ textDecoration: 'none' }}>Pay Bills</Link></Button>
        <Button variant="contained" color="primary"><Link to="/depositcheck" style={{ textDecoration: 'none' }}>Deposit Checks</Link></Button>
        <Button variant="contained" color="primary"><Link to="/transfer" style={{ textDecoration: 'none' }}>Transfer</Link></Button>
      </Box>
      {listLifecycle === Lifecycle.Success &&
      <Box className={classes.section}>
        <Typography className={classes.sectionTitle}>Accounts</Typography>
        <Box className={classes.accountBox}>
          <Typography className={classes.accountType}>Checking</Typography>
          <Typography variant="h6">${info.checking_balance}</Typography>
          <Typography>Account #: {info.checking_account_num}</Typography>
          <Typography>Routing #: {info.checking_routing_num}</Typography>
        </Box>

        <Box className={classes.accountBox}>
          <Typography className={classes.accountType}>Savings</Typography>
          <Typography variant="h6">${info.savings_balance}</Typography>
          <Typography>Account #: {info.saving_account_num}</Typography>
          <Typography>Routing #: {info.saving_account_num}</Typography>
        </Box>
      </Box>
      }
      {listLifecycle === Lifecycle.Loading &&
        <Fragment>Loading...</Fragment>

      }
      {listLifecycle === Lifecycle.Error &&
        <Fragment>Error!!!</Fragment>
      }
    </Box>
  );
};

export default AccountOverview;
