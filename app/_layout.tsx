// _layout.tsx
import React from "react";
import { Stack } from "expo-router";

/**
 * RootLayout configures the app's navigation stack.
 * The header displays "Task2Go" with a light blue background.
 */
export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: "Task2Go",
        headerStyle: { backgroundColor: "#4A90E2" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    />
  );
}
