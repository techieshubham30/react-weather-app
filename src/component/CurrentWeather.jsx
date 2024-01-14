import { kelvinToCelsius } from "../utils/kelvinToCelsius";

const CurrentWeather = (props) => {
  const { temp_max } = props.currentTem.day;
  const { weather } = props.currentTem.day;
  return (
    <div
      className="current-tem-div"
      style={{
        display: "flex",
        alignItems: "baseline",
        marginBottom: "1.5rem",
      }}
    >
      <h1
        className="current-tem"
        style={{ fontSize: "3rem", fontWeight: "700" }}
      >
        {Math.ceil(kelvinToCelsius(temp_max))}°C
      </h1>
      {weather.toLowerCase() === "clouds" && (
        <img
          src="./assets/images/clouds.png"
          alt="Cloudy"
          style={{ width: "40px", height: "40px", marginLeft: "1rem" }}
        />
      )}

      {weather.toLowerCase() === "clear" && (
        <img
          src="./assets/images/clear.png"
          alt="Cloudy"
          style={{ width: "40px", height: "40px", marginLeft: "1rem" }}
        />
      )}
    </div>
  );
};

export default CurrentWeather;
