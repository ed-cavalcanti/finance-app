import type { Icon } from "phosphor-react-native";
import React, { useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import {
  Text,
  TextInput,
  View,
  type KeyboardTypeOptions,
  type TextInputProps,
} from "react-native";

type CustomInputProps = {
  placeholder: string;
  Icon: Icon;
  keyboardType: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  props?: TextInputProps;
  registration?: UseFormRegisterReturn;
  error?: string;
  value?: string;
  onChangeText?: (text: string) => void;
};

const CustomInput = ({
  placeholder = "Digite aqui...",
  Icon,
  secureTextEntry = false,
  keyboardType = "default",
  registration,
  props,
  error,
  value,
  onChangeText,
}: CustomInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="w-full mb-4">
      <View
        className={`
      flex-row items-center border rounded-2xl px-4 h-16
      ${isFocused ? "border-primary" : "border-secondary"}
    `}
      >
        <Icon color={isFocused ? "#202020" : "#8C8D98"} />
        <TextInput
          className="flex-1 text-gray-800 text-xl pl-4"
          placeholder={placeholder}
          placeholderTextColor={isFocused ? "#202020" : "#8C8D98"}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          value={value}
          onChangeText={onChangeText}
          {...props}
          onFocus={(e) => {
            setIsFocused(true);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            if (registration?.onBlur) {
              registration.onBlur(e);
            }
          }}
        />
      </View>
      {error && <Text className="text-red-500 text-sm mt-1 ml-1">{error}</Text>}
    </View>
  );
};

export default CustomInput;
