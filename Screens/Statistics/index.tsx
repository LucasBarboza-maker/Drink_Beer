import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  LineChart,
  ProgressChart,

} from "react-native-chart-kit";

import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "white",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "white",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(255, 82, 82, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};


export default function Statistics() {

  const dataLine = {
    labels: ["Janeiro 1º", "Janeiro 2°", "Janeiro 3°", "Janeiro 4°", "Fevereiro 1ª"],
    datasets: [
      {
        data: [20, 15, 13, 25, 13],
        color: (opacity = 1) => `rgba(254, 30, 30, ${opacity})`, // optional
        strokeWidth: 4 // optional
      }
    ],
    legend: ["Litroes por Semana"] // optional
  };

  const dataProgress = {
    labels: ["Manha", "Tarde", "Noite"], // optional
    data: [0.4, 0.6, 0.8]
  };

  
  return (
    <View style={styles.container}>

    <Text style={{fontSize:20}}>Consumo diário</Text>
    <ProgressChart
      data={dataProgress}
      width={screenWidth}
      height={220}
      strokeWidth={16}
      radius={32}
      chartConfig={chartConfig}
      hideLegend={false}
    />

<Text style={{fontSize:20}}>Consumo Mensal</Text>
      <StatusBar style="auto" />
      <LineChart
        data={dataLine}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
