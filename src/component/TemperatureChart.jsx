import { useEffect, useState, useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";
import Chart from "react-apexcharts";
const TemperatureChart = (props) => {
  const { curDay } = props.currentDay;

  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Update the chart series when temperature data changes
    // console.log(props.hourlyWeatherData);
    if (props.hourlyWeatherData.length > 0) {
      const categories = props.hourlyWeatherData.map((data) =>
        data.dt_txt.split(" ")[1].slice(0, 5)
      );

      const minTemperatures = props.hourlyWeatherData.map((data) =>
        Math.ceil(data.temp_min)
      );
      const maxTemperatures = props.hourlyWeatherData.map((data) =>
        Math.ceil(data.temp_max)
      );

      setChartData({
        options: {
          chart: {
            id: "temperature-chart",
            height: 350,
            type: "line",
            zoom: {
              enabled: false,
            },
          },
          stroke: {
            curve: "straight",
          },
          fill: {
            type: "solid",
            opacity: [0.35, 1],
          },
          labels: categories,
          markers: {
            size: 0,
          },
        },
        series: [
          {
            name: "Temperature",
            type: "area",
            data: maxTemperatures,
          },
        ],
      });
    }
  }, [curDay]);

  return (
    <div className="temp-chart">
      {chartData && (
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="line"
          width="500"
        />
      )}
    </div>
  );
};

export default TemperatureChart;
