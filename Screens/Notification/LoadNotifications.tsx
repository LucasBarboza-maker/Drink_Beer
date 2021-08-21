import React from 'react';
import * as Notification from 'expo-notifications';
import Notifications from '../GlobalInfos/Notifications.json';

function LoadNotifications(){
    Notification.cancelAllScheduledNotificationsAsync();
    Notifications.map((e) =>{
        Notification.scheduleNotificationAsync({
            content:{
              title:"Local Notification",
              body:"This is my local notification",
            },
            trigger:{ 
              hour: e.h,
              minute:e.m,
              repeats:true
            },
          })
    })
   
}

export default LoadNotifications;