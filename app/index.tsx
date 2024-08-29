import AsyncStorage from "@react-native-async-storage/async-storage";
import Onboarding from "./onboarding";

import React, { useState, useEffect } from "react";

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

  return showOnboarding ? <Onboarding go="false" /> : <Onboarding go="true" />;
}
