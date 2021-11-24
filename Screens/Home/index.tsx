import React from 'react';
import { useState, useEffect } from 'react';
import saveinfo from '../../Utils/save';
import getInfo from '../../Utils/load';
import CupsModal from '../Components/CupsModal/index';
import { removeFromLocalStorage } from '../../helpers/storageManagement';

import { CurrentHourToCard, CurrentDateFormat, DateFormatAmerican } from '../../helpers/dateFormat';
import { StyleSheet, Text, View, Image, Dimensions, ScrollView, Pressable, Animated } from 'react-native';

import {
  AdMobBanner,
} from 'expo-ads-admob';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

import {
  MenuContext,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider
} from 'react-native-popup-menu';


import Utils from '../../Utils/utils.json';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: 'transparent',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(253, 208, 44, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.6,
  useShadowColorFromDataset: false // optional
};

var Motion = require("react-native-motion");
let ScreenHeight = Dimensions.get("window").height;

export default function Home() {
  const [data, setData] = useState([1]);
  const [currentML, setCurrentML] = useState(300);
  const [updateML, setUpdateML] = useState(300);
  const [modalVisible, setModalVisible] = useState(false);
  const [quantityOfCups, setQuantityOfCups] = useState([{ radiusColor: 'white', hour: CurrentHourToCard(), cardDate: CurrentDateFormat(), messageToDrink: "Não Esquece", ml: 300, radiusPercentage: 0.1, default: true }])
  const opacity = useState(new Animated.Value(0))[0];
  const [currentIndex, setCurrentIndex] = useState(-1);


  useEffect(() => {
    setQuantityOfCups(quantityOfCups.filter(e => {
      if (e.default == false || e.default == undefined) {
        return e;
      }
    }));

    getInfo('drinks').then(e => {
      if (e != null) {
        setQuantityOfCups(e)
      }
    });

  }, [])

  useEffect(() => {
    saveinfo('drinks', quantityOfCups);
    var ringPercentage = 0;
    quantityOfCups.map(e => {
      ringPercentage += e.ml/10000;
    });
    if(ringPercentage > 1){
      let ringPercentageString = ringPercentage.toString();
      let array = ringPercentageString.split('.');
      ringPercentage = Number.parseFloat("0."+array[1]);

    }
    setData([ringPercentage])
  }, [quantityOfCups, updateML])


  useEffect(() => {
    if (updateML != -1) {
      if (currentIndex == -1) {
        setCurrentML(updateML);
      } else {
        setQuantityOfCups(quantityOfCups.filter((e, i) => {
          if (i == currentIndex) {
            e.ml = updateML;
            return e;
          } else {
            return e;
          }
        }));
        setCurrentIndex(-1);
      }

      setUpdateML(-1);
    }
  }, [updateML])



  function addML(quantity: number) {
    let afterQuantity = data[0] + quantity;
    if (afterQuantity > 1) {
      afterQuantity = afterQuantity - 1;
      //setData([afterQuantity])
    } else {
      //setData([data[0] + quantity])
    }
    if (quantityOfCups.length > 0) {
      quantityOfCups.map(e => {
        if (e.radiusColor != undefined) {
          return e.radiusColor = '#797979';
        }
      })
    }


    setQuantityOfCups([{ radiusColor: 'green', hour: CurrentHourToCard(), cardDate: CurrentDateFormat(), messageToDrink: "Não Esquece", ml: currentML, radiusPercentage: quantity, default: false }, ...quantityOfCups])


  }
  function addCard(info: any, index: number) {
    return (
      <View style={styles.cardBody} key={index}>
        {index == 0 ?
          <Entypo name="cup" size={28} color="green" />
          :
          <Entypo name="cup" size={28} color="#c95757" />
        }
        <View>
          <Text style={styles.textoCard}>{info.hour}</Text>
          <Text style={styles.subTextoCard}>{info.ml}ML</Text>
        </View>
        <Pressable onPress={() => console.log('oi')}>
          <View>
            <Menu>
              <MenuTrigger>
                <AntDesign name="ellipsis1" size={24} color="gray" />
              </MenuTrigger>

              <MenuOptions>
                <MenuOption onSelect={() => setQuantityOfCups(quantityOfCups.filter((e, i) => {
                  if (index != i) {
                    return e;
                  }
                }))} text="Delete" />
                <MenuOption onSelect={() => { setCurrentIndex(index); setModalVisible(true) }} text="Edit" />
              </MenuOptions>
            </Menu>
          </View>
        </Pressable>
      </View>);
  }

  function checkIfItsEmptyOfCards() {

    if (quantityOfCups.length > 0) {
      return quantityOfCups.map((e, index) => {
        return addCard(e, index);
      });
    }
    return (
      <Text style={{ textAlign: 'center', width: '100%', fontSize: 20, marginTop: 20, fontWeight: 'bold', color: 'white' }}>Está sóbrio? que pena</Text>
    );
  }


  return (
    <>

      <ScrollView>
        <CupsModal modalVisible={modalVisible} setModalVisible={setModalVisible} setUpdateML={setUpdateML} updateML={updateML} />
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <View style={styles.talkBallonBody}>
              <Text style={styles.phraseMotivational}>Bebeu? Hora de gastar a onda</Text>
            </View>
          </View>
          <View style={styles.middleContainer}>
            <Pressable onPress={() => setModalVisible(true)} style={styles.openModal}>
              <Ionicons name="arrow-redo-sharp" size={40} color="#6b6b6b" />
              <Text>ALT ML</Text>
            </Pressable>
            <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ProgressChart
                data={data}
                width={screenWidth}
                height={300}
                strokeWidth={10}
                radius={90}
                chartConfig={chartConfig}
                hideLegend={true}
                style={{ position: 'absolute', transform: [{ rotate: "180deg" }] }}
              />
              <View style={styles.middleCircle}>
                <Image source={require('../../Images/glasses/default_beer.png')} style={{ width: '40%', height: '40%', resizeMode: 'contain' }} />
                <Text style={styles.textoML}>{currentML}ML</Text>
              </View>
            </View>
            <Pressable style={styles.addCupToCount} onPress={() => { addML(currentML / 10000) }}>
              <Ionicons name="water" size={32} color="#fde86d" />
              <Text>DRINK</Text>
            </Pressable>
          </View>
          <View style={styles.bottomContainer}>
            {checkIfItsEmptyOfCards()}
          </View>
          <View style={{ height: 100 }} />
        </View>
      </ScrollView>
      <View style={{ height: 'auto', width: '100%', display: 'flex', alignItems: 'center', position: 'absolute', bottom: 0 }}>
        <View style={styles.announcementContainer}>
          <AdMobBanner
            bannerSize="banner"
            adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
            servePersonalizedAds // true or false
            onDidFailToReceiveAdWithError={() => console.log("Erro")} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    minHeight: ScreenHeight,
    display: 'flex',
    justifyContent: 'space-between'

  },
  topContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25
  },
  middleContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 50,
    flexDirection: 'row',

  },
  openModal: {
    backgroundColor: 'white',
    width: 70,
    height: 70,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    elevation: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1
  },
  addCupToCount: {
    backgroundColor: 'white',
    width: 70,
    height: 70,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5
  },
  middleCircle: {
    backgroundColor: Utils.main_color,
    height: 170,
    width: 170,
    borderRadius: 200 / 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  bellowMiddleCircle: {
    marginTop: '4%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  bottomContainer: {
    display: 'flex',
    height: 'auto',
    width: '90%',
    backgroundColor: Utils.border_bottom_cards,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardBody: {
    height: 70,
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: '#eeeeee',
    borderBottomWidth: 1,

  },
  announcementContainer: {
    padding: 5,
    flex: 1,
  },
  talkBallonBody: {
    width: '90%',
    height: 'auto',
    backgroundColor: Utils.border_bottom_cards,
    borderStyle: 'solid',
    justifyContent: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginBottom: 50
  },
  talkArrowTriangle: {
    display: 'flex',
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 40,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: Utils.talk_bubble_color,
    transform: [{ rotate: "180deg" }],
  },
  phraseMotivational: {
    textAlign: 'center',
    padding: 20,
    color: '#797979',
    fontWeight: 'bold',
    fontSize: 17
  },
  textoML: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 17,
    color: 'white',
    padding: 0,
  },
  textoCard: {
    textAlign: 'center',
    fontSize: 20,
    color: '#797979',
    padding: 0,
  },
  subTextoCard: {
    textAlign: 'center',
    fontSize: 13,
    color: '#797979',
    padding: 0,
  },
  textoPlus: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 35,
    color: 'green',
    padding: 0,
  },
  textoMinus: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 45,
    color: 'red',
    padding: 0,
  }

});
