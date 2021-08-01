import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ScrollView} from 'react-native';
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

  const data = {
    data: [0.5]
  };
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
          <View style={styles.bellowMiddleCircle}>
            <Text style={styles.textoML}>300ML</Text>
            <Text style={styles.textoPlus}>+</Text>
          </View>
        </View>
      </View>
      <View style={styles.bottomContainer}>
      <ScrollView style={{ flex: 1}}>
        <View style={styles.cardBody}>
          <View style={{width:10, height:10, backgroundColor:'white', borderRadius:10/2}}></View>
          <View>
            <Text style={styles.textoCard}>18:20Hrs</Text>
            <Text style={styles.subTextoCard}>Não Esquece</Text>
          </View>
          <View>
          <Text style={{fontSize:20, color:'#716f6f'}}>300ML</Text>
          </View>
        </View>
        <View style={styles.cardBody}>
          <View style={{width:10, height:10, backgroundColor:'white', borderRadius:10/2}}></View>
          <View>
            <Text style={styles.textoCard}>18:20Hrs</Text>
            <Text style={styles.subTextoCard}>Não Esquece</Text>
          </View>
          <View>
          <Text style={{fontSize:20, color:'#716f6f'}}>300ML</Text>
          </View>
        </View>
    
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
