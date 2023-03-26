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
  

    const [amount, setAmount] = useState('');
    const [account, setAccount] = useState('');

    const handleAmountChange = (event) => {
    setAmount(event.target.value);
    };

    const handleAccountChange = (event) => {
    setAccount(event.target.value);
    };

    const handleTransferClick = () => {
    console.log(`Transferring ${amount} from ${account}`);
    };

  return (
    <Container maxWidth="sm">
      <Paper style={{ padding: 16 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Transfer
        </Typography>
        <form >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="account-type-label">Transfer From</InputLabel>
                <Select
                  labelId="account-type-label"
                  id="account-type-select"
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
