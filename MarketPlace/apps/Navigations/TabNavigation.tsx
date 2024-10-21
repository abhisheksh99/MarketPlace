import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../Screens/HomeScreen';
import ExploreScreen from '../Screens/ExploreScreen';
import AddPostScreen from '../Screens/AddPostScreen';
import ProfileScreen from '../Screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#1e40af',  
        tabBarInactiveTintColor: '#6b7280', 
        tabBarStyle: {
          backgroundColor: '#ffffff', 
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',  
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: focused ? '#3b82f6' : '#6b7280', fontSize: 15 }}>Home</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="Explore" 
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: focused ? '#3b82f6' : '#6b7280', fontSize: 15 }}>Explore</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="Add Post" 
        component={AddPostScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" size={size} color={color} />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: focused ? '#3b82f6' : '#6b7280', fontSize: 15 }}>Add Post</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: focused ? '#3b82f6' : '#6b7280', fontSize: 15 }}>Profile</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;