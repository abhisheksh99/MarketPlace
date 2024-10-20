import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { withExpoSnack } from "nativewind";
import LoginScreen from "./apps/Screens/LoginScreen";
import * as SecureStore from "expo-secure-store";
import TabNavigation from "./apps/Navigations/TabNavigation";
import { NavigationContainer } from "@react-navigation/native";

// SecureStore token management (token cache)
const tokenCache = {
  async getToken(key) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (err) {
      console.error("Error retrieving token:", err);
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (err) {
      console.error("Error saving token:", err);
    }
  },
};

function App() {
  const [publishableKey, setPublishableKey] = useState(null);

  // Ensure the Clerk publishable key is loaded from the environment variables
  useEffect(() => {
    const loadPublishableKey = async () => {
      const key = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
      if (!key) {
        console.error("Missing Clerk publishable key");
      } else {
        setPublishableKey(key);
      }
    };
    loadPublishableKey();
  }, []);

  if (!publishableKey) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <NavigationContainer>
        <View className="flex-1 bg-white">
          <StatusBar style="auto" />
          <SignedIn>
            <TabNavigation />
          </SignedIn>
          <SignedOut>
            <LoginScreen />
          </SignedOut>
        </View>
      </NavigationContainer>
    </ClerkProvider>
  );
}

export default withExpoSnack(App);
