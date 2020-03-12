



export const storageUri = "https://firebasestorage.googleapis.com/v0/b/corona-tracker-app.appspot.com/o/"
export const storageSep = "%2F"
export const getMediaUri = (uri) => { return storageUri + uri.replace("/", storageSep) + "?alt=media" ; }