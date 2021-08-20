import React from 'react';
import { useState } from 'react';
import Utils from '../../../Utils/utils.json';
import { StyleSheet, Text, View, ScrollView, Pressable, Modal, Alert} from 'react-native';

const CardReminderHours = props => {

    const [hours, setHours] = useState([{key:1, hour:"19:30hrs"}, {key:2, hour:"20:00hrs"}])
    const [openModal, setOpenModal] = useState(false);

    function hoursJSX(hourObject, index){
      return(
        <Pressable
          key={hourObject.key}
          style={[styles.buttonModal, styles.buttonClose]}
          onPress={() => {setOpenModal(!openModal);}}
        >
          <Text style={styles.textStyle}>Horário{index+1}</Text>
          <Text style={styles.textStyle}>{hourObject.hour}</Text>
        </Pressable>
        );
      }
    return(
      <Pressable style={styles.cardBody} onPress={() => {setOpenModal(!openModal);}}>
              <Text style={{fontSize:18, padding:5, color:'black'}}>Horário dos Lembretes</Text>
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
              <Text style={styles.modalText}>Horários dos Lembretes</Text>
              {hours.map((e, index) => {
                return hoursJSX(e, index);
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
      backgroundColor: "white",
      padding: 10,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },
    buttonModal: {
      marginTop:7,
      padding: 15,
      elevation: 2,
      display:'flex',
      justifyContent: 'space-between',
      width: '100%',
      flexDirection: 'row'
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
  export default CardReminderHours;