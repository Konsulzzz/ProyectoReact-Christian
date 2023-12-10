import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginActions } from '../store/storelogin';
import { Link } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';

import {
    AppBar, Container, Toolbar, Grid, Typography, Button, Paper, Box, TextField, Table, TableContainer, TableHead, TableBody, TableCell, TableRow
} from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon'
import InsertEmoticon from '@mui/icons-material/InsertEmoticon';
import Topbar from './Topbar';

function Home() {
    const [item, setItem] = useState({ nombre: '', marca: '', tipo: '', precio: 0 });
    const { isAutenticated, userName, userRol, isInvitado, isUser } = useSelector((state) => state.login);
    const navigate = useNavigate();
    const [tableData, setTableData] = useState([])





    const handleSaveItem = () => {
        // Construir la URL con los parámetros de la consulta
        if (!isInvitado) {
            const url = `http://localhost:3030/addItem?nombre=${item.nombre}&marca=${item.marca}&tipo=${item.tipo}&precio=${item.precio}`;

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
        } else {
            alert('No puedes insertar datos - Rol invitado');

        }
    };

    useEffect(() => {
        if (!isAutenticated) {
            navigate('/');
        }
    }, [isAutenticated, navigate]);

   

    // Mostrar datos en la consola
    useEffect(() => {
        console.log('Datos del usuario:', { isAutenticated, userName, userRol });
    }, [isAutenticated, userName, userRol]);

    const handleDeleteItem = async (itemId) => {
        try {
            // Realizar la solicitud fetch al endpoint /deleteItem con el id del elemento a eliminar
            if (!isInvitado && !isUser) {
                const response = await fetch(`http://localhost:3030/deleteItem?id=${itemId}`);

                if (response.ok) {
                    // Si la solicitud es exitosa, puedes realizar alguna acción adicional si es necesario
                    console.log('Elemento eliminado con éxito.');
                    fetchTableData()
                } else {
                    // Manejar errores si la respuesta no es exitosa
                    console.error('Error durante la eliminación:', response.statusText);
                }
            } else {
                alert('No puedes borrar datos - Necesitas ser administrador')
            }
        } catch (error) {
            // Manejar errores en caso de que ocurran durante la solicitud
            console.error('Error durante el fetch:', error.message);
        }
    };

    const fetchTableData = async () => {
        // Realizar el fetch al endpoint /getItems al montar el componente
        fetch('http://localhost:3030/getItems?')
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
    useEffect(() => {
        // Realizar el fetch al endpoint /getItems al montar el componente
        fetchTableData(); // Llama a la función para cargar datos al entrar en la página
    }, []);
    const X = 1;

    return (
        <div>
            <Topbar></Topbar>

            {/* Formulario */}
            <Paper style={{ padding: "7px" }}>
                <Box component='form' autoComplete='off' onSubmit={handleSaveItem}>
                    <Grid container justifyContent="center" alignItems="center" style={{ height: '7vh' }}>
                        <Grid item xs={X} md={X}>
                            <TextField
                                label='Nombre'
                                required
                                value={item.nombre}
                                onChange={(event) => setItem({ ...item, nombre: event.target.value })}
                            />
                        </Grid>
                        <Grid item xs={X} md={X}>
                            <TextField
                                label='Editorial'
                                required
                                value={item.marca}
                                onChange={(event) => setItem({ ...item, marca: event.target.value })}
                            />
                        </Grid>
                        <Grid item xs={X} md={X}>
                            <TextField
                                label='Tipo'
                                required
                                value={item.tipo}
                                onChange={(event) => setItem({ ...item, tipo: event.target.value })}
                            />
                        </Grid>
                        <Grid item xs={X} md={X}>
                            <TextField
                                label='Precio'
                                type='number' // Tipo de entrada para números
                                required
                                value={item.precio}
                                onChange={(event) => setItem({ ...item, precio: event.target.value })}
                            />
                        </Grid>
                        {/* Otros campos TextField según sea necesario */}
                        <Tooltip title="Haz clic para insertar los datos en la tabla">
    <Grid item xs={X} md={X}>
        <Button type='button' onClick={handleSaveItem}>
            Guardar
        </Button>
    </Grid>
</Tooltip>
                    </Grid>
                </Box>
            </Paper>


            <TableContainer>
                <Table aria-label='Tabla de colección'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Eliminar</TableCell>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Editorial</TableCell>
                            <TableCell>Tipo</TableCell>
                            <TableCell>Precio</TableCell>
                            {/* Agrega más encabezados según sea necesario */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.map((row) => (
                            <TableRow key={row.id}>
                               <Tooltip title="Haz clic para eliminar esta fila de datos">
    <TableCell>
        <Button onClick={() => handleDeleteItem(row.id)}>
            <DeleteForeverIcon />
        </Button>
    </TableCell>
</Tooltip>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.nombre}</TableCell>
                                <TableCell>{row.marca}</TableCell>
                                <TableCell>{row.tipo}</TableCell>
                                <TableCell>{row.precio}</TableCell>
                                {/* Agrega más celdas según sea necesario */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};


export default Home;
