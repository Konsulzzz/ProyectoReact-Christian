import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginActions } from '../store/storelogin';
import { Link } from 'react-router-dom';

import {
    AppBar, Container, Toolbar, Grid, Typography, Button, Paper, Box, TextField, Table, TableContainer, TableHead, TableBody, TableCell, TableRow
} from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon'
import InsertEmoticon from '@mui/icons-material/InsertEmoticon';
function Topbar() {
    const dispatch = useDispatch();
    const { isAutenticated, userName, userRol, isInvitado } = useSelector((state) => state.login);
    const navigate = useNavigate();
    const handleLogout = () => {
        // Despacha la acción de logout al store
        dispatch(loginActions.logout());

        // Navega a la página principal
        navigate('/');
    };
    return (
       
            <AppBar position='static'>
                <Container>
                    <Toolbar>
                        <Grid container justifyContent="center" alignItems="center" style={{ height: '7vh' }}>
                            <Grid item xs={3} md={2} lg={2}>
                            {!isInvitado && (<AdbIcon />)}
                            {isInvitado && (<InsertEmoticon />)}
                                <Typography>{userName}</Typography>
                            </Grid>
                            <Grid item xs={3} md={2} lg={2}>
                            <Link to='/home' style={{ color: 'white' }}>Inicio</Link>
                            </Grid>


                            {!isInvitado && (
                                <Grid item xs={3} md={2} lg={2}>
                                    <Link to='/gestion' style={{ color: 'white' }}>Gestionar Usuarios</Link>

                                </Grid>
                            )}

                            {!isInvitado && (<Grid item xs={3} md={2} lg={2}>
                                <Link to='/informe' style={{ color: 'white' }}>Informes</Link>
                            </Grid>)}
                            <Grid item xs={3} md={2} lg={2}>
                            <Link to='/ayuda' style={{ color: 'white' }}>Ayuda</Link>
                            </Grid>
                            <Grid item xs={12} md={5} lg={1}>
                                <Button variant="RELLENAR" onClick={handleLogout}>
                                    Salir
                                </Button>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </Container>
            </AppBar>
            );

};
export default Topbar