import { useLocation } from "react-router-dom";
import Header from "../Header/Header";
import "./Weather.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Clear from "./WeatherImages/Clear.jpg";
import Clouds from "./WeatherImages/Clouds.jpg";
import Drizzle from "./WeatherImages/Drizzle.jpg";
import Rain from "./WeatherImages/Rain.jpg";
import Snow from "./WeatherImages/Snow.jpg";
import Thunderstorm from "./WeatherImages/Thunderstorm.jpg";
import Haze from "./WeatherImages/Haze.jpg";

const Weather = () => {
  const location = useLocation();

  const [weatherData, setWeatherData] = useState<any>([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const lat = params.get("lat");
    const lon = params.get("lon");

    const fetchData = async () => {
      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=fc77e40ebafa7b3ca351479c35460584&units=metric`
        )
        .then((response) => {
          console.log(response.data);
          setWeatherData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, [location]);

  const getBackgroundImage = (weatherCondition: string | undefined) => {
    switch (weatherCondition) {
      case "Clear":
        return `${Clear}`;
      case "Clouds":
        return `${Clouds}`;
      case "Rain":
        return `${Rain}`;
      case "Drizzle":
        return `${Drizzle}`;
      case "Snow":
        return `${Snow}`;
      case "Thunderstorm":
        return `${Thunderstorm}`;
      default:
        return `${Haze}`;
    }
  };

  return (
    <>
      <Header />
      <div
        className="weatherMainContainer"
        style={{
          background: `url(${getBackgroundImage(
            weatherData?.weather?.[0]?.main
          )})`,
        }}>
        <div className="weatherIconImg">
          <img
            src={`https://openweathermap.org/img/wn/${weatherData?.weather?.[0]?.icon}@2x.png`}
            alt="icon"
          />
        </div>
        <h1 className="weatherTempText">{weatherData?.main?.temp}° C</h1>
        <h4 className="weatherTempText2">
          {weatherData?.weather?.[0]?.description}
        </h4>
        <h1 className="weatherTempText">{weatherData?.name}</h1>
        <div className="weatherTableContainer">
          <table className="weatherTable">
            <thead>
              <tr>
                <th>Feels Like</th>
                <th>Day High</th>
                <th>Day Low</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{weatherData?.main?.feels_like}° C</td>
                <td>{weatherData?.main?.temp_max}° C</td>
                <td>{weatherData?.main?.temp_min}° C</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="weatherTableContainer2">
          <table className="weatherTable">
            <thead>
              <tr>
                <th>Humidity</th>
                <th>Pressure</th>
                <th>Wind Speed</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{weatherData?.main?.humidity} %</td>
                <td>{weatherData?.main?.pressure} hPa</td>
                <td>{weatherData?.wind?.speed} m/s</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Weather;
