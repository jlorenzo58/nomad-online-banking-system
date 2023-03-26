import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box,TextField, Button, Grid, Divider, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: '#dcdcdc',
      padding: theme.spacing(3),
    },
    title: {
      color: '#614aeb',
      marginBottom: theme.spacing(2),
    },
    divider: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
    form: {
      '& .MuiTextField-root': {
        marginBottom: theme.spacing(2),
      },
    },
  }));
  
  export default function Settings() {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        <Typography variant="h5" className={classes.title}>Settings</Typography>
        <Typography variant="subtitle1">Hello, John Doe</Typography>
        <Divider className={classes.divider} />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Personal Details</Typography>
            <form className={classes.form}>
              <TextField label="Username" fullWidth />
              <TextField label="Password" type="password" fullWidth />
              <TextField label="Phone" fullWidth />
              <TextField label="Email" fullWidth />
              <TextField label="Address" fullWidth />
              <Button variant="contained" color="primary">Save Changes</Button>
            </form>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Support</Typography>
            <Button variant="contained" color="primary" fullWidth>Schedule a Meeting</Button>
            <Divider className={classes.divider} />
            <Button variant="contained" color="secondary" fullWidth>Pause Account</Button>
          </Grid>
        </Grid>
      </div>
    );
  }