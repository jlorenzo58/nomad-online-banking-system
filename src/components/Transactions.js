import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import axios from "axios"
import { Lifecycle } from "./Lifecycle.ts"
import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    marginTop: theme.spacing(2),
  },
}));

const TransactionsPage = () => {
  const classes = useStyles();
  let params=useParams();
  const [listLifecycle, setListLifecycle] = useState(Lifecycle.Never);
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    let lifecycle = listLifecycle
    if( lifecycle === Lifecycle.Reload ) {
      lifecycle = Lifecycle.Never
      setListLifecycle(lifecycle)
      return
    }
    if( lifecycle === Lifecycle.Never ) {
      setListLifecycle(Lifecycle.Loading)
      axios.get(`/.netlify/functions/api/transactions/${params.id}`)
      .then(response => {
        // console.log(response.data)
        setTransactions(response.data);
        setListLifecycle(Lifecycle.Success)
      })
      .catch( err => {
        setListLifecycle(Lifecycle.Error)
        console.error(err)
      })
    }
  }, [listLifecycle])

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Amount</TableCell>
          </TableRow>
        </TableHead>
        {listLifecycle === Lifecycle.Success &&
        <TableBody>
          {transactions.map((transactions) => (
            <TableRow key={transactions.transaction_id}>
              <TableCell>{transactions.transaction_date}</TableCell>
              <TableCell>{transactions.transaction_type}</TableCell>
              <TableCell>{transactions.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        }
        {listLifecycle === Lifecycle.Loading &&
            <Fragment>Loading...</Fragment>
    
        }
        {listLifecycle === Lifecycle.Error &&
        <Fragment>Error!!!</Fragment>
        }
      </Table>
    </TableContainer>
  );
};

export default TransactionsPage;
