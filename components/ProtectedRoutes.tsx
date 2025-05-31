import { NavigationContainer } from "@react-navigation/native";
import { Stack } from "expo-router";
import React from "react";
import { useAuth } from "../contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoutes({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="app" />
        ) : (
          <Stack.Screen name="auth" />
        )}
      </Stack>
    </NavigationContainer>
  );
}
