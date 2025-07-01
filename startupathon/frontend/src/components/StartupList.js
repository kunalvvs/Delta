import React, { useEffect, useState } from 'react';
import { getStartups, deleteStartup } from '../services/api';
import { Link } from 'react-router-dom';
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

    const handleDelete = async (id) => {
        await deleteStartup(id);
        setStartups(startups.filter(startup => startup._id !== id));
    };

    return (
        <div className="container">
            <div className="header">
                <h1>Startup List</h1>
                <Link to="/add" className="button">Add Startup</Link>
            </div>
            <div className="section startup-list">
                {startups.map(startup => (
                    <div className="startup-item" key={startup._id}>
                        <h3>{startup.name}</h3>
                        <p>{startup.description}</p>
                        <a href={startup.website} target="_blank" rel="noopener noreferrer">Visit Website</a>
                        <div className="actions">
                            <Link to={`/update/${startup._id}`} className="button">Update</Link>
                            <button onClick={() => handleDelete(startup._id)} className="button">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StartupList;
