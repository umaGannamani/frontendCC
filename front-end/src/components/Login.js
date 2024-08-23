import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Select, MenuItem, InputLabel, FormControl, Box, Snackbar, Alert } from '@mui/material';

const Login = () => {
    const [name, setName] = useState('');
    const [role, setRole] = useState('student');
    const [password, setPassword] = useState('');
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');
    const navigate = useNavigate();

    const handleLogin = () => {
        const loginData = { name, role, password };

        axios.post('http://localhost:5000/api/auth/login', loginData)
            .then(response => {
                setAlertMessage('Login successful! 🎉');
                setAlertSeverity('success');
                setAlertOpen(true);
                setTimeout(() => navigate('/scheduler'), 1500); // Redirect after a brief delay
            })
            .catch(err => {
                console.error(err);
                setAlertMessage('Error during login. Please try again. ❌');
                setAlertSeverity('error');
                setAlertOpen(true);
            });
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                    mt: 5,
                    p: 7,
                    boxShadow: 3,
                    borderRadius: 6,
                    background: '#4454835a',
                    backdropFilter: 'blur(10px)'
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Login 🔑
                </Typography>
                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    value={name}
                    onChange={e => setName(e.target.value)}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '20px',
                        }
                    }}
                />
                <FormControl fullWidth>
                    <InputLabel id="role-select-label">Role</InputLabel>
                    <Select
                        labelId="role-select-label"
                        value={role}
                        onChange={e => setRole(e.target.value)}
                        label="Role"
                        style={{borderRadius:"20px"}}
                    >
                        <MenuItem value="student">Student 🎓</MenuItem>
                        <MenuItem value="mentor">Mentor 🧑‍🏫</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '20px',
                        }
                    }}
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth 
                    onClick={handleLogin}
                    style={{borderRadius:"20px"}}
                >
                    Login 🚀
                </Button>
            </Box>

            <Snackbar
                open={alertOpen}
                onClose={() => setAlertOpen(false)}
                anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
                sx={{
                    '& .MuiSnackbarContent-root': {
                        minWidth: '50%',
                        backgroundColor: alertSeverity === 'error' ? '#f44336' : '#4caf50',
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                        fontSize: '1.5rem',
                    }
                }}
            >
                <Alert onClose={() => setAlertOpen(false)} severity={alertSeverity} sx={{ width: '100%', fontSize: '1.5rem', textAlign: 'center' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Login;