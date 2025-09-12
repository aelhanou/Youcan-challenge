import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const apiKey = '7af82005b42b40d795a141129251209';


interface WeatherState {
  data: any | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: WeatherState = {
  data: null,
  status: 'idle',
  error: null,
};


export const fetchWeather = createAsyncThunk('weather/fetchWeather', async (city: string) => {
  const baseUrl = 'https://api.weatherapi.com/v1';
  const forecastUrl = `${baseUrl}/forecast.json?key=${apiKey}&q=${encodeURIComponent(city)}&days=7&aqi=yes&alerts=no`;
  const forecastRes = await fetch(forecastUrl);
  const forecastData = await forecastRes.json();
  if (!forecastRes.ok || !forecastData || forecastData.error) {
    throw new Error(forecastData?.error?.message || 'Failed to fetch weather data');
  }
  if (!forecastData.current?.air_quality) {
    const currentUrl = `${baseUrl}/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=yes`;
    const currentRes = await fetch(currentUrl);
    const currentData = await currentRes.json();
    if (currentRes.ok && currentData && !currentData.error) {
      forecastData.current.air_quality = currentData.current?.air_quality;
    }
  }
  return forecastData;
});

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to load weather data';
      });
  },
});

export default weatherSlice.reducer;