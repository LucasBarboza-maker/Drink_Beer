
import React, { useState, FC } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

interface Props {
    modalVisible: any,
    setModalVisible: any,
    setUpdateML:any,
    updateML:any
}

const CupsModal: FC<Props> = ({ modalVisible, setModalVisible, setUpdateML, updateML }) => {

    function updateMlInfo(ml:any){

        setUpdateML(ml); 
        setModalVisible(!modalVisible);

    }
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>

                <View style={styles.modalView}>
                    <View style={styles.closeButton}>
                        <AntDesign name="closecircle" size={24} color="#3b3b3b" onPress={() => setModalVisible(!modalVisible)} />
                    </View>
                    <Text style={styles.modalText}>Escolha a Medida Aproximada</Text>
                    <View style={styles.cupsRadiusWrapper}>
                        <View>
                            <Pressable onPress={() => updateMlInfo(200)} style={styles.radiusButton}>
                                <MaterialCommunityIcons name="beer" size={38} color="#3b3b3b" />
                                <Text style={{ textAlign: 'center' }}>200ml</Text>
                            </Pressable>
                        </View>
                        <View>
                            <Pressable onPress={() => updateMlInfo(300)} style={styles.radiusButton}>
                                <MaterialCommunityIcons name="glass-mug" size={40} color="#3b3b3b" />
                                <Text style={{ textAlign: 'center' }}>300ml</Text>
                            </Pressable>
                        </View>
                        <View>
                            <Pressable onPress={() => updateMlInfo(500)} style={styles.radiusButton}>
                                <MaterialCommunityIcons name="glass-mug-variant" size={40} color="#3b3b3b" />
                                <Text style={{ textAlign: 'center' }}>500ml</Text>
                            </Pressable>

                        </View>
                        <View>
                            <Pressable onPress={() => updateMlInfo(1000)} style={styles.radiusButton}>
                                <FontAwesome5 name="beer" size={40} color="#3b3b3b" />
                                <Text style={{ textAlign: 'center' }}>1lt</Text>
                            </Pressable>
                        </View>
                    </View>

                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '90%'
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 20
    },
    cupsRadiusWrapper: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    radiusButton: {
        height: 80,
        width: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    closeButton:{
        position: 'absolute',
        top: 10,
        right: 20
    }
});

export default CupsModal;