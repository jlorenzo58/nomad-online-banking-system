import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom"
import { Box, Button, Paper, Typography } from '@material-ui/core';

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
  const classes = useStyles();
  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good Morning' : 'Good Afternoon';
  const dateOptions = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
  const dateString = now.toLocaleDateString('en-US', dateOptions);

  return (
    <Box className={classes.root}>
      <Typography className={classes.greeting}>{greeting}</Typography>
      <Typography>{dateString}</Typography>

      <Box display="flex" justifyContent="space-between" mt={3}>
        <Button variant="contained" color="primary"><Link to="/paybill" style={{ textDecoration: 'none' }}>Pay Bills</Link></Button>
        <Button variant="contained" color="primary"><Link to="/depositcheck" style={{ textDecoration: 'none' }}>Deposit Checks</Link></Button>
        <Button variant="contained" color="primary"><Link to="/transfer" style={{ textDecoration: 'none' }}>Transfer</Link></Button>
      </Box>

      <Box className={classes.section}>
        <Typography className={classes.sectionTitle}>Accounts</Typography>

        <Box className={classes.accountBox}>
          <Typography className={classes.accountType}>Checking</Typography>
          <Typography variant="h6">$1,234.56</Typography>
          <Typography>Account #: 123456789</Typography>
          <Typography>Routing #: 987654321</Typography>
        </Box>

        <Box className={classes.accountBox}>
          <Typography className={classes.accountType}>Savings</Typography>
          <Typography variant="h6">$5,678.90</Typography>
          <Typography>Account #: 987654321</Typography>
          <Typography>Routing #: 123456789</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AccountOverview;
