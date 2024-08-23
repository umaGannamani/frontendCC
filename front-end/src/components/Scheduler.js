import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Select, MenuItem, InputLabel, FormControl, Box, Snackbar, Alert } from '@mui/material';

const Scheduler = () => {
    const [mentors, setMentors] = useState([]);
    const [studentName, setStudentName] = useState('');
    const [areaOfInterest, setAreaOfInterest] = useState('');
    const [duration, setDuration] = useState(30);
    const [sessionTime, setSessionTime] = useState('');
    const [selectedMentor, setSelectedMentor] = useState('');
    const [filteredMentors, setFilteredMentors] = useState([]);
    const [price, setPrice] = useState(0);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');

    useEffect(() => {
        const dummyMentors = [
            { id: '1', name: 'John Doe', area_of_interest: 'FMCG Sales' },
            { id: '2', name: 'Jane Smith', area_of_interest: 'Equity Research' },
            { id: '3', name: 'Alice Johnson', area_of_interest: 'Digital Marketing' },
            { id: '4', name: 'Bob Brown', area_of_interest: 'FMCG Sales' },
            { id: '5', name: 'Charlie Davis', area_of_interest: 'Digital Marketing' },
            { id: '6', name: 'Emily White', area_of_interest: 'Financial Planning' },
            { id: '7', name: 'Michael Lee', area_of_interest: 'Digital Marketing' },
            { id: '8', name: 'Sophia Martinez', area_of_interest: 'Equity Research' },
            { id: '9', name: 'Daniel Harris', area_of_interest: 'Equity Research' },
            { id: '10', name: 'Olivia Wilson', area_of_interest: 'FMCG Sales' },
            { id: '11', name: 'Lucas Anderson', area_of_interest: 'Digital Marketing' },
            { id: '12', name: 'Mia Taylor', area_of_interest: 'Digital Marketing' },
            { id: '13', name: 'James Thomas', area_of_interest: 'Equity Research' },
            { id: '14', name: 'Isabella Moore', area_of_interest: 'FMCG Sales' },
            { id: '15', name: 'Ethan Jackson', area_of_interest: 'Equity Research' }
        ];
        
        setMentors(dummyMentors);
    }, []);

    useEffect(() => {
        const filtered = mentors.filter(mentor => mentor.area_of_interest === areaOfInterest);
        setFilteredMentors(filtered);
    }, [areaOfInterest, mentors]);

    useEffect(() => {
        switch (duration) {
            case 30:
                setPrice(50);
                break;
            case 45:
                setPrice(75);
                break;
            case 60:
                setPrice(100);
                break;
            default:
                setPrice(0);
                break;
        }
    }, [duration]);

    const handleSchedule = () => {
        if (!studentName || !areaOfInterest || !selectedMentor || !sessionTime) {
            setAlertMessage('Please fill in all fields. 📝');
            setAlertSeverity('warning');
            setAlertOpen(true);
            return;
        }

        const studentData = { name: studentName, area_of_interest: areaOfInterest };

        axios.post('http://localhost:5000/api/students', studentData)
            .then(response => {
                const sessionData = {
                    student_id: response.data.id,
                    mentor_id: selectedMentor,
                    duration,
                    session_time: sessionTime
                };

                return axios.post('http://localhost:5000/api/sessions', sessionData);
            })
            .then(() => {
                setAlertMessage('Session scheduled successfully! 🎉');
                setAlertSeverity('success');
                setAlertOpen(true);

                setStudentName('');
                setAreaOfInterest('');
                setDuration(30);
                setSessionTime('');
                setSelectedMentor('');
                setPrice(0);
            })
            .catch(err => {
                console.error('Error scheduling session:', err);
                setAlertMessage('Error scheduling session. Please check your input and try again. ❌');
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
                    Schedule a Session 🗓️
                </Typography>
                <TextField
                    label="Student Name"
                    variant="outlined"
                    fullWidth
                    value={studentName}
                    onChange={e => setStudentName(e.target.value)}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '20px',
                        }
                    }}
                />

                <FormControl fullWidth>
                    <InputLabel id="area-of-interest-label">Area of Interest 🎯</InputLabel>
                    <Select
                        labelId="area-of-interest-label"
                        value={areaOfInterest}
                        onChange={e => setAreaOfInterest(e.target.value)}
                        label="Area of Interest"
                        style={{borderRadius:"20px"}}
                    >
                        <MenuItem value="FMCG Sales" style={{margin:'10px'}}>FMCG Sales 📦</MenuItem>
                        <MenuItem value="Equity Research" style={{margin:'10px'}}>Equity Research 📈</MenuItem>
                        <MenuItem value="Digital Marketing" style={{margin:'10px'}}>Digital Marketing 🌐</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="mentor-select-label">Select a Mentor 🧑‍🏫</InputLabel>
                    <Select
                        labelId="mentor-select-label"
                        value={selectedMentor}
                        onChange={e => setSelectedMentor(e.target.value)}
                        label="Select a Mentor"
                        style={{borderRadius:"20px"}}
                    >
                        {filteredMentors.map(mentor => (
                            <MenuItem key={mentor.id} value={mentor.id}>
                                {mentor.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="duration-select-label">Duration ⏳</InputLabel>
                    <Select
                        labelId="duration-select-label"
                        value={duration}
                        onChange={e => setDuration(e.target.value)}
                        label="Duration"
                        style={{borderRadius:"20px"}}
                    >
                        <MenuItem value={30} style={{margin:'10px'}}>30 mins 🕒</MenuItem>
                        <MenuItem value={45} style={{margin:'10px'}}>45 mins ⏲️</MenuItem>
                        <MenuItem value={60} style={{margin:'10px'}}>60 mins ⏰</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Session Time"
                    type="datetime-local"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={sessionTime}
                    onChange={e => setSessionTime(e.target.value)}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '20px',
                        }
                    }}
                />
                <Typography variant="h6" component="p" gutterBottom>
                    Price: ₹{price} 💵
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth 
                    onClick={handleSchedule}
                    style={{borderRadius:"20px"}}
                >
                    Schedule Session 📅
                </Button>
            </Box>

            <Snackbar
                open={alertOpen}
                onClose={() => setAlertOpen(false)}
                anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
                sx={{
                    '& .MuiSnackbarContent-root': {
                        minWidth: '50%',
                        backgroundColor: alertSeverity === 'error' ? '#f44336' : alertSeverity === 'warning' ? '#ff9800' : '#4caf50',
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

export default Scheduler;