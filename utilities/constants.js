const countries = require("i18n-iso-countries");
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
countries.registerLocale(require("i18n-iso-countries/langs/fr.json"));
countries.registerLocale(require("i18n-iso-countries/langs/de.json"));
countries.registerLocale(require("i18n-iso-countries/langs/tr.json"));

export const storageUri = "https://firebasestorage.googleapis.com/v0/b/corona-tracker-app.appspot.com/o/"
export const storageSep = "%2F"
export const getMediaUri = (uri) => { return storageUri + uri.replace("/", storageSep) + "?alt=media" ; }


export const countryCodes = Object.keys(countries.getAlpha2Codes());