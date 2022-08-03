import React from "react";
import { useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux/es/exports";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import cities from "../../citiesData";
import Select from "@mui/material/Select";
import "../DashboardStyle.css";
import {
  getForecastByCoordinates,
  getCurrentCoordinates,
} from "../../redux/weather/actions";
import Loader from "../../components/loader/Loader";

export default function Weather() {
  const weather = useSelector((state) => state.weather.weatherForecast);
  const loading = useSelector((state) => state.weather.loading);
  const cityName = useSelector((state) => state.weather.currentCity);
  const dispatch = useDispatch();

  const [city, setCity] = React.useState("");
  const [foundCity, setFoundCity] = React.useState(false);

  const handleChange = (event) => {
    const cityName = event.target.value;
    setCity(cityName);
    dispatch(getForecastByCoordinates(cityName));
  };

  useEffect(() => {
    let cityResult = "";
    if (cityName) {
      const foundCity = cities.find((element) => element.name === cityName);
      if (foundCity) {
        setFoundCity(true);
        cityResult = cities[0].name;
      } else {
        cityResult = cityName;
      }
    } else {
      cityResult = cities[0].name;
    }
    setCity(cityResult);
    dispatch(getForecastByCoordinates(cityResult));
  }, [cityName]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const coordinates = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };

        dispatch(getCurrentCoordinates({ coordinates }));
      });
    }
  }, [dispatch]);

  return (
    <>
      <Container maxWidth="lg" className="weather-forecast-container">
        <FormControl className="cities-select-style">
          <Select
            value={city}
            onChange={handleChange}
            inputProps={{ "aria-label": "Without label" }}
          >
            {cityName && !foundCity && (
              <MenuItem value={cityName} key={0}>
                {cityName}
              </MenuItem>
            )}
            {cities.map((elem) => (
              <MenuItem value={elem.name} key={elem.id}>
                {elem.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Grid container spacing={2}>
          {loading && <Loader />}
          {weather &&
            weather.map((elem) => (
              <Grid key={elem.time} item lg={3} md={4} sm={6}>
                <Card>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {elem.currentDay}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 16 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {elem.summary}
                    </Typography>
                    <Typography variant="body2" className="weather-data-style">
                      Apparent temperature high - {elem.apparentTemperatureHigh}
                      <br />
                      Apparent temperature low - {elem.apparentTemperatureLow}
                      <br />
                      Apparent temperature max - {elem.apparentTemperatureMax}
                      <br />
                      Apparent temperature min - {elem.apparentTemperatureMin}
                      <br />
                      Wind speed - {elem.windSpeed}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Container>
    </>
  );
}
