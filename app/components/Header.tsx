import React from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import headerStars from "../../assets/images/header-stars.png";

export default function Header() {
  return (
    <View className="bg-light-gray w-full px-6 rounded-b-3xl">
      <SafeAreaView className="mt-14">
        <View className="flex-row items-center justify-between">
          <Text className="font-geist-semibold text-3xl inline-block text-primary">
            <Text className="text-secondary inline-block">Olá,</Text> Edney.
          </Text>
          <Image
            source={headerStars}
            className="w-14 h-14"
            resizeMode="contain"
          />
        </View>
        <Text className="mt-12 font-geist-semibold text-xl text-secondary opacity-50">
          Saldo total
        </Text>
        <Text className="mt-2 mb-2 font-geist-bold text-5xl text-primary">
          R$ 1.039,28
        </Text>
      </SafeAreaView>
    </View>
  );
}
