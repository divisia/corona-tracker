import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

i18n.translations = {
    en:{
        appHeader:"Track COVID-19",
        region:"Region",
        casesDeaths:"Deaths",
        casesInfections:"Infections",
        casesRecoveries:"Recoveries",
        selfReportOffer:"Would you like to help us tracing COVID-19?",
        selfReportButton:"Sure",


        dashboard:"Dashboard",
        map:"Map",
        news:"News",
        covid19:"COVID-19",
        alarms:"Alarms",

        sympHigh:"Symptomatic - High Risk",
        sympMedium:"Symptomatic - Medium Risk",
        sympLow:"Symptomatic - Low Risk",
        asympMedium:"Asymptomatic - Medium Risk",
        asympLow:"Asymptomatic - Low Risk",

        cn:"Switzerland",


        selfReport:"Self reported",
        dataSource:"Data source",
        visitedCountriesQuestion:"Which countries have you been in last 2 months?",
        visitedCountriesInitialText:"Click to select",
        countriesSelected:"countries selected"
    },
    de:{
        appHeader:"Track COVID-19",
        reportedSymptomaticPositive:"Berichtet Symptomatisch - Negativ getestet",
        reportedSymptomaticNegative:"Berichtet Symptomatisch - Positiv getestet",
        selfReportOffer:"Möchten Sie uns helfen, COVID-19 aufzuspüren?",
        selfReportButton:"Klar",

        casesDeaths:"Verstorben",
        casesInfections:"Infektionen",
        casesRecoveries:"Geheilt",

        sympHigh:"Symptomatisch – Hohes Risiko",
        sympMedium:"Symptomatisch – Mittleres Risiko",
        sympLow:"Symptomatisch – Niedriges Risiko",
        asympMedium:"Asymptomatisch – Mittleres Risiko",
        asympLow:"Asymptomatisch – Niedriges Risiko",

        dashboard:"Dashboard",
        alarms:"Alarme",

        region:"Region",

        cn:"Schweiz",
        valais:"Valais"
    }
}
i18n.locale = "de-DE"
i18n.fallbacks = true;