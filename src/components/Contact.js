import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  Typography,
  Grid,
  Container,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  input: {
    marginBottom: theme.spacing(2),
    background: 'white'
  },
  contactInfo: {
    textAlign: 'right',
    marginTop: theme.spacing(2),
  },
  contactText: {
    marginBottom: theme.spacing(1),
  },
}));

const handleButtonClick = () =>{
  alert('Message has been sent!');
}

const Contact = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Typography variant="h5" className={classes.title}>
        Contact Us
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            className={classes.input}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            className={classes.input}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Subject"
            variant="outlined"
            className={classes.input}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Message"
            variant="outlined"
            multiline
            rows={4}
            className={classes.input}
          />
        </Grid>
      </Grid>
      <Button variant="contained" color="primary" onClick={handleButtonClick} >
        Submit
      </Button>
      <div className={classes.contactInfo}>
        <Typography variant="body1" className={classes.contactText}>
          Hogwarts Lane, Scottish Highland, 12345
        </Typography>
        <Typography variant="body1" className={classes.contactText}>
          1-888-NOM-ADS1
        </Typography>
        <Typography variant="body1" className={classes.contactText}>
          EXT: NOM-ADS
        </Typography>
        <Typography variant="body1" className={classes.contactText}>
          nomadsbankingsolutions@gmail.com
        </Typography>
      </div>
    </Container>
  );
};

export default Contact;
