const PressureHumidity = (props) => {
  const { pressure } = props.pressureValue;
  const { humidity } = props.humidityValue;
  return (
    <div
      style={{
        display: "flex",
        marginBottom: "3rem",
        textAlign: "left",
      }}
    >
      <div
        className="pressure-forecast"
        style={{
          background: "#f3fbff",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          padding: "1rem 0.75rem",
          marginRight: "0.5rem",
        }}
      >
        <span style={{ fontWeight: "700", color: "#2c3e50" }}>Pressure</span>
        {pressure} hpa
      </div>

      <div
        className="humidity-forecast"
        style={{
          background: "#f3fbff",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          padding: "1rem 0.75rem",
        }}
      >
        <span style={{ fontWeight: "700", color: "#2c3e50" }}>Humidity</span>
        {humidity} %
      </div>
    </div>
  );
};

export default PressureHumidity;
