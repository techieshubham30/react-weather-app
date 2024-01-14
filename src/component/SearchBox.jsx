import { useContext, useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { Place, Search } from "@mui/icons-material";
import { indianCities } from "../utils/config";
import { WeatherContext } from "../context/WeatherContext";
import Paper from "@mui/material";

const SearchBox = () => {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const { weather, setWeather } = useContext(WeatherContext);

  const options = indianCities; // Using JSON data for the options
  console.log(weather);

  useEffect(() => {
    // Fetch weather data when the selected value changes
    if (value) {
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${value.name}&appid=b3cf598232766b83289fe982d2dba7ed`;

      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setWeatherData(data);
          setWeather({
            ...weather,
            combinedTime: {
              sunrise: data.city.sunrise,
              sunset: data.city.sunset,
            },
            days: data.list.reduce((acc, day, index, array) => {
              const isDifferentDay =
                index === 0 || day.dt_txt !== array[index - 1].dt_txt;

              if (isDifferentDay) {
                acc.push({
                  dt_txt: day.dt_txt,
                  temp_min: day.main.temp_min,
                  temp_max: day.main.temp_max,
                  weather: day.weather[0].main,
                  pressure: day.main.pressure,
                  humidity: day.main.humidity,
                });
              }

              return acc;
            }, []),
          });
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    }
  }, [value]);

  return (
    <div>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="city-search-autocomplete"
        options={options}
        getOptionLabel={(option) => option.name}
        sx={{
          width: "100%",
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder="Search"
            InputProps={{
              ...params.InputProps,
              endAdornment: <Search fontSize="small" />,
              startAdornment: <Place fontSize="small" />,
            }}
          />
        )}
      />
    </div>
  );
};

export default SearchBox;
