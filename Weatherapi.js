async function weatherapireq(url) {
  const response = await fetch(url);
  const data = await response.json();
  // console.log(data);
  return data;
}

export const searchdata = async (props) => {
  return weatherapireq(
    `http://api.weatherapi.com/v1/search.json?key=4b0df1601b3a4439951190412241503&q=${props.cityname}`
  );

};

export const forecastdata = (props) => {
 return  weatherapireq(`http://api.weatherapi.com/v1/forecast.json?key=4b0df1601b3a4439951190412241503&q=${props.cityname}&days=10&aqi=no&alerts=no`);
};
