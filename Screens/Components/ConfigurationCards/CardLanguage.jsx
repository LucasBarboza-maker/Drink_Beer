import React from 'react';
import { useState } from 'react';
import Utils from '../../../Utils/utils.json';
import { StyleSheet, Text, View, ScrollView, Pressable, Modal, Alert} from 'react-native';

const CardLanguage = props => {

    const [openModal, setOpenModal] = useState(false);
    return(
      <Pressable style={styles.cardBody} onPress={() => {setOpenModal(!openModal);}}>
              <Text style={{fontSize:18, padding:5, color:'black'}}>Idioma</Text>
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
              <Text style={styles.modalText}>Idiomas</Text>
              <Pressable
                style={[styles.buttonModal, styles.buttonClose]}
                onPress={() => {setOpenModal(!openModal);}}
              >
                <Text style={styles.textStyle}>Portugues</Text>
              </Pressable>
              <Pressable
                style={[styles.buttonModal, styles.buttonClose]}
                onPress={() => {setOpenModal(!openModal);}}
              >
                <Text style={styles.textStyle}>Inglês</Text>
              </Pressable>
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

  export default CardLanguage;