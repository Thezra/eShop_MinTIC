import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import useStyles from './styles';

import { getSales } from '../../actions/sales';
import Sales from '../Sales/Sales';
import FormSales from '../FormSales/FormSales';
import EnConstruccion from '../../images/EnConstruccion.png';

const SalesShow = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getSales());
  }, [currentId, dispatch]);

  return (
    <img className={classes.image} src={EnConstruccion} alt="message" />
  );
};

export default SalesShow;