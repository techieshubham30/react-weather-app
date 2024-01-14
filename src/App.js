import "./App.css";
import SearchBox from "./component/SearchBox";
import WeatherTabs from "./component/WeatherTabs";

function App() {
  return (
    <div className="App">
      <main>
        <SearchBox />
        <WeatherTabs />
      </main>
    </div>
  );
}
export default App;
