import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Sale from './Sale/Sale';
import useStyles from './styles';

const Sales = ({ setCurrentId }) => {
  const sales = useSelector((state) => state.sales);
  const classes = useStyles();

  return (
    !sales.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {sales.map((sale) => (
          <Grid key={sale._id} item xs={12} sm={6} md={6}>
            <Sale sale={sale} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Sales;