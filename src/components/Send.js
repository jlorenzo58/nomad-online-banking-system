import { useState } from 'react';
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
import { redirect } from 'react-router';

function Send() {
  const [accountType, setAccountType] = useState('checking');
  const [amount, setAmount] = useState('');
  const [account, setAccount] = useState('');
  const userId = localStorage.getItem('userId');
  console.log(userId)


  const handleAccountTypeChange = (event) => {
    setAccountType(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleAccountChange = (event) => {
    setAccount(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Account Type: ${accountType}, Amount: ${amount}, Account: ${account}`);
    try {
      axios.post(`http://localhost:3001/api/send-money/${userId}`, {accountType, amount, account}).then(response => {
        console.log(response.data)
      });
      // show success message or redirect to a success page
    } catch (err) {
      console.error(err);
      // show error message or handle error
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper style={{ padding: 16 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Send Money
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="account-type-label">Account Type</InputLabel>
                <Select
                  labelId="account-type-label"
                  id="account-type-select"
                  value={accountType}
                  onChange={handleAccountTypeChange}
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
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Recipient Account Number"
                value={account}
                onChange={handleAccountChange}
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
                Send
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Send;
