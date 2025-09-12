import { useEffect, useState } from 'react';
import {
  CityNameSection,
  ExactWeatherStatusSection,
  WeatherStatsSection,
  ForecastSection,
  SettingsMenu,
} from './components';
import { useAppDispatch } from './hooks/useAppDispatch';
import { useAppSelector } from './hooks/useAppSelector';
import { fetchWeather } from './store/weatherSlice';

export default function App() {
  const dispatch = useAppDispatch();
  const weatherData = useAppSelector((state) => state.weather.data);
  const status = useAppSelector((state) => state.weather.status);
  const error = useAppSelector((state) => state.weather.error);
  const [seachcity, setSearchCity] = useState('');

  const [showSettings, setShowSettings] = useState(false);
  const [tempUnit, setTempUnit] = useState<'c' | 'f'>('c');
  const [measureUnit, setMeasureUnit] = useState<'metric' | 'imperial'>('metric');
  const [forecastMode, setForecastMode] = useState<'hourly' | 'daily'>('hourly');



  useEffect(() => {
    dispatch(fetchWeather(seachcity.trim() === '' ? 'Casablanca' : seachcity.trim()));
  }, [dispatch]);

  let cityName = seachcity.trim() === '' ? 'Casablanca' : seachcity.trim();
  let dateString = '';
  let timeString = '';
  let temperatureC = 0;
  let temperatureF = 0;
  let feelsLikeC = 0;
  let feelsLikeF = 0;
  let description = '';
  let iconUrl: string | undefined;
  let humidity = 0;
  let precipitation = 0;
  let windKmh = 0;
  let aqi = 0;
  let hourlyForecast: { time: string; condition: string; tempC: number; tempF: number }[] = [];
  let dailyForecast: { day: string; condition: string; maxTempC: number; minTempC: number; maxTempF: number; minTempF: number }[] = [];
  if (weatherData) {
    cityName = weatherData.location?.name || cityName;
    const localtime = weatherData.location?.localtime;
    if (localtime) {
      const localDate = new Date(localtime.replace(' ', 'T'));
      dateString = localDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
      timeString = localDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    const current = weatherData.current;
    if (current) {

      console.log(current);
      temperatureC = current.temp_c;
      temperatureF = current.temp_f;
      feelsLikeC = current.feelslike_c;
      feelsLikeF = current.feelslike_f;
      description = current.condition?.text || '';
      iconUrl = current.condition?.icon;
      humidity = current.humidity;
      windKmh = current.wind_kph;
      const usIndex = current.air_quality ? current.air_quality['us-epa-index'] : 0;
      aqi = usIndex ? usIndex * 50 : 0;
    }
    const forecastDays = weatherData.forecast?.forecastday;
    if (forecastDays && forecastDays.length > 0) {
      precipitation = forecastDays[0].day?.daily_chance_of_rain || 0;
      const hours = forecastDays[0].hour || [];
      hourlyForecast = hours.slice(0, 8).map((h: any) => ({
        time: h.time.split(' ')[1],
        condition: h.condition?.text || '',
        tempC: h.temp_c,
        tempF: h.temp_f,
      }));
      dailyForecast = forecastDays.slice(0, 7).map((d: any) => {
        const dateObj = new Date(d.date);
        return {
          day: dateObj.toLocaleDateString('en-US', { weekday: 'short' }),
          condition: d.day?.condition?.text || '',
          maxTempC: d.day?.maxtemp_c,
          minTempC: d.day?.mintemp_c,
          maxTempF: d.day?.maxtemp_f,
          minTempF: d.day?.mintemp_f,
        };
      });
    }
  }

  return (
    <div
      className="flex w-[100vw] justify-center items-center min-h-screen   text-white"
      style={{
        background:
          'linear-gradient(0deg, var(--bg-strong-950, #0E121B), var(--bg-strong-950, #0E121B)), linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0) 100%)',
      }}
    >


      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4">
        <input
          type="text"
          value={seachcity}
          onChange={(e) => setSearchCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && seachcity.trim() !== '') {
              dispatch(fetchWeather(seachcity.trim()));
              setSearchCity('');
            }
          }}
          placeholder="Search city..."
          className="w-full px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div
        className="w-full max-w-screen-md mx-4 sm:mx-8 md:mx-auto flex flex-col justify-center bg-white text-black backdrop-blur-lg rounded-3xl p-6 md:p-8 mt-10"
      >
        <div className="relative ">
          <CityNameSection
            cityName={cityName}
            dateString={dateString}
            timeString={timeString}
            onSettingsClick={() => setShowSettings(!showSettings)}
          />
          {showSettings && (
            <SettingsMenu
              tempUnit={tempUnit}
              setTempUnit={setTempUnit}
              measureUnit={measureUnit}
              setMeasureUnit={setMeasureUnit}
              onClose={() => setShowSettings(false)}
            />
          )}
        </div>
        <ExactWeatherStatusSection
          temperatureC={temperatureC}
          temperatureF={temperatureF}
          feelsLikeC={feelsLikeC}
          feelsLikeF={feelsLikeF}
          description={description}
          tempUnit={tempUnit}
          iconUrl={iconUrl}
        />
        <WeatherStatsSection
          humidity={humidity}
          precipitation={precipitation}
          windKmh={windKmh}
          aqi={aqi}
          measureUnit={measureUnit}
        />
        <div
          className=''
        >
          <ForecastSection
            mode={forecastMode}
            setMode={setForecastMode}
            hourly={hourlyForecast}
            daily={dailyForecast}
            tempUnit={tempUnit}
          />
        </div>
        {status === 'loading' && (
          <p className="text-center text-sm text-gray-500  text-gray-400 mt-4">Loading...</p>
        )}
        {status === 'failed' && (
          <p className="text-center text-sm text-red-500 mt-4">{error}</p>
        )}
      </div>
    </div>
  );
}
