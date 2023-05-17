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
  import axios from "axios"

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
    const userId = localStorage.getItem('userId');

    const [amount, setAmount] = useState('');
    const [fromAccount, setFromAccount] = useState('');
    const [toAccount, setToAccount] = useState('');


    const handleAmountChange = (event) => {
      setAmount(event.target.value);
    };

    const handleAccountChange = (event) => {
      setFromAccount(event.target.value);
      if(event.target.value==='checking'){
        setToAccount('savings');
      }
      if(event.target.value==='savings'){
        setToAccount('checking');
      }
    };

    const handleSubmit = (event) => {
      event.preventDefault();
    // alert(`Account Type: ${accountType}, Amount: ${amount}, Account: ${account}`);
    try {
      axios.post(`/.netlify/functions/api/transfer/${userId}`, {fromAccount, toAccount, amount}).then(response => {
        alert(`You transferred $${amount} from ${fromAccount}`);
        setToAccount('');
        setFromAccount('');
        setAmount('');
      });
      // show success message or redirect to a success page
    } catch (err) {
      console.error(err);
      alert("Unable to transfer right now.");
      // show error message or handle error
    }
      
    };

  return (
    <Container maxWidth="sm">
      <Paper style={{ padding: 16 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Transfer
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="account-type-label">Transfer From</InputLabel>
                <Select
                labelId="account-type-label"
                id="account-type-select"
                value={fromAccount}
                required
                onChange={handleAccountChange}
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
                Transfer
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default DepositBillPage;
