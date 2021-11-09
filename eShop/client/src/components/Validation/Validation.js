import React, { useState } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { produce } from 'immer';

import useStyles from './styles';

export const Validation = () => {

    const classes = useStyles();

    const [ person, setPerson ] = useState([
        { id: 1, name: 'User1', state: false },
        { id: 2, name: 'User2', state: true },
        { id: 3, name: 'User3', state: false },
    ]);
    const user = JSON.parse(localStorage.getItem('profile'));
    
    if (!user?.result?.name) {
        return (
          <Paper elevation={6}>
            <Typography variant="h6" align="center">
              Por favor inicie sesión para modificar los permisos de los usuarios.
            </Typography>
          </Paper>
        );
    }

    return (
        <Typography variant="h6" align="center">
            {person.map((p, index) => {
                return (
                    <Paper className={classes.paper} elevation={6}>
                        <Typography className={classes.profile}>{p.name}</Typography>
                        <Typography>
                            {p.state ? (
                                <Typography className={classes.profile}>La persona está validada</Typography>
                            ) : (
                                <Typography className={classes.profile}>La persona NO está validada
                                    <Button className={classes.button} onClick={e => {
                                        const state = e.target.value;
                                        setPerson(currentPerson =>
                                            produce(currentPerson, v => {
                                                v[index].state = true;
                                            })
                                        );
                                    }}>Validar</Button>
                                </Typography>
                            )}
                        </Typography>
                    </Paper>
                )
            })}
        </Typography>
    );
}

export default Validation;