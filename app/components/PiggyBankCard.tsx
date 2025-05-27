import type { IconProps } from "phosphor-react-native";
import React from "react";
import { Text, View } from "react-native";

interface PiggyBankCardProps {
  Icon: React.ElementType<IconProps>;
  goal: number;
  amount: number;
  title: string;
}

export default function PiggyBankCard({
  Icon,
  goal,
  amount,
  title,
}: PiggyBankCardProps) {
  const percentage = Math.floor((amount / goal) * 100);

  const toLocaleString = (value: number) => {
    return value.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

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
        <Text className="font-geist-semibold text-xl">{`R$ ${toLocaleString(
          amount
        )}`}</Text>
        <Text className="font-geist text-secondary text-sm">{`Objetivo R$${toLocaleString(
          amount
        )}`}</Text>
      </View>
    </View>
  );
}
