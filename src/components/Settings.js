import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box,TextField, Button, Grid, Divider, Paper, Typography } from '@material-ui/core';
import { Lifecycle } from "./Lifecycle.ts";
import axios from "axios"

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
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
      },
    },
  }));
  
  export default function Settings() {
    const classes = useStyles();
    const [listLifecycle, setListLifecycle] = useState(Lifecycle.Never)
    const [info, setInfo] = useState({})
    const [formData, setFormData] = useState({});
    const userId = localStorage.getItem('userId');
    console.log(userId);

    useEffect(() => {
      let lifecycle = listLifecycle
      if( lifecycle === Lifecycle.Reload ) {
        lifecycle = Lifecycle.Never
        setListLifecycle(lifecycle)
        return
      }
      if( lifecycle === Lifecycle.Never ) {
        setListLifecycle(Lifecycle.Loading)
        axios.get(`http://localhost:3001/api/settings/${userId}`)
        .then(response => {
          setInfo(response.data);
          setListLifecycle(Lifecycle.Success)
        })
        .catch( err => {
          setListLifecycle(Lifecycle.Error)
          console.error(err)
        })
      }
    }, [listLifecycle])


    const handleSaveChanges = (event) => {
      event.preventDefault();
      const username = event.target.username.value;
      const email = event.target.email.value;
      const phone = event.target.phone.value;
      const address = event.target.address.value;

      axios.put(`http://localhost:3001/api/settings/${userId}`, {username, email, phone, address})
      .then(response => {
        console.log(response.data)
        setListLifecycle(Lifecycle.Never)
      })
      .catch( err => {
        console.error(err)
      })
    };
  
    return (
      <div className={classes.root}>
        <Typography variant="h5" className={classes.title}>Settings</Typography>
        <Typography variant="subtitle1">Hello, {info?.username}</Typography>
        <Divider className={classes.divider} />
        <Grid container spacing={3}>
          {listLifecycle === Lifecycle.Success &&
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Personal Details</Typography>
            <form className={classes.form} onSubmit={handleSaveChanges}>
              <TextField name="username" label="Username" defaultValue ={info.username} fullWidth  />
              <TextField name="phone" label="Phone" defaultValue ={info.phone} fullWidth  />
              <TextField name="email" label="Email" defaultValue ={info.email} fullWidth />
              <TextField name="address" label="Address" defaultValue ={info.address} fullWidth />
              <input type="submit" value="Save Changes" />
            </form>
          </Grid>
          }   
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