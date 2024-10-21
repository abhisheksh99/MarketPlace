import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";

// Complete the auth session if it's pending
WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  // Destructure startOAuthFlow from useOAuth with Google as the provider
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      console.log("OAuth flow starting...");

      // Start the OAuth flow and await for the session data
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        // Log success and set the active session if session ID is created
        console.log("OAuth Success, Session ID:", createdSessionId);
        setActive({ session: createdSessionId });
      } else if (signIn) {
        // Log additional info if sign-in is required (e.g., MFA)
        console.log("OAuth Sign-in required:", signIn);
      } else if (signUp) {
        // Log if sign-up is required
        console.log("OAuth Sign-up required:", signUp);
      }
    } catch (err) {
      // Log any error encountered during the flow
      console.error("OAuth error:", err);
    }
  }, [startOAuthFlow]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        <Image
          source={require("./../../assets/images/login.jpg")}
          className="w-full h-[350px] object-cover"
        />
        <View className="flex-1 bg-white px-8 pt-8 space-y-8 -mt-10 rounded-t-[40px]">
          <View className="space-y-3">
            <Text className="text-4xl font-bold text-center text-gray-800">
              Market Place
            </Text>
            <Text className="text-base text-center text-gray-600">
              Your pocket-sized bazaar! Dive into a world where treasures await
              and your next big sale is just a tap away.
            </Text>
          </View>
          <TouchableOpacity
            onPress={onPress} // Trigger the OAuth flow on press
            className="bg-blue-500 py-4 rounded-full active:bg-blue-600 shadow-md"
          >
            <Text className="text-white text-center font-bold text-lg">
              Sign in with Google
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
