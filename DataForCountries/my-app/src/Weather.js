import React, {useEffect, useState} from "react";
import axios from "axios";


function Weather( {capital}){
    const [weatherData, setWeatherData] = useState("");
    const [icon, setIcon] = useState("");
    const apiKey = `951f2db4dd247480792190366a2ed928`;
    var image;

    // Fetching data from OpenWeatherMaps
    useEffect(() =>{
        let cancel = false;
        axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}`)
        .then(response => {
            if (cancel) return;
            setWeatherData(response)
            setIcon(response.data.weather[0].icon)
        })

        return() => {
            cancel = true;
        }

    }, [])

    // Image
    image = "https://openweathermap.org/img/wn/" + icon + "@2x.png"

    return(

        <div>
            {weatherData.length == 0? (<p>Data not received</p>) : (

                <div>
                    <p>Temperature: {weatherData.data.main.temp}</p>
                    <p>Wind Speed: {weatherData.data.wind.speed}</p>
                    <img src={image}/>
                </div>
            )} 
            
        </div>
    )


}

export default Weather;