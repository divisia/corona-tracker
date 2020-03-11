import React, { Component } from 'react'
import { View, Text } from 'react-native';
import Map from "./Map";
import Feeds from "./Feeds";
import Chat from "./Chat";
import Homescreen from './dashboard/Homescreen';


export const MapScreen = () => <Map/>
//export const MapScreen = () => <View style={{marginTop:24}}><Map /></View>;
export const ChatScreen = () => <Chat />;
export const FeedsScreen = () => <Feeds />;
export const DashboardScreen = () => <Homescreen />
export const AvoidanceScreen = () => <View><Text>How to avoid coronavirus?</Text></View>
export const SymptomsScreen = () => <View><Text>What are the symptoms of coronavirus?</Text></View>