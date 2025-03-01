const API_URL = 'http://localhost:5000/api/startups';

export const getStartups = async () => {
    const response = await fetch(API_URL);
    return await response.json();
};

export const addStartup = async (startup) => {
    await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(startup),
    });
};

export const getStartupById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    return await response.json();
};

export const updateStartup = async (id, startup) => {
    await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(startup),
    });
};

export const deleteStartup = async (id) => {
    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
};
