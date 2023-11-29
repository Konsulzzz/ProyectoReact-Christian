import React, { useState } from 'react';
import {
    Grid,
    Paper,
    Box,
    TextField,
    Button,
    Avatar,
    Typography,
} from '@mui/material';
 import { useNavigate } from 'react-router-dom';
 import { useDispatch} from 'react-redux'
 import { loginActions } from '../store/storelogin';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Verificar campos vacíos
        if (!username || !password) {
            setError('Por favor, complete todos los campos.');
            return;
        }

        fetch(`http://localhost:3030/login?user=${username}&password=${password}`)
        .then(response => response.json())
        .then(response => {
            // Verificar si el usuario y la contraseña son correctos
            if (response) {
                setError('');
                console.log(response.userData[0].nombre);

                //Dispatch
                dispatch(loginActions.login({
                    name: response.userData[0].nombre,
                    rol: response.userData[0].rol
                    }))

                navigate('/home')
            } 
        })
        .catch(error => {
            setError('Usuario o contraseña incorrectos.');
            console.error('Error during fetch:', error.message);
        });
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
            <Paper elevation={3} style={{ padding: '20px', maxWidth: '400px' }}>
                <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
                    <Avatar />
                    <Typography variant="h5">Login</Typography>
                </Box>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Usuario"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                    <TextField
                        type="password"
                        label="Contraseña"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    {error && (
                        <Typography variant="body2" color="primary" align="center" paragraph>
                            {error}
                        </Typography>
                    )}
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Acceder
                    </Button>
                </form>
            </Paper>
        </Grid>
    );
};

export default Login;
