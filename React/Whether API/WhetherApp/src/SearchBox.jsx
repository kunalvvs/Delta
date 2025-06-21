import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';



export default function SearchBox({updateInfo}){

    let [city,setCity] = useState("");
    let [error,setError] = useState(false);  //for error handle when some place is not exist in API

    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_Key = "773216d7247c616f5c3578401e71e6e1";

    let getWeather =async ()=>{

        try{
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
       return result;
        }
        catch(error)
        {
            
            throw error;
        }
       
    }

    let handleChange = (evt) =>{
        setCity(evt.target.value);
    }

    let handleSubmit = async (evt)=>{
      try{  evt.preventDefault();
        console.log(city)
        setCity("");
      let newInfo =  await  getWeather();
      updateInfo(newInfo);
      }
      catch(error)
      {
        setError(true);
      }
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

             {error && <p style={{color:"red"}}>No such a place exist</p>}
                 
                    
            </form>
        </div>
    )
}