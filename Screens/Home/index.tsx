import React from 'react';
import {useState, useEffect} from 'react';
import saveinfo from '../../Utils/save';
import getInfo from '../../Utils/load';
import { StyleSheet, Text, View, Image, Dimensions, ScrollView, Pressable} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import Utils from '../../Utils/utils.json';

var oi = 1;
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

export default function Home() {
  
  const [data, setData] = useState([1]);
  const [quantityOfCups, setQuantityOfCups] = useState([{radiusColor:'white',hour:currentDateFormatToCard(), messageToDrink:"Não Esquece", ml:"300ml", radiusPercentage:0.1, default:true}])

  useEffect(() => {
    setQuantityOfCups(quantityOfCups.filter(e => {
      if(e.default==false || e.default == undefined){
        return e;
      }
    }));

    getInfo('cups6'+currentDateFormat()).then(e => {
      if(e != null){
        setQuantityOfCups(e)
      }
    });
    
    
  }, [])

  useEffect(() => {
    saveinfo('cups6'+currentDateFormat(),quantityOfCups);
    var ringPercentage = 0;
    quantityOfCups.map(e => {
      ringPercentage += e.radiusPercentage;
    });
    setData([ringPercentage])
  }, [quantityOfCups])

  function currentDateFormatToCard(){
    let date = new Date();
    let formattedDate = "";
    if(date.getMinutes() <= 9){
      formattedDate = date.getHours()+":0"+date.getMinutes()+"Hrs";
      return formattedDate;
    }
    formattedDate = date.getHours()+":"+date.getMinutes()+"Hrs";
    return formattedDate;
  }

  function currentDateFormat(){
    let date = new Date();
    let formattedDate = "";
    formattedDate = date.getDate()+""+date.getMonth()+""+date.getFullYear();

    return formattedDate;
  }

  function addML(quantity: number){
    let afterQuantity = data[0] + quantity;
    if(afterQuantity > 1 ){
      afterQuantity = afterQuantity-1;
      setData([afterQuantity])
    }else{
      setData([data[0]+quantity])
    }
    if(quantityOfCups.length > 0){
      quantityOfCups.map(e => {
        if(e.radiusColor != undefined){
          return e.radiusColor = 'white';
        }
      })
    }
   
    setQuantityOfCups([{radiusColor:'green',hour:currentDateFormatToCard(), messageToDrink:"Não Esquece", ml:"300ml", radiusPercentage:quantity, default:false},...quantityOfCups])
    

  }

  function addCard(info: any, index: number){
    return(<View style={styles.cardBody}  key={index}>
            <View style={{width:10, height:10, backgroundColor:info.radiusColor, borderRadius:10/2}}></View>
            <View>
              <Text style={styles.textoCard}>{info.hour}</Text>
              <Text style={styles.subTextoCard}>{info.messageToDrink}</Text>
            </View>
            <View>
            <Text style={{fontSize:20, color:'#716f6f'}}>{info.ml}</Text>
            </View>
          </View>);
  }

  function checkIfItsEmptyOfCards(){
     
    if(quantityOfCups.length > 0){
      quantityOfCups.map((e,index) => {
       return addCard(e, index);
      });
    } 
    return(
          <Text style={{textAlign: 'center', width:'100%', fontSize:20, marginTop:20}}>Está sóbrio? que pena</Text>
    );
    }
  

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        
          <View style={styles.talkBallonBody}>
            <Text style={styles.phraseMotivational}>Bebeu? Hora de gastar a onda</Text>
          </View>    
        
      </View>
      <View style={styles.middleContainer}>
              <ProgressChart
              data={data}
              width={screenWidth}
              height={300}
              strokeWidth={10}
              radius={120}
              chartConfig={chartConfig}
              hideLegend={true}
              style={{position: 'absolute', transform: [{ rotate: "180deg" }]}}
            />
        <View style={styles.middleCircle}>
          <Image source={require('../../Images/glasses/default_beer.png')} style={{width:'45%', height:'45%', resizeMode:'contain'}}/>
          <Pressable style={styles.bellowMiddleCircle} onPress={() => {addML(0.03)}}>
            <Text style={styles.textoML}>300ML</Text>
            <Text style={styles.textoPlus}>+</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.bottomContainer}>
      <ScrollView style={{ flex: 1}}>
        {checkIfItsEmptyOfCards()}
      </ScrollView>
      </View>
      <View style={styles.announcementContainer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding:5
  },
  topContainer: {
    height:'20%',
    width:'100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems:'center',
    
  },
  middleContainer:{
    height:'30%',
    width:'100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems:'center',
  
  },
  middleCircle:{
    backgroundColor:Utils.main_color,  
    height:230,
    width:230,
    borderRadius:250/2,  
    display: 'flex',
    alignItems:'center',
    justifyContent: 'center'
  },
  bellowMiddleCircle:{
    marginTop:'4%',
    backgroundColor:Utils.bellow_circle_color,  
    height:40,
    width:150,
    borderRadius:120/2,  
    display: 'flex',
    alignItems:'center',
    justifyContent: 'space-between',
    flexDirection:'row',
    padding:20
  },
  bottomContainer:{
    display:'flex',
    height:'30%',
    maxHeight:'30%',
    width:'90%',
    backgroundColor: Utils.card_background,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5
  },
  cardBody:{
    height:70,
    width:'100%',
    justifyContent: 'space-between',
    flexDirection:'row',
    alignItems: 'center',
    padding:10,
    borderBottomColor: Utils.border_bottom_cards,
    borderBottomWidth: 1,
    
  },
  announcementContainer:{
    height:'10%',
    width:'100%',
    backgroundColor: 'black',
  },
  talkBallonBody:{
    width:'90%',
    height: '90%',
    backgroundColor: Utils.talk_bubble_color,
    borderStyle:'solid',
    justifyContent: 'center',
    borderRadius:20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5
  },
  talkArrowTriangle: {
    display:'flex',
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
  phraseMotivational:{
    textAlign:'center',
    padding:20,
    color:'black',
    fontWeight:'bold',
    fontSize:17
  },
  textoML:{
    textAlign:'center',
    fontWeight:'bold',
    fontSize:17,
    color:'black',
    padding:0,
  },
  textoCard:{
    textAlign:'center',
    fontSize:25,
    color:'black',
    padding:0,
  },
  subTextoCard:{
    textAlign:'center',
    fontSize:15,
    color:'black',
    padding:0, 
  },
  textoPlus:{
    textAlign:'center',
    fontWeight:'bold',
    fontSize:35,
    color:'green',
    padding:0,
  }

});
