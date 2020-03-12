import React, { Component } from 'react'
import { View, Text } from 'react-native';
import Map from "./Map";
import Feeds from "./Feeds";
import Chat from "./Chat";
import Homescreen from './dashboard/Homescreen';
import VirusInfo from "./VirusInfo";


export const MapScreen = () => <Map/>
//export const MapScreen = () => <View style={{marginTop:24}}><Map /></View>;
export const ChatScreen = () => <Chat />;
export const FeedsScreen = () => <Feeds />;
export const DashboardScreen = () => <Homescreen />
export const VirusInfoScreen = () => <VirusInfo />
