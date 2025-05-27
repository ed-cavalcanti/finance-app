import { Tabs } from "expo-router";
import {
  ChartPieSlice,
  Coins,
  CreditCard,
  House,
  User,
} from "phosphor-react-native";
import { View } from "react-native";
import TabBar from "../components/TabBar";

export default function TabsLayout() {
  return (
    <View className="flex-1 bg-base-white">
      <Tabs
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{ headerShown: false }}
      >
        <Tabs.Screen
          name="Dashboard"
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <House
                color={color}
                size={size}
                weight={focused ? "fill" : "regular"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Wallet"
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <CreditCard
                color={color}
                size={size}
                weight={focused ? "fill" : "regular"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Transaction"
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <Coins
                color={color}
                size={size}
                weight={focused ? "fill" : "regular"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Metrics"
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <ChartPieSlice
                color={color}
                size={size}
                weight={focused ? "fill" : "regular"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Profile"
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <User
                color={color}
                size={size}
                weight={focused ? "fill" : "regular"}
              />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
