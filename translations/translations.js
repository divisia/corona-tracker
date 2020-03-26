import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import { AsyncStorage } from 'react-native';

i18n.translations = {
    en: {
        appHeader: "Track COVID-19",
        region: "Region",
        casesDeaths: "Deaths",
        casesInfections: "Infections",
        casesRecoveries: "Recoveries",
        selfReportOffer: "Would you like to help us tracing COVID-19?",
        selfReportButton: "Sure",
        selfReport:"Reports",

        yes:"Yes",
        no:"No",
        dontKnow:"Don't know",
        didPotantialContact:"Did you have contact with a potantial corona virus infected person?",
        visitedCountriesQuestion: "Which countries have you been in last 2 months?",
        visitedCountriesInitialText: "Click to select",
        countriesSelected: "countries selected",
        reportForm:"Report form",
        positive:"Positive",
        negative:"Negative",
        notTested:"Not tested",
        whatIsTestResult:"What is your test result?",
        isHavingSymptoms:"Are you having symptoms?",
        potantialInfectInfo:"Persons with symptoms or persons you know were travelling a COVID-19 affected area",

        covid19Symptoms:"Symptoms",
        covid19Avoid:"How can I avoid getting infected?",
        fever:"Fever",
        soreThroat:"Sore throat",
        breathShortness:"Shortness of breath",
        cough:"Cough",
        headache:"Headache",
        world:"World",

        socialDistance:"Avoid contact with others",
        stayHome:"Stay at home",
        washHands:"Wash hands with water and soap/sanitizer at least 20 seconds",
        dontTouchFace:"Don't eyes, nose or mouth with unwashed hands",
        seekMedicalCare:"If you become sick seek medical care immediately",

        dashboard: "Dashboard",
        map: "Map",
        news: "News",
        covid19: "COVID-19",
        alarms: "Alarms",
        countries:"Countries",

        sympHigh: "Symptomatic - High Risk",
        sympMedium: "Symptomatic - Medium Risk",
        sympLow: "Symptomatic - Low Risk",
        asympMedium: "Asymptomatic - Medium Risk",
        asympLow: "Asymptomatic - Low Risk",
        highRisk:"High Risk",
        mediumRisk:"Medium Risk",
        lowRisk:"Low Risk",

        lastUpdate:"Last update",
        goBack:"Go back",

        dataSource: "Data source",
        
        selfReportInfo: "No personal data is collected. Based on the anonymous responses from the users, risky areas can be evaluated.",

        sympHighInfo: "Cases not tested yet, that show possible signs of having the Covid-19 virus who declare to having had  contact with potential corona virus infected person or being traveled to a Covid-19 affected area.",
        sympMediumInfo: "Cases not tested yet, that show possible signs of having the Covid-19 virus who don't know if having had  contact with potential corona virus infected person and not being traveled to a Covid-19 affected area.",
        sympLowInfo: "Cases not tested yet, that show possible signs of having the Covid-19 virus who declare having not had  contact with potential corona virus infected person or being traveled to a Covid-19 affected area.",
        asympMediumInfo: "Cases who do not exhibit signs of the Covid-19 virus but declare being traveled to a Covid-19 affected area or having had  contact with potential corona virus infected person.",
        asympLowInfo: "Cases who do not exhibit signs of the Covid-19 virus and declare not being traveled to a Covid-19 affected area and don't know if having had  contact with potential corona virus infected person.",

    },
    de: {
        selfReport:"Reports",
        appHeader: "Track COVID-19",
        reportedSymptomaticPositive: "Berichtet Symptomatisch - Negativ getestet",
        reportedSymptomaticNegative: "Berichtet Symptomatisch - Positiv getestet",
        selfReportOffer: "Möchten Sie uns helfen, COVID-19 aufzuspüren?",
        selfReportButton: "Klar",
        world:"Welt",

        covid19Symptoms:"Symptome",
        covid19Avoid:"Wie kann ich mich vor einer Ansteckung schützen?",
        fever:"Fieber",
        soreThroat:"Halsentzündung",
        breathShortness:"Atem not",
        cough:"Husten",
        headache:"Kopfschmerzen",

        yes:"Ja",
        no:"Nein",
        dontKnow:"Weiss nicht",
        didPotantialContact:"Hatten Sie Kontakt zu einer Person, die potentiel mit dem Coronavirus infiziert sein könnte?",
        visitedCountriesQuestion: "Welche Länder haben Sie in den letzen 2 Monaten bereist?",
        visitedCountriesInitialText: "Auswählen",
        countriesSelected: "ausgewählt",
        reportForm:"Report von",
        positive:"Positiv",
        negative:"Negativ",
        notTested:"Nicht getested",
        whatIsTestResult:"Was ist Ihr Testergebnis?",
        isHavingSymptoms:"Haben Sie Symptome?",
        potantialInfectInfo:"Personen mit Symptomen oder Personen, die in ein mit Covid-19 betroffenes Gebiet gereist sind.",

        
        dataSource:"Datenquelle",

        socialDistance:"Soziale Distanz",
        stayHome:"Bleiben Sie zuhause",
        washHands:"Hände regelmässig waschen",
        dontTouchFace:"Nicht ins Gesicht fassen.",
        seekMedicalCare:"Wenn Sie sich krank fühlen kontaktieren Sie Ihren Hausarzt",
        
        casesDeaths: "Verstorben",
        casesInfections: "Infektionen",
        casesRecoveries: "Geheilt",

        sympHigh: "Symptomatisch – Hohes Risiko",
        sympMedium: "Symptomatisch – Mittleres Risiko",
        sympLow: "Symptomatisch – Niedriges Risiko",
        asympMedium: "Asymptomatisch – Mittleres Risiko",
        asympLow: "Asymptomatisch – Niedriges Risiko",

        highRisk:"Hohes Risiko",
        mediumRisk:"Mittleres Risiko",
        lowRisk:"Niedriges Risiko",

        dashboard: "Dashboard",
        alarms: "Alarme",

        region: "Region",
        countries:"Länder",

        cn: "Schweiz",

        selfReportInfo: "Es werden keine personenbezogenen Daten erfasst. Basierend auf den anonymen Antworten der User können risikobehaftete Gebiete evaluiert werden.",

        sympHighInfo: "Noch nicht getestete Fälle, die mögliche Anzeichen für das Covid-19-Virus aufweisen, die angeben, Kontakt mit einer potenziell mit dem Corona-Virus infizierten Person gehabt zu haben oder in ein von Covid-19 betroffenes Gebiet gereist zu sein.",
        sympMediumInfo: "Noch nicht getestete Fälle, die mögliche Anzeichen für das Covid-19-Virus zeigen, die nicht wissen, ob sie Kontakt mit einer potenziellen mit dem Corona-Virus infizierten Person hatten und nicht in ein von Covid-19 betroffenes Gebiet gereist sind.",
        sympLowInfo: "Noch nicht getestete Fälle, die mögliche Anzeichen für das Covid-19-Virus aufweisen, die angeben, keinen Kontakt mit einer potenziellen mit dem Corona-Virus infizierten Person gehabt zu haben oder in ein von Covid-19 betroffenes Gebiet gereist zu sein.",
        asympMediumInfo: "Fälle, die keine Anzeichen des Covid-19-Virus aufweisen, jedoch erklären, in ein von Covid-19 betroffenes Gebiet gereist zu sein oder Kontakt mit einer potenziell mit dem Corona-Virus infizierten Person gehabt zu haben.",
        asympLowInfo: "Fälle, die keine Anzeichen des Covid-19-Virus aufweisen und erklären, nicht in ein von Covid-19 betroffenes Gebiet gereist zu sein, und nicht wissen, ob sie Kontakt mit einer potenziellen mit dem Corona-Virus infizierten Person hatten.",
    }
}
AsyncStorage.getItem("language").then((lang)=>{
    console.log("Previous language", lang);
    if (lang) i18n.locale = lang;
})
i18n.fallbacks = true;