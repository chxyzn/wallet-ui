import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreen from "./(tabs)/(home)";
import Onboarding from "./onboarding";

import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  const fetchData = async () => {
    var showOnBoarding = await AsyncStorage.getItem("onboarding");
    if (showOnBoarding === null) {
      setShowOnboarding(true);
    }
    setIsReady(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!isReady) {
    return null;
  }

  console.log(showOnboarding);
  return showOnboarding ? <Onboarding /> : <HomeScreen />;
}
