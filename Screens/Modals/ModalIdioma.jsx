import { StyleSheet, Text, View, ScrollView, Pressable, Modal, Alert} from 'react-native';

export default function ModalIdioma() {
    return(<Modal
    animationType="slide"
    transparent={true}
    visible={ActiveModal}
    onRequestClose={() => {
      Alert.alert("Modal has been closed.");
    }}
  >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>Hello World!</Text>
        <Pressable
          style={[styles.buttonModal, styles.buttonClose]}
        >
          <Text style={styles.textStyle}>Hide Modal</Text>
        </Pressable>
      </View>
    </View>
  </Modal>);
  }