import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import * as Location from 'expo-location';
import axios from "axios";
import * as String from "../util/stringUtils.js";

const apiKey = '67c2a48e99fca1699b5e59d8b725c8df';

export const CWeather = () => {

  const styles = StyleSheet.create({
    weather: {
      flex: 1,
      alignItems: 'center',
      marginVertical: '30%',
      flexDirection: 'column',
      justifyContent: 'flex-start',
    }
  });

  return (
    <View style={styles.weather}>
      <CWeatherCurrent />

      <StatusBar style="auto" />
    </View>
  );
};

function getIcon(weather) {
  switch (weather.toLowerCase()) {
    case 'sunny':
      return require('../assets/weather/sunny.png');
    default:
      break;
  }
}

const CWeatherCurrent = () => {

  const styles = StyleSheet.create({
    wrapper: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#94d0f2',
      padding: 20
    },
    temp: {
      fontSize: 48,
      fontWeight: 'bold'
    },
    bodyWrapper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    image: {
      width: 64,
      height: 64
    },
    whiteText: {
      color: '#fafafa'
    },
    day: {
      color: 'rgba(255, 255, 255, .6)',
      fontSize: 26,
    },
    body: {
      gap: 10,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  });

  const [data, setData] = useState(null);

  useEffect(() => {
    const askLocation = async () => {

      let lon = null,
          lat = null;

      await Location.requestForegroundPermissionsAsync();
      await Location.getCurrentPositionAsync()
          .then(location => {
            lon = location.coords.longitude;
            lat = location.coords.latitude;
          })

      return {lon, lat};
    };

    askLocation()
        .then(async ({lon, lat}) => {
          try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
            );

            console.log(response.data);

            const { name, main, weather } = response.data;
            setData({name, main, weather});
          } catch (error) {
            console.log(error);
          }
        });
  }, []);

  if (data) {
    return (
        <View style={styles.wrapper}>
          <Text style={styles.day}>Today</Text>
          <View style={styles.body}>
            <Text style={[styles.temp, styles.whiteText]}>{ `${Math.round(data.main.temp)}°` }</Text>
            <View style={styles.bodyWrapper}>
              <Image source={getIcon('sunny')} style={styles.image}></Image>
              <Text style={styles.whiteText}>{ String.capitalizeFirstLetter(data.weather[0].description) }</Text>
            </View>
          </View>
        </View>
    );
  }
};