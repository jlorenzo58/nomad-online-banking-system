import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
    Grid,
    Paper,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
  } from '@material-ui/core';
  import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
  },
  input: {
    display: 'none',
  },
  greenButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    '&:hover': {
      backgroundColor: '#388E3C',
    },
  },
}));

const DepositBillPage = () => {
  const classes = useStyles();
  const [file, setFile] = useState(null);
  const [amount, setAmount] = useState('');
  const [accountType, setAccountType] = useState('checking');
  const userId = localStorage.getItem('userId');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleAccountTypeChange = (e) => {
    setAccountType(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // alert(`Account Type: ${accountType}, Amount: ${amount}, Account: ${account}`);
    try {
      axios.post(`http://localhost:3001/api/deposit-check/${userId}`, {accountType, amount}).then(response => {
         alert("Deposits may take a few days to show in your account.");
         setAmount('');
         setAccountType('checking');
      });
      // show success message or redirect to a success page
    } catch (err) {
      console.error(err);
      alert("Unable to deposit your check right now.")
      // show error message or handle error
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper style={{ padding: 16 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Deposit Check
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
            <FormControl component="fieldset" className={classes.formControl}>
                    <input
                    accept="image/*"
                    className={classes.input}
                    id="deposit-bill-file-input"
                    multiple
                    type="file"
                    onChange={handleFileChange}
                    />
                    <label htmlFor="deposit-bill-file-input">
                    <Button className={classes.greenButton} variant="contained" component="span">
                        Attach Check
                    </Button>
                    </label>
                </FormControl>
              <FormControl fullWidth>
                <InputLabel id="account-type-label">Account Type</InputLabel>
                <Select
                  labelId="account-type-label"
                  id="account-type-select"
                  value={accountType}
                  onChange={handleAccountTypeChange}
                  required
                >
                  <MenuItem value="checking">Checking</MenuItem>
                  <MenuItem value="savings">Savings</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Amount"
                value={amount}
                onChange={handleAmountChange}
                InputProps={{
                  startAdornment: (
                    <Typography variant="h6" component="span" style={{ fontSize: 14 }}>
                      $
                    </Typography>
                  ),
                }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Deposit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default DepositBillPage;
