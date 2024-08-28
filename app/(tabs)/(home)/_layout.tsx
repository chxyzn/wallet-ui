import { Stack } from "expo-router";

export default function StackLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="statistics"
        options={{
          headerShown: true,
        }}
      />
    </Stack>
  );
}
