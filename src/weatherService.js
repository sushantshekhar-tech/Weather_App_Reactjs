const API_KEY = "2587c4a81c65c4689797803eea5b32cc";
const makeIconURL=(iconId)=>`https://openweathermap.org/img/wn/${iconId}@2x.png    `

const getFormattedWeatherData = async (city, units = "metric") => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

  const data = await fetch(URL)
    .then((res) => res.json())
    .then((data) => data);
  // console.log(data);

  //object destructuring

  const {
    name,
    weather,
    main: { feels_like, humidity, pressure, temp, temp_min, temp_max },
    wind: { speed },
    sys: { country },
  } = data;

  const { description, icon } = weather[0];

  return {
    name,
    country,
    pressure,
    iconURL:makeIconURL(icon),
    temp,
    temp_max,
    temp_min,
    humidity,
    speed,
    feels_like,
    description,
  };
};
export { getFormattedWeatherData };
