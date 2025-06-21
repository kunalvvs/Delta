import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';



export default function SearchBox(){

    let [city,setCity] = useState("");
    

    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_Key = "773216d7247c616f5c3578401e71e6e1";

    let getWeather =async ()=>{
       let response = await fetch(`${API_URL}?q=${city}&appid=${API_Key}&units=metric`);
       let data = await response.json();
       console.log(data);
       let result = {
        city: city,
        temp : data.main.temp,
        humidity : data.main.humidity,
        weather : data.weather[0].description,
        minTemp: data.main.temp_min,
        maxTemp: data.main.temp_max,
        feelslike: data.main.feels_like
       }

       console.log(result);
    }

    let handleChange = (evt) =>{
        setCity(evt.target.value);
    }

    let handleSubmit = (evt)=>{
        evt.preventDefault();
        console.log(city)
        setCity("");
        getWeather();
    }

    return (
        <div>
        
            <form onSubmit={handleSubmit}>
                <TextField id="city" label="Search City" 
                variant="outlined" required 
                value={city} onChange={handleChange} />
                    <Button variant="contained" type='submit' style={{margin:"13px"}}>
                    Search
                    </Button>

             
                 
                    
            </form>
        </div>
    )
}