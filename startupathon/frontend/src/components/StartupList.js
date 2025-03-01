import React, { useEffect, useState } from 'react';
import { getStartups } from '../services/api';
import '../layout.css';

const StartupList = () => {
    const [startups, setStartups] = useState([]);

    useEffect(() => {
        const fetchStartups = async () => {
            const data = await getStartups();
            setStartups(data);
        };
        fetchStartups();
    }, []);

    return (
        <div className="container">
            <div className="header">
                <h1>Startup List</h1>
            </div>
            <div className="section startup-list">
                {startups.map(startup => (
                    <div className="startup-item" key={startup._id}>
                        <h3>{startup.name}</h3>
                        <p>{startup.description}</p>
                        <a href={startup.website} target="_blank" rel="noopener noreferrer">Visit Website</a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StartupList;
