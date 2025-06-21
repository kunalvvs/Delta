import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import "./Info.css";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WbSunnySharpIcon from '@mui/icons-material/WbSunnySharp';
import ThunderstormSharpIcon from '@mui/icons-material/ThunderstormSharp';

export default function InfoBox({info})
{
     let RAIN_IMG = "https://plus.unsplash.com/premium_photo-1674684222755-98a35d94cdfa?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
     let HOT_IMG = "https://images.unsplash.com/photo-1504370805625-d32c54b16100?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
     let COLD_IMG = "https://images.unsplash.com/photo-1612208695882-02f2322b7fee?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";


    return (

        <div className="InfoBox">
            <h2>Weather Info</h2>
            <div className='card'>
            <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={ info.humidity>80 ?  RAIN_IMG : info.temp >15 ? HOT_IMG : COLD_IMG }
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {info.city} {info.humidity>80 ?  <ThunderstormSharpIcon/> : info.temp >15 ? <WbSunnySharpIcon/> : <AcUnitIcon/>}
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