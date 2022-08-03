export const FORECAST_API = "1e993f2b33a9b4f1c7566590b27bb00e";
export const COORDINATES_API = "096204c0e1a7663dab2f9868fd44969c";

export const FORECAST_URL = `https://api.darksky.net/forecast/${FORECAST_API}/`;
export const HEROKU_URL = "https://cors-anywhere.herokuapp.com/";
export const COORDINATES_URL = `https://api.openweathermap.org/geo/1.0/direct?&appid=${COORDINATES_API}`;
export const CITIES_URL = `http://api.openweathermap.org/geo/1.0/reverse?limit=1&appid=${COORDINATES_API}`;
