import { useAuth } from "@/contexts/AuthContext";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <View className="flex-1 justify-center items-center">
      <TouchableOpacity onPress={handleLogout}>
        <Text>LogOut</Text>
      </TouchableOpacity>
    </View>
  );
}
