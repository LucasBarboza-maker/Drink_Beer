import React from 'react';
import { useState } from 'react';
import Utils from '../../../Utils/utils.json';
import { StyleSheet, Text, View, ScrollView, Pressable, Modal, Alert} from 'react-native';

const CardComments = props => {

    const [messages, setMessages] = useState([{key:1,comment:"Beba o suficiente para se arrepender"}, {key:2, comment:"Beber é melhor quando você não lembra que bebeu"}])
    const [openModal, setOpenModal] = useState(false);

    function messagesJSX(textObject){
      return(
        <Pressable
        key={textObject.key}
        style={[styles.buttonModal, styles.buttonClose]}
        onPress={() => {setOpenModal(!openModal);}}
      >
        <Text style={styles.textStyle}>{textObject.comment}</Text>
      </Pressable>
      );
    }

    return(
      <Pressable style={styles.cardBody} onPress={() => {setOpenModal(!openModal);}}>
              <Text style={{fontSize:18, padding:5, color:'black'}}>Comentarios</Text>
          <Modal
          animationType="slide"
          transparent={false}
          visible={openModal}
          onRequestClose={() => {
            setOpenModal(false);
          }}
        >
            <View style={styles.centeredView}>
            <View>
              <Text style={styles.modalText}>Comentários</Text>
              {messages.map((e) => {
                return messagesJSX(e);
              })}
            </View>
          </View>
        </Modal>
      </Pressable>);
  }
  const styles = StyleSheet.create({
    cardBody:{
      height:60,
      width:'100%',
      flexDirection:'row',
      alignItems: 'center',
      padding: 10, 
    },  
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    buttonModal: {
      marginTop:7,
      padding: 15,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "white",
    },
    textStyle: {
      fontSize:16,
      color: "black",
      textAlign: "center"
    },
    modalText: {
      marginTop:10,
      fontSize:25,
      marginBottom: 15,
      textAlign: "center"
    }
  });
  export default CardComments;