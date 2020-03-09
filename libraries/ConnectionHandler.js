

const checkInternetConnection = () => {
    return navigator.onLine;
}

const checkGoogleMapsAvailable = () => {
    return typeof google !== 'undefined';
}

const checkFirestoreOnline = () => {
    return null;
}

