import { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";

const SunriseSunset = () => {
  const { weather } = useContext(WeatherContext);
  const { sunrise, sunset } = weather.combinedTime;

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontWeight: 700, color: "#2c3e50", lineHeight: "18px" }}>
          Sunrise
        </span>{" "}
        <span style={{ color: "#2c3e50" }}>{formatTime(sunrise)} am</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontWeight: 700, color: "#2c3e50", lineHeight: "18px" }}>
          Sunset
        </span>{" "}
        <span style={{ color: "#2c3e50" }}>{formatTime(sunset)} pm</span>
      </div>
    </div>
  );
};

export default SunriseSunset;
