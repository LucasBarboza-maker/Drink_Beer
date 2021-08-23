import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {useEffect, useState} from 'react';
import saveinfo from '../../Utils/save';
import getInfo from '../../Utils/load';
import { StyleSheet, Text, View } from 'react-native';
import {
  LineChart,
  ContributionGraph
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


  const [quantityOfCups, setQuantityOfCups] = useState([{radiusColor:'white',hour:currentDateFormatToCard(), messageToDrink:"Não Esquece", ml:"300ml", radiusPercentage:0.1}])


  function currentDateFormatToCard(){
    let date = new Date();
    let formattedDate = "";
    if(date.getHours() <= 9){
      formattedDate = date.getHours()+":0"+date.getMinutes()+"Hrs";
      return formattedDate;
    }
    formattedDate = date.getHours()+":"+date.getMinutes()+"Hrs";
    return formattedDate;
  }
  

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

  const commitsData = [
    { date: '2017-01-02', count: 1 },
    { date: '2017-01-03', count: 2 },
    { date: '2017-01-04', count: 3 },
    { date: '2017-01-05', count: 4 },
    { date: '2017-01-06', count: 5 },
    { date: '2017-01-30', count: 2 },
    { date: '2017-01-31', count: 3 },
    { date: '2017-03-01', count: 2 },
    { date: '2017-04-02', count: 4 },
    { date: '2017-03-05', count: 2 },
    { date: '2017-02-30', count: 4 }
  ]
  
  return (
    <View style={styles.container}>

    <Text style={{fontSize:20}}>Consumo diário</Text>
    <StatusBar style="auto" />
      <LineChart
        data={dataLine}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
      />

    <Text style={{fontSize:20}}>Consumo Mensal</Text>
    <ContributionGraph
      values={commitsData}
      endDate={new Date('2017-04-01')}
      numDays={105}
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
