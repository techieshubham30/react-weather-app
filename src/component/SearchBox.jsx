import { useContext, useEffect, useState } from "react";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { Place, Search } from "@mui/icons-material";
import { indianCities } from "../utils/config";
import { WeatherContext } from "../context/WeatherContext";
import Paper from "@mui/material";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Adjust the height to your preference
      }}
    >
      <CircularProgress />
    </div>
  );
};

const SearchBox = () => {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [loading, setLoading] = useState(true);

  const { weather, setWeather } = useContext(WeatherContext);

  const options = indianCities; // Using JSON data for the options

  useEffect(() => {
    // Function to get user's current location
    const getCurrentLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=b3cf598232766b83289fe982d2dba7ed`;

          fetch(apiUrl)
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then((data) => {
              const cityName = data.name || "Unknown City";

              setValue({ name: cityName });
              setInputValue(cityName);
              setLoading(false);
            })
            .catch((error) => {
              console.error("Error fetching OpenWeatherMap data:", error);
              setLocationError(
                "Error getting location. Please search manually."
              );
            });
        },
        (error) => {
          console.error("Error getting user's location:", error);
          setLocationError("Error getting location. Please search manually.");
          setLoading(false);
        }
      );
    };

    // Ask for location rights when the component mounts
    if (navigator.geolocation) {
      getCurrentLocation();
    } else {
      console.error("Geolocation is not supported by your browser");
      setLocationError(
        "Geolocation is not supported by your browser. Please search manually."
      );
      setLoading(false);
    }
  }, []);

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
            everyDay: data.list.reduce((acc, day, index, array) => {
              const currentDay = day.dt_txt.split(" ")[0]; // Extract date part

              const isDifferentDay =
                index === 0 ||
                currentDay !== array[index - 1].dt_txt.split(" ")[0];

              if (isDifferentDay) {
                acc.push({
                  dt_txt: currentDay,
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
      {loading && <Loader />}{" "}
      {
        <Autocomplete
          style={{ visibility: loading ? "hidden" : "visible" }}
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
      }
    </div>
  );
};

export default SearchBox;
