import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { CurrentHourToCard, CurrentDateFormat } from '../../helpers/dateFormat'
import { ReturnCommitDate, ReturnLineDate } from '../../helpers/statisticsData';
import getInfo from '../../Utils/load';

import { StyleSheet, Text, View, ScrollView } from 'react-native';
import {
  LineChart,
  ContributionGraph
} from "react-native-chart-kit";

import {
  AdMobBanner,
  AdMobInterstitial,
  setTestDeviceIDAsync
} from 'expo-ads-admob';

import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

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

  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const [quantityOfCups, setQuantityOfCups] = useState([{ radiusColor: 'white', hour: CurrentHourToCard(), cardDate: CurrentDateFormat(), messageToDrink: "Não Esquece", ml: "300ml", radiusPercentage: 0.1, default: true }])
  const [commitData, setCommitData] = useState([{ date: "", count: 0 }])
  const [lineData, setLineData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        color: (opacity = 1) => `rgba(254, 30, 30, ${opacity})`,
        strokeWidth: 4
      }
    ],
    legend: ["Litros por Semana"]
  })

  useEffect(() => {
    setLoading(true);
    setQuantityOfCups(quantityOfCups.filter(e => {
      if (e.default == false || e.default == undefined) {
        return e;
      }
    }));

    getInfo('drinks').then(e => {
      if (e != null) {
        setQuantityOfCups(e)
        setCommitData(ReturnCommitDate(e))
        setLineData(ReturnLineDate(e))
      }
    }).then(() => {
      setLoading(false);
    })

    loadAd();

  }, [isFocused])

  async function loadAd() {
    var RandomNumber = Math.floor(Math.random() * 100) + 1;
    if (RandomNumber > 70) {
      AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712');
      InterstitalAd()
    }
  }

  async function InterstitalAd() {
    try {
      await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true })
      await AdMobInterstitial.showAdAsync();
    } catch (e) {
      console.log(e);
    }
  }

  var halfDateToContriuitorsGraph = new Date();
  halfDateToContriuitorsGraph.setMonth(halfDateToContriuitorsGraph.getMonth() + 1);
  const handleToolTip: any = {}

  return (
    <ScrollView style={{minHeight:screenHeight, backgroundColor:'white'}}>
    <View style={styles.container}>
      <View style={styles.announcementContainer}>
        <AdMobBanner
          bannerSize="largeBanner"
          adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
          servePersonalizedAds // true or false
          onDidFailToReceiveAdWithError={() => console.log("Erro")} />
      </View>
      <Text style={{ fontSize: 20 }}>Consumo diário</Text>
      <StatusBar style="auto" />
      {loading == false ?
        <View style={{ minHeight: 220, width:'100%' }}>
          <LineChart
            data={lineData}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
            yAxisSuffix={"L"}
          />
        </View>
        :
        <></>
      }

      <Text style={{ fontSize: 20, marginTop:50 }}>Consumo Mensal</Text>
      {loading == false ?
        <View style={{ minHeight: 220, width:'100%' }}>
          <ContributionGraph
            values={commitData}
            endDate={halfDateToContriuitorsGraph}
            numDays={105}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
            tooltipDataAttrs={(value) => handleToolTip}
          />
        </View>
        :
        <></>
      }
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  announcementContainer: {
    padding: 5,
    display: 'flex',
    justifyContent: 'center'

  }
});

