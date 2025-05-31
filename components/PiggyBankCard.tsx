import { amountFormater } from "@/utils/formarters";
import type { IconProps } from "phosphor-react-native";
import React from "react";
import { Text, View } from "react-native";

interface PiggyBankCardProps {
  Icon: React.ElementType<IconProps>;
  goal: number;
  amount: number;
  title: string;
}

const PiggyBankCard = ({ Icon, goal, amount, title }: PiggyBankCardProps) => {
  const percentage = Math.floor((amount / goal) * 100);

  return (
    <View className="bg-light-gray p-4 w-56 h-40 rounded-2xl justify-between">
      <View className="flex-row justify-between">
        <View>
          <Icon color="#202020" />
          <Text className="font-geist">{title}</Text>
        </View>
        <Text className="text-primary font-geist-semibold text-xl">
          {percentage}%
        </Text>
      </View>
      <View>
        <Text className="font-geist-semibold text-xl">
          {amountFormater(amount)}
        </Text>
        <Text className="font-geist text-secondary text-sm">{`Objetivo ${amountFormater(
          amount
        )}`}</Text>
      </View>
    </View>
  );
};

export default PiggyBankCard;
