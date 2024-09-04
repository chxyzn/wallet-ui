import { Stack } from "expo-router";
import { Text } from "react-native";

export default function StackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          headerStyle: {},
        }}
      />
      <Stack.Screen
        name="statistics"
        options={{
          headerShown: true,
          headerBackTitle: "Back",
          headerTitle: "Statistics",
          headerTitleStyle: {
            fontSize: 20,
            fontFamily: "SfProMedium",
          },
          headerTitleAlign: "center",
          headerStyle: {},
        }}
      />
    </Stack>
  );
}
