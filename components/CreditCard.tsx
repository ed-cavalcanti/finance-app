import mCardLogo from "@/assets/images/mcard-logo.png";
import vCardLogo from "@/assets/images/vcard-logo.png";
import { amountFormater } from "@/utils/formarters";
import React from "react";
import { Image, Text, View } from "react-native";

type CreditCardProps = {
  cardName: string;
  type: "credit" | "debit";
  lastNum: string;
  value: number;
  flag: "m" | "v";
};

const CreditCard = ({
  cardName,
  lastNum,
  type,
  value,
  flag,
}: CreditCardProps) => {
  return (
    <View className="bg-cyber-green-300 w-80 h-28 rounded-2xl p-4 justify-between">
      <View className="flex-row justify-between">
        <View className="flex-row">
          <Text className="text-sm font-geist">{cardName} | </Text>
          <Text className="text-sm font-geist">
            {type === "credit" ? "Crédito" : "Débito"}
          </Text>
        </View>
        <View className="flex-row items-center gap-1">
          <View className="flex-row gap-[0.125rem]">
            <View className="bg-dark-gray w-[0.375rem] h-[0.375rem] rounded-full" />
            <View className="bg-dark-gray w-[0.375rem] h-[0.375rem] rounded-full" />
            <View className="bg-dark-gray w-[0.375rem] h-[0.375rem] rounded-full" />
            <View className="bg-dark-gray w-[0.375rem] h-[0.375rem] rounded-full" />
          </View>
          <Text className="font-geist">{lastNum}</Text>
        </View>
      </View>
      <View>
        <View className="flex-row justify-between items-center">
          <Text className="font-geist-bold text-xl">
            {amountFormater(value)}
          </Text>
          {flag === "m" && (
            <Image
              source={mCardLogo}
              className="h-5 w-8"
              resizeMode="contain"
            />
          )}
          {flag === "v" && (
            <Image
              source={vCardLogo}
              className="h-3 w-10"
              resizeMode="contain"
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default CreditCard;
