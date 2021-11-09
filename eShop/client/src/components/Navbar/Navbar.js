import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import eShopLogo from '../../images/eShop.png';
import ShoppingBag from '../../images/shopping_bags.png';
import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push('/auth');

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img component={Link} to="/" src={eShopLogo} alt="icon" height="45px" />
        <img className={classes.image} src={ShoppingBag} alt="icon" height="40px" />
      </Link>
      <Toolbar className={classes.toolbar}>
        <Button className={classes.buttons} component={Link} to="/posts" variant="contained" color="primary">Productos</Button>
        <Button className={classes.buttons} component={Link} to="/sales" variant="contained" color="primary">Ventas</Button>
        <Button className={classes.buttons} component={Link} to="/validation" variant="contained" color="primary">Validación</Button>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Cerrar Sesión</Button>
          </div>
        ) : (
          <Button className={classes.button} component={Link} to="/auth" variant="contained" color="primary">Ingresar</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
