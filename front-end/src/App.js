import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Scheduler from './components/Scheduler';
import Signup from './components/Signup';
import Login from './components/Login';
import Loader from './components/Loader';

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000); 

        return () => clearTimeout(timer);
    }, []);

    return (
        <Router>
            <div className="App">
                {loading ? (
                    <Loader />
                ) : (
                    <Routes>
                        <Route path="/" element={<Signup />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/scheduler" element={<Scheduler />} />
                    </Routes>
                )}
            </div>
        </Router>
    );
}

export default App;