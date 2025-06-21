import { useState } from "react";
import InfoBox from "./InfoBox";
import SearchBox from "./SearchBox";


export default function WeatherApp()
{

    let [weather,setWeather] = useState({
        city:"Delhi",
        feelslike: 24.7,
        temp : 25.2,
        minTemp : 15.0,
        maxTemp : 30.0,
        humidity : 60.0,
        weather : "Haze"
    })

    let updateInfo =(newInfo)=>{
        setWeather(newInfo);
    }

    return (
        <div>
            <h2>Weather App</h2>
            <SearchBox updateInfo={updateInfo}/>
            <InfoBox info={weather}/>
        </div>
    )
}