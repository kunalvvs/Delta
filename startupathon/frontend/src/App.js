import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartupList from './components/StartupList';
import AddStartup from './components/AddStartup';
import UpdateStartup from './components/UpdateStartup';
import './layout.css';

const App = () => {
    return (
        <Router>
            <div className="container">
                <div className="header">
                    <h1>Startupathon</h1>
                </div>
                <Routes>
                    <Route path="/" element={<StartupList />} />
                    <Route path="/add" element={<AddStartup />} />
                    <Route path="/update/:id" element={<UpdateStartup />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
