import { Link } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import CreditCard from "../components/CreditCard";
import Header from "../components/Header";

export default function Dashboard() {
  return (
    <View className="items-center bg-base-white flex-1">
      <Header />
      <View className="mt-6 w-full px-6">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="font-geist-medium text-xl">Meus Cartões</Text>
          <Link
            href={"/(tabs)/Wallet"}
            className="font-geist-medium text-sm text-secondary opacity-60"
          >
            Ver todos
          </Link>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-4">
            <CreditCard
              cardName="NuBank"
              lastNum="7536"
              type="credit"
              value={728.47}
              flag="m"
            />
            <CreditCard
              cardName="BB"
              lastNum="7536"
              type="debit"
              value={319.27}
              flag="v"
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
