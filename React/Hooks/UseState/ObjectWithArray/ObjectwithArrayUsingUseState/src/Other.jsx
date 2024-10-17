import React, { useState } from 'react';
function Other() {
    const [click, setClick] = useState([]);

    const addNumber = () => {
        setClick([
            ...click,
            {
                id: click.length,
                value: Math.random() * 10
            }
        ]);
    };

    return (
        <div>
            <ul>
                {click.map(item => (
                    <li key={item.id}>{item.value}</li>
                ))}
            </ul>
            <button onClick={addNumber}>
                Click me
            </button>
        </div>
    );
}

export default Other;
