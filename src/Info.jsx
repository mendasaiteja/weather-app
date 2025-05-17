import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function Info({info}){
    return (
        <>
            <Card sx={{ maxWidth: 345, margin: '0 auto', marginTop: 2 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image="https://www.theolivepress.es/wp-content/uploads/2020/04/heatwave.jpg"
                        alt="weather"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h4" component="div">
                            {info.city}, {info.Country}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" component="div">
                            <p>Temperature: {info.Temperature}°C</p>
                            <p>Feels Like: {info.FeelsLike}°C</p>
                            <p>Humidity: {info.Humidity}%</p>
                            <p>Max Temp: {info.TemperatureMaximum}°C</p>
                            <p>Min Temp: {info.TemperatureMinimum}°C</p>
                            <p>Description: {info.Description}</p>
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    );
}