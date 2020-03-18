import { Notifications } from 'expo';
import firestore from '../components/Firestore';
import AsyncStorage from '@react-native-community/async-storage';

export let sentNotifications = [];
let sentNotificationsIds = [];

AsyncStorage.getItem("sentNotifications").then((val) => {
    val ? sentNotifications = val : null
    val ? val.forEach((v) => { sentNotificationsIds.push(v.id) }) : null
})

const fireNotification = (snapshot) => {
    const notification = {
        title: String(snapshot.title),
        body: String(snapshot.body),
    }
    try { Notifications.presentLocalNotificationAsync(notification); }
    catch (e) { }
}


firestore.collection("push").onSnapshot((notificationList) => {
    notificationList.forEach((notification) => {
        if (!isNotificationSent(notification.id)) {
            fireNotification(notification);
            setNotificationSent(notification);
        }
        sentNotifications.push(notification);
    })
})

const setNotificationSent = (no) => {
    sentNotificationsIds.push(no.id);
    sentNotifications.push(no);
    AsyncStorage.setItem("sentNotifications", sentNotifications);
}

const isNotificationSent = (id) => {
    if (sentNotificationsIds.includes(id)) { return true; }
    else { return false; }
}