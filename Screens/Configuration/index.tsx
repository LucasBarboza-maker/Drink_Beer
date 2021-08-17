import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Utils from '../../Utils/utils.json';
import { StyleSheet, Text, View, ScrollView, Pressable} from 'react-native';

function card(texto: string){
  return(
  <Pressable style={styles.cardBody} onPress={() => {console.log('oi')}}>
            <Text style={{fontSize:18, padding:5, color:'black'}}>{texto}</Text>
  </Pressable>);
}

function cardTitle(text: string) {
  return(
  <View style={styles.configTitle}>
    <Text style={{fontSize:18, padding:8, color:'gray', paddingBottom:15, paddingTop:15, fontWeight: 'bold', borderBottomColor: Utils.border_bottom_cards,borderBottomWidth: 1  }}>{text}</Text>
  </View>);
}

export default function Home() {
  return (
    <View style={styles.container}>
       <ScrollView style={{width:'100%'}}>
          {cardTitle('Geral')}
          {card('Idioma')}
          {card('Compartilhar')}
          {card('Parar comentários')}
          {card('Comentários')}
          {cardTitle('Lembrete')}
          {card('Horários do lembrete')}
          {card('Som do lembrete')}
          {card('Remover Anuncios')}
        </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  configTitle: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
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
    flexDirection:'row',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: Utils.border_bottom_cards,
    borderBottomWidth: 1    
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

