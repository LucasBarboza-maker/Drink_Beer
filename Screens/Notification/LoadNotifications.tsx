import React from 'react';
import * as Notification from 'expo-notifications';

function LoadNotifications(){
    console.log("Notificado");
    Notification.scheduleNotificationAsync({
        content:{
          title:"Local Notification",
          body:"This is my local notification",
        },
        trigger:{ 
          seconds:10,
        },
      })
}

export default LoadNotifications;