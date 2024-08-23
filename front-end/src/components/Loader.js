import React from 'react';
import { Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

const LoaderContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    zIndex: 1000
});


const LoaderAnimation = styled('div')({
    position: 'relative',
    width: '100px',
    height: '100px',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: '8px solid rgba(0, 0, 0, 0.1)',
        borderTop: '8px solid #1976d2',
        borderRadius: '50%',
        animation: 'spin 2s linear infinite',
    },
    '&::after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '20px',
        height: '20px',
        backgroundColor: '#1976d2',
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
        animation: 'pulse 2s ease-in-out infinite',
    },
    '@keyframes spin': {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' },
    },
    '@keyframes pulse': {
        '0%': { transform: 'scale(1)' },
        '50%': { transform: 'scale(1.5)' },
        '100%': { transform: 'scale(1)' },
    }
});

const LoaderText = styled(Typography)({
    marginTop: '16px',
    fontSize: '1.2rem',
    color: '#1976d2',
    fontWeight: 'bold',
    textAlign: 'center'
});

const InteractiveLoader = () => {
    return (
        <LoaderContainer>
            <LoaderAnimation />
            <LoaderText>Scheduling your session... ⏳</LoaderText>
        </LoaderContainer>
    );
};

export default InteractiveLoader;