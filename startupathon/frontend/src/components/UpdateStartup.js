import React, { useEffect, useState } from 'react';
import { getStartupById, updateStartup } from '../services/api';
import '../layout.css';

const UpdateStartup = ({ match, history }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [website, setWebsite] = useState('');

    useEffect(() => {
        const fetchStartup = async () => {
            const startup = await getStartupById(match.params.id);
            setName(startup.name);
            setDescription(startup.description);
            setWebsite(startup.website);
        };
        fetchStartup();
    }, [match.params.id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedStartup = { name, description, website };
        await updateStartup(match.params.id, updatedStartup);
        history.push('/'); // Redirect to the startup list after updating
    };

    return (
        <div className="container">
            <div className="header">
                <h1>Update Startup</h1>
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
                <button type="submit" className="button">Update Startup</button>
            </form>
        </div>
    );
};

export default UpdateStartup;
