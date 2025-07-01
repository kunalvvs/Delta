import React, { useState } from 'react';
import { addStartup } from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../layout.css';

const AddStartup = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [website, setWebsite] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newStartup = { name, description, website };
        await addStartup(newStartup);
        navigate('/');
    };

    return (
        <div className="container">
            <div className="header">
                <h1>Add New Startup</h1>
            </div>
            <form onSubmit={handleSubmit} className="section">
                <input
                    type="text"
                    placeholder="Startup Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <input
                    type="url"
                    placeholder="Website URL"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    required
                />
                <button type="submit" className="button">Add Startup</button>
            </form>
        </div>
    );
};

export default AddStartup;
