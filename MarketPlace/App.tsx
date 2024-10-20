import React from 'react';
import { Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { withExpoSnack } from 'nativewind';
import LoginScreen from './apps/Screens/LoginScreen';

function App() {
  return (
    <View className="flex-1 bg-white">
      
      <StatusBar style="auto" />
      <LoginScreen />
    </View>
  );
}


export default withExpoSnack(App);