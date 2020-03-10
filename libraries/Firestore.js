import firebase from "firebase";
import "@firebase/firestore";
global.Buffer = global.Buffer || require('buffer').Buffer;

if (typeof btoa === 'undefined') {
  global.btoa = function (str) {
    return new Buffer(str, 'binary').toString('base64');
  };
}

if (typeof atob === 'undefined') {
  global.atob = function (b64Encoded) {
    return new Buffer(b64Encoded, 'base64').toString('binary');
  };
}

const config = {
  apiKey: "AIzaSyCx-v48R2T0yWQcrcOhvSrfCrUg5b1tw0k",
  projectId: "corona-tracker-app"
}


firebase.initializeApp(config);
const firestore = firebase.firestore();

const callbacks = {};
callbacks.feed = [];
callbacks.reported = [];
callbacks.confirmed = [];

const ref = {};
ref.feeds = firestore.collection("newsfeed").doc("overall");
ref.reported = firestore.collection("reported").doc("overall");
ref.confirmed = firestore.collection("confirmed").doc("overall");

export { ref, callbacks };

ref.reported.onSnapshot((snapshot) => {
  callbacks.reported.forEach((callback) => { callback(snapshot) })
})

export default firestore;