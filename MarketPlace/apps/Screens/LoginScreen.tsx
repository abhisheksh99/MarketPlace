import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const LoginScreen = () => {
  const handleGetStarted = () => {
    console.log('Get Started pressed')
  }

  return (
    <View className="flex-1 bg-white">
      <Image 
        source={require("./../../assets/images/login.jpg")} 
        className="w-full h-[300px] object-cover"
      />
      <View className="flex-1 bg-white px-8 pt-8 space-y-6 -mt-6 rounded-t-[30px]">
        <Text className="text-3xl font-bold text-center text-gray-800">Market Place</Text>
        <Text className="text-base text-center text-gray-600">
          Your pocket-sized bazaar! Dive into a world where treasures await and your next big sale is just a tap away.
        </Text>
        <TouchableOpacity 
          onPress={handleGetStarted}
          className="bg-blue-500 py-3 rounded-full active:bg-blue-600"
        >
          <Text className="text-white text-center font-semibold text-lg">
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default LoginScreen