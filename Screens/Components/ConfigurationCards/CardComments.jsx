import React from 'react';
import { useState } from 'react';
import Utils from '../../../Utils/utils.json';
import { StyleSheet, Text, View, ScrollView, Pressable, Modal, Alert} from 'react-native';

const CardComments = props => {

    const [openModal, setOpenModal] = useState(false);
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
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <Pressable
                style={[styles.buttonModal, styles.buttonClose]}
                onPress={() => {setOpenModal(!openModal);}}
              >
                <Text style={styles.textStyle}>Compartilhar Modal</Text>
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
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });

  export default CardComments;