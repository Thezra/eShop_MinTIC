import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useHistory } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { createSale, updateSale } from '../../actions/sales';
import useStyles from './styles';

const FormSales = ({ currentId, setCurrentId }) => {
  const [saleData, setSaleData] = useState({ title: '', state: '', description: '', price: '', selectedFile: '' });
  const sale = useSelector((state) => (currentId ? state.sales.sales.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  const clear = () => {
    setCurrentId(0);
    setSaleData({ title: '', state: '', description: '', price: '', selectedFile: '' });
  };

  useEffect(() => {
    if (!sale?.title) clear();
    if (sale) setSaleData(sale);
  }, [sale]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createSale({ ...saleData, name: user?.result?.name }, history));
      clear();
    } else {
      dispatch(updateSale(currentId, { ...saleData, name: user?.result?.name }));
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Por favor ingrese para agregar ventas o productos.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editando "${sale?.title}"` : 'Agregar un producto'}</Typography>
        <TextField name="title" variant="outlined" label="Nombre del producto" fullWidth value={saleData.title} onChange={(e) => setSaleData({ ...saleData, title: e.target.value })} />
        <TextField name="state" variant="outlined" label="Disponibilidad" fullWidth value={saleData.state} onChange={(e) => setSaleData({ ...saleData, state: e.target.value })} />
        <TextField name="price" variant="outlined" label="Precio" fullWidth value={saleData.price} onChange={(e) => setSaleData({ ...saleData, price: e.target.value })} />
        <TextField name="description" variant="outlined" label="Descripción" fullWidth multiline rows={4} value={saleData.description} onChange={(e) => setSaleData({ ...saleData, description: e.target.value })} />
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setSaleData({ ...saleData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Agregar</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Limpiar</Button>
      </form>
    </Paper>
  );
};

export default FormSales;