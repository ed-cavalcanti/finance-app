import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { TouchableOpacity, View } from "react-native";

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <View
      className="flex-row h-[5rem] mx-6 mb-8 rounded-2xl bg-dark-gray py-4 px-4 items-center justify-between"
      style={{
        // Necessário para sombra no Android:
        elevation: 5,
        shadowColor: "#202020",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const icon = options.tabBarIcon;

        const isFocused = state.index === index;

        if (["_sitemap", "+not-found"].includes(route.name) || !icon)
          return null;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        if (route.name === "Transaction") {
          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              onLongPress={onLongPress}
              className="flex items-center justify-center bg-cyber-green-300 w-16 h-16 rounded-lg mx-4"
            >
              {icon &&
                icon({
                  focused: isFocused,
                  color: "#202020",
                  size: 32,
                })}
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            className="items-center w-16 h-16 justify-center"
          >
            {icon &&
              icon({
                focused: isFocused,
                color: "#FEFEFE",
                size: 28,
              })}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
