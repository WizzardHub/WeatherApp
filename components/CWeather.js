import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {StatusBar} from "expo-status-bar";

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
      <CWeatherCurrent weather="Sunny" temp="28°" />

      <StatusBar style="auto" />
    </View>
  );
};

const CWeatherCurrent = ({weather, temp}) => {

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

  return (
      <View style={styles.wrapper}>
        <Text style={styles.day}>Today</Text>
        <View style={styles.body}>
          <Text style={[styles.temp, styles.whiteText]}>{ temp }</Text>
          <View style={styles.bodyWrapper}>
            <Image source={require('../assets/weather/sunny.png')} style={styles.image}></Image>
            <Text style={styles.whiteText}>{ weather }</Text>
          </View>
        </View>
      </View>
  );
};