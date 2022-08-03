import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "../../helpers/helpers";
import {
  FORECAST_URL,
  HEROKU_URL,
  COORDINATES_URL,
  CITIES_URL,
} from "../../constants/constants";

export const getForecastByCoordinates = createAsyncThunk(
  "weather/getForecastByCoordinates",
  async (cityName, { rejectWithValue }) => {
    try {
      const coordinates = await fetchData(`${COORDINATES_URL}&q=${cityName}`);

      if (coordinates.data[0]) {
        const { lat, lon } = coordinates.data[0];
        const response = await fetchData(
          `${HEROKU_URL}${FORECAST_URL}${lat},${lon}/?units=si`,
        );
        if (response.result === "error") {
          throw new Error();
        }

        return response;
      }
    } catch (err) {
      return rejectWithValue();
    }
  },
);
export const getCurrentCoordinates = createAsyncThunk(
  "weather/getCurrentCoordinates",
  async (data, { rejectWithValue }) => {
    try {
      const { lat, lon } = data.coordinates;
      const response = await fetchData(`${CITIES_URL}&lat=${lat}&lon=${lon}`);

      if (response.result === "error") {
        throw new Error();
      }

      if (response.data[0]) {
        return response.data[0];
      }
    } catch (err) {
      return rejectWithValue();
    }
  },
);
