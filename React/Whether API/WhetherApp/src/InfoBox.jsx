import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import "./Info.css";

export default function InfoBox({info})
{
    let IMG_Link = "https://tinyurl.com/duf9jvpr";

 

    return (

        <div className="InfoBox">
            <h2>Weather Info</h2>
            <div className='card'>
            <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={IMG_Link}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {info.city}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} component={"span"}>
       
         <p>Temperature : {info.temp }&deg; C</p>
          <p>Humidity : {info.humidity}</p>
           <p>Min Temp : {info.minTemp}</p>
            <p>Max Temp  : {info.maxTemp}</p>
             <p>Feels Like : {info.feelslike}</p>
              <p>Weather : {info.weather}</p>
              <p>Please note: It can show inaccurate data,it is not accurate data</p>
        </Typography>
      </CardContent>
     
    </Card>
    </div>
        </div>
    )
}