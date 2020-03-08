import firebase from "firebase";
import "@firebase/firestore";


const config = {
    apiKey:"AIzaSyCx-v48R2T0yWQcrcOhvSrfCrUg5b1tw0k",
    projectId:"corona-tracker-app"
}


firebase.initializeApp(config);
const firestore = firebase.firestore();

export default firestore;