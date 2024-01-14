// Utility function to compute hourlyWeatherData
export const getHourlyWeatherData = (weather, curDay) => {
  return weather.days.filter((data) => {
    const dataDate = data.dt_txt.split(" ")[0];
    return curDay.split(" ")[0] === dataDate;
  });
};
