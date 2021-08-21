import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function saveinfo(name: string, info: any){    
        try {
          const jsonValue = JSON.stringify(info)
          await AsyncStorage.setItem(name, jsonValue)
        } catch (e) {
          // saving error
        }
}

export default saveinfo;