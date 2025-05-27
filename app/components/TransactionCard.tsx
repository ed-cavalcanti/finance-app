import type { IconProps } from "phosphor-react-native";
import React from "react";
import { Text, View } from "react-native";
import { amountFormater, baseDateFormater } from "../utils/formarters";

interface TransactionCardProps {
  Icon: React.ElementType<IconProps>;
  amount: number;
  date: Date;
  title: string;
  category: string;
}

export default function TransactionCard({
  Icon,
  amount,
  date,
  title,
  category,
}: TransactionCardProps) {
  return (
    <View className="flex-row justify-between items-center">
      <View className="flex-row items-center gap-2">
        <View className="w-14 h-14 bg-light-gray rounded-lg justify-center items-center">
          <Icon />
        </View>
        <View>
          <Text className="font-geist-semibold text-base">{title}</Text>
          <Text className="font-geist-medium text-secondary">
            {baseDateFormater(date)}
          </Text>
        </View>
      </View>
      <View className="ml-2">
        <View className="flex items-end">
          <Text className="font-geist-semibold text-xl">
            {amountFormater(amount)}
          </Text>
          <Text className="font-geist text-secondary text-sm">{category}</Text>
        </View>
      </View>
    </View>
  );
}
