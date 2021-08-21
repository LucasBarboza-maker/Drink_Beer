import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function getInfo(name: string){    
        try {
          const jsonValue = await AsyncStorage.getItem(name)
          return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch(e) {
          // error reading value
        }      
}

export default getInfo;