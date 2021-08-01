import React, { useState, useEffect } from 'react';
import {StatusBar as ExpoStatusBar} from 'expo-status-bar';
import { Button, Platform, StatusBar, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Utils from './Utils/utils.json';
import Home from './Screens/Home';
import Statistics from './Screens/Statistics';
import Settings from './Screens/Configuration';

const STYLES = ['default', 'dark-content', 'light-content'];
const TRANSITIONS = ['fade', 'slide', 'none'];
const Tab = createMaterialTopTabNavigator();

const App = () => {
  
  useEffect(() => {
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ height: StatusBar.currentHeight, backgroundColor:Utils.main_color }}>
        <ExpoStatusBar style="light" backgroundColor={Utils.main_color}/>
        <StatusBar></StatusBar>
      </View>
      <NavigationContainer>
        <Tab.Navigator tabBarOptions={{
          activeTintColor: Utils.font_tab_color_active,
          inactiveTintColor:Utils.font_tab_color_inactive,
          style: {backgroundColor:Utils.tabbar_background_color},
          pressColor:'red',
          indicatorStyle: {
            borderBottomColor:Utils.main_color,
            borderBottomWidth:3
          }
        }}>
        <Tab.Screen name="Home" component={Home} options={{ title: 'Home'}}></Tab.Screen>
        <Tab.Screen name="Statistics" component={Statistics} options={{ title: 'Statistics' }} />
        <Tab.Screen name="Settings" component={Settings}  options={{ title: 'Settings' }} />
      </Tab.Navigator>
    </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ECF0F1'
  },
  buttonsContainer: {
    padding: 10
  },
  textStyle: {
    textAlign: 'center',
    marginBottom: 8
  }
});

export default App;