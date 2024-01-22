import HotBg from "./assets/hot.jpg";
import ColdBg from "./assets/cold.jpg";
import Description from "./components/Description";
import { useEffect, useState } from "react";
import { getFormattedWeatherData } from "./weatherService";

function App() {
  const [city,setCity]=useState('Dhanbad');
  const [weather, setWeather] = useState(null);
  const[units,setUnits]=useState('metric');
  const[bg,setBg]=useState(HotBg);


  useEffect(() => {
    const fetchweatherdata = async () => {
      const data = await getFormattedWeatherData(city,units);
      //  console.log(data);
      setWeather(data);

      //dynamic data for background
      const thresold =units ==='metric'?20:60;
      if(data.temp <= thresold)setBg(ColdBg);
      else setBg(HotBg);
    };
    fetchweatherdata();



  }, [units,city]);
  // useeffect should reload when our units and city Changes....so this is what it is done in the upper line

const handleUnitsClick =(e)=>{

const button=e.currentTarget;
const currentUnit=button.innerText.slice(1);
console.log(currentUnit)


const isCelcius = currentUnit === 'C';
button.innerText =isCelcius? '°F':'°C';
setUnits(isCelcius ? 'metric':'imperial');


}

// TO handle the input field where the key is presed and the city is to be declared and needs to be find out
//13 is the key code of enter key  so when the enter i=key is pressed then the value inside the input field is taken out from there
const enterkeypressed =(e)=>{
if(e.keyCode ===13){
  console.log(e.currentTarget.value)
  setCity(e.currentTarget.value);
  e.currentTarget.blur();
}
}



  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section__inputs">
              <input onKeyDown={enterkeypressed} type="text" name="City" placeholder="Enter City.." />
              <button onClick={(e)=>handleUnitsClick(e)}>°F</button>
            </div>
            <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weather.name},${weather.country}`}</h3>
                <img
                  src={weather.iconURL}
                  alt="//"
                />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()}°${units==='metric'?"C":"F"}`}</h1>
                {/* ternary operator used to check wheather the data is in c or in f */}
              </div>
            </div>

            {/* bottom temperature */}
            <Description weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
