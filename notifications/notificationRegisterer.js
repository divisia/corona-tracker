import { Notifications } from 'expo';
import firestore from '../components/Firestore';
import { AsyncStorage } from 'react-native';

export const notifications = [];
let ids = [];
let sent_ids = [];
export let loading = true;

const showNotification = (nft) => {
    try {
        Notifications.presentLocalNotificationAsync(nft);
    } catch (e) {
        console.log("ERR while notification", e)
    }
}

AsyncStorage.getItem("sentNotifications").then((sent) => {
    console.log("sent", sent)
    if (sent) sent_ids = JSON.parse(sent).map(nft=>{return nft.id});
    console.log("SENT IDS", sent_ids)
    firestore.collection("push").onSnapshot((list) => {
        list.forEach((nft) => {
            const data = nft.data();
            if (!sent_ids.includes(data.id)) { showNotification(data) }
            notifications.push(data)
            ids.push(nft.id);
        })
        loading = false;
        AsyncStorage.setItem("sentNotifications", JSON.stringify(notifications));
    })

})