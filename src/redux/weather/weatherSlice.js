import { createSlice } from "@reduxjs/toolkit";
import { getForecastByCoordinates, getCurrentCoordinates } from "./actions";

const productSlice = createSlice({
  name: "products",
  initialState: {
    weatherForecast: [],
    loading: false,
    currentCity: null,
  },

  extraReducers: {
    [getForecastByCoordinates.pending]: (state) => {
      state.loading = true;
    },
    [getForecastByCoordinates.fulfilled]: (state, { payload }) => {
      if (payload?.data?.daily) {
        const { data } = payload.data.daily;

        data.shift();

        data.forEach(function (elem) {
          const unixTimestamp = elem.time;
          const milliseconds = unixTimestamp * 1000;
          const dateObject = new Date(milliseconds);
          const date = dateObject.toLocaleDateString();
          elem.currentDay = date;
        });

        state.weatherForecast = data;
      }

      state.loading = false;
    },
    [getForecastByCoordinates.rejected]: (state) => {
      state.loading = false;
    },
    [getCurrentCoordinates.pending]: (state) => {
      state.loading = true;
    },
    [getCurrentCoordinates.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.currentCity = payload.name;
    },
    [getCurrentCoordinates.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default productSlice;
