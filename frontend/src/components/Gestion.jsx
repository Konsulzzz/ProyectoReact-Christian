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

const Gestion = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAutenticated, userName, userRol, isInvitado } = useSelector((state) => state.login);
    const [user, setUser] = useState({ nombre: '', usuario: '', contraseña: '', rol: '' });
    const [tableData, setTableData] = useState([])
    var invitado = isInvitado


    useEffect(() => {
        if (!isAutenticated) {
            navigate('/');
        }
    }, [isAutenticated, navigate]);






    useEffect(() => {
        // Realizar el fetch al endpoint /getItems al montar el componente
        fetchTableData(); // Llama a la función para cargar datos al entrar en la página
    }, []);

    const handleLogout = () => {
        // Despacha la acción de logout al store
        dispatch(loginActions.logout());

        // Navega a la página principal
        navigate('/');
    };

    const handleSaveItem = () => {
        // Construir la URL con los parámetros de la consulta
        const url = `http://localhost:3030/addUser?nombre=${user.nombre}&usuario=${user.usuario}&contraseña=${user.contraseña}&rol=${user.rol}`;

        fetch(url)
            .then(response => response.json())
            .then(result => {
                // Verificar si la inserción fue exitosa

                if (result.affectedRows > 0) {
                    console.log('Inserción exitosa.');
                    alert('Datos guardados con éxito');
                    fetchTableData()
                    // Realizar cualquier acción adicional después de la inserción exitosa
                } else {
                    console.error('Error en la inserción.');
                    // Manejar el caso de error durante la inserción
                }
            })
            .catch(error => {
                console.error('Error durante el fetch:', error.message);
                // Manejar el error de la solicitud
            });
    };


    const fetchTableData = async () => {
        // Realizar el fetch al endpoint /getItems al montar el componente
        fetch('http://localhost:3030/getUsers?')
            .then(response => response.json())
            .then(data => {
                // Almacenar los datos en el estado tableData
                setTableData(data);
            })
            .catch(error => {
                // Manejar errores en caso de que ocurran durante la solicitud
                console.error('Error durante el fetch:', error.message);
            });
    };

    const handleDeleteItem = async (userId) => {
        try {
            // Realizar la solicitud fetch al endpoint /deleteItem con el id del elemento a eliminar
            const response = await fetch(`http://localhost:3030/deleteUser?id=${userId}`);

            if (response.ok) {
                // Si la solicitud es exitosa, puedes realizar alguna acción adicional si es necesario
                console.log('Elemento eliminado con éxito.');
                fetchTableData()
            } else {
                // Manejar errores si la respuesta no es exitosa
                console.error('Error durante la eliminación:', response.statusText);
            }
        } catch (error) {
            // Manejar errores en caso de que ocurran durante la solicitud
            console.error('Error durante el fetch:', error.message);
        }
    };

    const X = 1;
    return (
        <div>
            <AppBar position='static'>
                <Container>
                    <Toolbar>
                        <Grid container justifyContent="center" alignItems="center" style={{ height: '7vh' }}>
                            <Grid item xs={3} md={2} lg={2}>
                                <AdbIcon />
                                <Typography>Christian Santana Morales</Typography>
                            </Grid>
                            <Grid item xs={3} md={2} lg={2}>
                                <Link to='/home'>Inicio</Link>
                            </Grid>

                            {!isInvitado && (
                                <Grid item xs={3} md={2} lg={2}>
                                    <Link to='/gestion'>Gestionar Usuarios</Link>
                                </Grid>
                            )}

                            {!isInvitado && (
                                <Grid item xs={3} md={2} lg={2}>
                                    <Link to='/informes'>Informes</Link>
                                </Grid>
                            )}
                            <Grid item xs={3} md={4} lg={2}>
                                <Link to='/ayuda'>Ayuda</Link>
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

            <Paper /* AÑADIR PROPIEDADES PARA EL PAPEL */>
                <Box component='form' autoComplete='off' onSubmit={handleSaveItem}>
                    <Grid container justifyContent="center" alignItems="center" style={{ height: '7vh' }}>
                        <Grid item xs={X} md={X}>
                            <TextField
                                label='Nombre'
                                required
                                value={user.nombre}
                                onChange={(event) => setUser({ ...user, nombre: event.target.value })}
                            />
                        </Grid>
                        <Grid item xs={X} md={X}>
                            <TextField
                                label='Usuario'
                                required
                                value={user.usuario}
                                onChange={(event) => setUser({ ...user, usuario: event.target.value })}
                            />
                        </Grid>
                        <Grid item xs={X} md={X}>
                            <TextField
                                label='Contraseña'
                                required
                                value={user.contraseña}
                                onChange={(event) => setUser({ ...user, contraseña: event.target.value })}
                            />
                        </Grid>
                        <Grid item xs={X} md={X}>
                            <TextField
                                label='Rol'
                                required
                                value={user.rol}
                                onChange={(event) => setUser({ ...user, rol: event.target.value })}
                            />
                        </Grid>
                        {/* Otros campos TextField según sea necesario */}
                        <Grid item xs={X} md={X}>
                            <Button type='button' onClick={handleSaveItem}>
                                Guardar
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>

            <TableContainer>
                <Table aria-label='Nombre Tabla para accesibilidad'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Eliminar</TableCell>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Usuario</TableCell>
                            <TableCell>Contraseña</TableCell>
                            <TableCell>Rol</TableCell>
                            {/* Agrega más encabezados según sea necesario */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>
                                    <Button onClick={() => handleDeleteItem(row.id)}>
                                        <DeleteForeverIcon />
                                    </Button>
                                </TableCell>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.nombre}</TableCell>
                                <TableCell>{row.login}</TableCell>
                                <TableCell>{row.password}</TableCell>
                                <TableCell>{row.rol}</TableCell>
                                {/* Agrega más celdas según sea necesario */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    );
};
export default Gestion;