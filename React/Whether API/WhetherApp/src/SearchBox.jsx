import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';



export default function SearchBox(){

    let [city,setCity] = useState("");

    let handleChange = (evt) =>{
        setCity(evt.target.value);
    }

    let handleSubmit = (evt)=>{
        evt.preventDefault();
        console.log(city)
        setCity("");
    }

    return (
        <div>
            <h3>Check Whether </h3>
            <form onSubmit={handleSubmit}>
                <TextField id="city" label="Search City" 
                variant="outlined" required 
                value={city} onChange={handleChange} />
                    <Button variant="contained" type='submit' >
                    Search
                    </Button>

                    
                    
            </form>
        </div>
    )
}