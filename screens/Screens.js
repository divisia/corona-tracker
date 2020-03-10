import React, { Component } from 'react'
import Map from "./Map";
import Feeds from "./Feeds";
import Chat from "./Chat";
import Homescreen from './dashboard/Homescreen';


export const ChatScreen = () => <Chat />;
export const MapScreen = () => <Map />;
export const FeedsScreen = () => <Feeds />;
export const DashboardScreen = () => <Homescreen />