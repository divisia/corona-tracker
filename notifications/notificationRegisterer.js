import { Notifications } from 'expo';
import firestore from '../components/Firestore';
import { AsyncStorage } from 'react-native';

export const notifications = [];
let ids = [];
let sent_ids = null;
export let loading = true;

const setNotificationAsSent = (nft) => {
    notifications.push(nft)
    AsyncStorage.setItem("sentNotifications", notifications);
}

const showNotification = (nft) => {
    try {
        Notifications.presentLocalNotificationAsync(nft);
    } catch (e) {
        console.log("ERR while notification", e)
    }
}

AsyncStorage.getItem("sentNotifications").then((sent)=>{
    if (sent) sent_ids = sent;
    firestore.collection("push").onSnapshot((list)=>{
        list.forEach((nft)=>{
            const data = nft.data();
            if (!ids.includes(nft.id)){ showNotification(data) }
            setNotificationAsSent(data);
            ids.push(nft.id);
        })
    })
    loading = false;
})