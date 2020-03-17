import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

i18n.translations = {
    en:{
        appHeader:"Track COVID-19",
        region:"Region",
        deaths:"Deaths",
        infections:"Infections",
        recoveries:"Recoveries",
        selfReportOffer:"Would you like to help us tracing COVID-19?",
        selfReportButton:"Sure",
        dashboard:"Dashboard",
        sympHigh:"Symptomatic - High Risk",
        sympMedium:"Symptomatic - Medium Risk",
        sympLow:"Symptomatic - Low Risk",
        asympMedium:"Asymptomatic - Medium Risk",
        asympLow:"Asymptomatic - Low Risk",
        cn:"Switzerland"
    },
    tr:{
        appHeader:"COVID-19 Takip",
        region:"Bölge",
        deaths:"Ölü",
        infections:"Enfekte",
        recoveries:"Bağışık",
        selfReportOffer:"COVID-19'u takip etmemize yardım etmek ister misiniz?",
        selfReportButton:"Olur"
    },
    de:{
        appHeader:"Verfolgen COVID-19",
        reportedSymptomaticPositive:"Berichtet Symptomatisch - Negativ getestet",
        reportedSymptomaticNegative:"Berichtet Symptomatisch - Positiv getestet",
        selfReportOffer:"Möchten Sie uns helfen, COVID-19 aufzuspüren?",
        selfReportButton:"Sicher",
        deaths:"Todesfälle",
        infections:"Infektionen",
        recoveries:"Genesungen",
        dashboard:"General",
        region:"Region",

        cn:"Schweiz",
        valais:"Valais"
    }
}
i18n.locale = "de-DE"
console.log(Localization.locale)
i18n.fallbacks = true;