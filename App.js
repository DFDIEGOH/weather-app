import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  Animated,
} from 'react-native';

let clouds = './assets/clouds.jpg';
let sunny = './assets/sunny.jpg';
let rain = './assets/rain2.jpg';
let home = './assets/clear.jpg';

const api = {
  key: 'edcdceb3184c6bd5603615cb8f1a1010',
  url: 'http://api.openweathermap.org/data/2.5/',
};

const App = () => {
  let date = String(new window.Date());
  date = date.slice(3, 15);

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');

  const search = () => {
    fetch(`${api.url}weather?q=${query}&units=metric&appid=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        setQuery('');
      });
  };

  return (
    <View>
      <ImageBackground
        source={
          typeof weather.main !== 'undefined'
            ? weather.weather[0].main === 'Clouds'
              ? require(clouds)
              : weather.weather[0].main === 'Sunny'
              ? require(sunny)
              : weather.weather[0].main === 'Rain'
              ? require(rain)
              : require(home)
            : require(home)
        }
        style={style.backgroundImage}
        imageStyle={{opacity: 0.55}}>
        <View>
          <TextInput
            style={style.searchbox}
            placeholder="Search.."
            onChangeText={(text) => setQuery(text)}
            value={query}
            onSubmitEditing={search}
          />
        </View>

        {typeof weather.main !== 'undefined' ? (
          <View style={style.main}>
            <Text style={style.location}>
              {weather.name}, {weather.sys.country}
            </Text>
            <Text style={style.date}>{date}</Text>
            <Text style={style.temperature}>
              {Math.round(weather.main.temp)}°C
            </Text>
            <Text style={style.description}>{weather.weather[0].main}</Text>
          </View>
        ) : (
          <View style={style.homeContainer}>
            <Text style={style.home}>Weather App</Text>
            <Text style={style.homeDescription}>
              Introduce a location in the search bar.
            </Text>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

export default App;

const style = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: -25,
  },
  searchbox: {
    height: 50,
    borderWidth: 0,
    color: '#313131',
    fontSize: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    borderRadius: 12,
    marginTop: 15,
    padding: 10,
    margin: 15,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  location: {
    color: 'white',
    fontSize: 48,
    fontWeight: '700',
    textAlign: 'center',
  },
  date: {
    color: 'white',
    fontSize: 30,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 10,
  },
  temperature: {
    position: 'relative',
    margin: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: 15,
    color: '#fff',
    fontSize: 80,
    fontWeight: '900',
    textAlign: 'center',
  },
  description: {
    color: 'white',
    fontSize: 48,
    fontWeight: '700',
    textAlign: 'center',
  },

  home: {
    position: 'relative',
    margin: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: 15,
    color: '#fff',
    fontSize: 60,
    fontWeight: '900',
    textAlign: 'center',
  },
  homeDescription: {
    position: 'relative',
    margin: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: 15,
    color: '#fff',
    fontSize: 50,
    fontWeight: '900',
    textAlign: 'center',
  },
});
