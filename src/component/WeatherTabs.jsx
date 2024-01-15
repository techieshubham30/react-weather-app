import { Box, Tabs, Tab, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { WeatherContext } from "../context/WeatherContext";
import { getHourlyWeatherData } from "../utils/getHourlyWeatherData";
import { kelvinToCelsius } from "../utils/kelvinToCelsius";
import CurrentWeather from "./CurrentWeather";
import TemperatureChart from "./TemperatureChart";
import PressureHumidity from "./PressureHumidity";
import SunriseSunset from "./SunriseSunset";

const WeatherTabs = () => {
  const [value, setValue] = useState(0);
  const { weather } = useContext(WeatherContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getAbbreviatedDayFromDate = (dt_txt) => {
    const date = new Date(dt_txt);
    // Using toLocaleDateString to get the day in "weekday" format with options
    return date.toLocaleDateString(undefined, { weekday: "short" });
  };

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        marginBottom: "1.5rem",
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="Weather Tabs"
        sx={{
          indicatorColor: "none",
        }}
      >
        {weather?.everyDay?.map((day, index) => (
          <Tab
            key={index}
            label={
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  alignItems: "center",
                  padding: "0.5rem 1rem",
                  marginRight: "0.5rem",
                  transition: "box-shadow 0.3s ease-in",
                  border: value === index ? "3px solid #2babfa" : "none ",
                  background: value === index ? "#fffdf7" : "transparent",
                  color: "black",
                }}
              >
                <Typography
                  variant="h1 "
                  sx={{ fontWeight: 500, fontSize: "15px", color: "#2c3d4f" }}
                >{`${getAbbreviatedDayFromDate(day.dt_txt)}`}</Typography>

                <Typography
                  variant="h1"
                  sx={{ fontWeight: 500, fontSize: "15px", color: "#2c3d4f" }}
                >{` ${Math.ceil(kelvinToCelsius(day.temp_min))}°${Math.ceil(
                  kelvinToCelsius(day.temp_max)
                )}°`}</Typography>

                {day.weather.toLowerCase() === "clouds" && (
                  <img
                    src="./assets/images/clouds.png"
                    alt="Cloudy"
                    style={{ width: "30px", height: "30px" }}
                    className="weather-image"
                  />
                )}

                {day.weather.toLowerCase() === "clear" && (
                  <img
                    src="./assets/images/clear.png"
                    alt="Cloudy"
                    style={{ width: "30px", height: "30px" }}
                    className="weather-image"
                  />
                )}

                <Typography
                  variant="body2"
                  sx={{ fontWeight: 500, fontSize: "15px", color: "#2c3d4f" }}
                >
                  {day?.weather}
                </Typography>
              </div>
            }
          />
        ))}
      </Tabs>
      {weather?.days?.map((day, index) => (
        <TabPanel key={index} value={value} index={index}>
          <CurrentWeather currentTem={{ day }} />
          <TemperatureChart
            currentDay={{ curDay: day.dt_txt }}
            hourlyWeatherData={getHourlyWeatherData(weather, day.dt_txt)}
          />
          <PressureHumidity
            pressureValue={{ pressure: day.pressure }}
            humidityValue={{ humidity: day.humidity }}
          />
          <SunriseSunset />
        </TabPanel>
      ))}
    </Box>
  );
};

// A simple helper component for rendering the content of each tab
const TabPanel = ({ children, value, index }) => (
  <Box
    role="tabpanel"
    hidden={value !== index}
    id={`weather-tabpanel-${index}`}
    aria-labelledby={`weather-tab-${index}`}
    sx={{
      p: "1.5rem 1rem 0",
      borderRadius: "8px",
      boxShadow:
        "0 8px 10px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.1), 0 -8px 12px 0 rgba(0, 0, 0, 0.05), 0 -2px 3px -2px rgba(0, 0, 0, 0.01)",
    }}
  >
    {value === index && <Box>{children}</Box>}
  </Box>
);

export default WeatherTabs;
