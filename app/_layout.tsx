import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SfProRegular: require("../assets/fonts/SF-Pro-Text-Regular.otf"),
    SfProMedium: require("../assets/fonts/SF-Pro-Text-Medium.otf"),
    SfProBold: require("../assets/fonts/SF-Pro-Text-Bold.otf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack screenOptions={{ header: (prop) => <></> }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
