import GLoginLogo from "@/assets/images/glogin-logo.png";
import CustomInput from "@/components/CustomInput";
import Toast from "@/components/Toast";
import { useAuth } from "@/contexts/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { EnvelopeSimple, LockSimple } from "phosphor-react-native";
import React, { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string({
      message: "Insira um email válido",
    })
    .email({
      message: "Insira um email válido",
    }),
  password: z.string({
    message: "Insira sua senha",
  }),
});

type LoginFormData = z.infer<typeof loginSchema>;

const login = () => {
  const { login, isLoading } = useAuth();

  const toastRef = useRef<{
    show: (options: { type: string; text: string; duration: number }) => void;
  }>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const handleLogin = async (credentials: LoginFormData) => {
    try {
      await login(credentials);
    } catch (error) {
      if (toastRef.current) {
        toastRef.current.show({
          type: "error",
          text: typeof error === "string" ? error : "Email ou senha inválidos",
          duration: 3000,
        });
      }
    }
  };

  return (
    <GestureHandlerRootView className="flex-1">
      <View className="flex-1 justify-end bg-base-white">
        <Toast ref={toastRef} />
        <View className="px-6">
          <View className="mb-16">
            <Text className="font-geist-semibold text-3xl text-secondary">
              Hey 👋🏼
            </Text>
            <Text className="font-geist-semibold text-3xl text-primary">
              Bem vindo de volta!
            </Text>
          </View>
          <View>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <CustomInput
                  props={{ autoCapitalize: "none" }}
                  value={value}
                  onChangeText={onChange}
                  keyboardType="email-address"
                  placeholder="Email"
                  Icon={EnvelopeSimple}
                  error={errors.email?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <CustomInput
                  props={{ autoCapitalize: "none" }}
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry={true}
                  keyboardType="default"
                  placeholder="Senha"
                  Icon={LockSimple}
                  error={errors.password?.message}
                />
              )}
            />
          </View>
          <View className="flex-row justify-end">
            <Link
              href={"/(auth)/forgotPassword"}
              className="text-lg text-primary font-geist leading-none underline decoration-solid mb-14"
            >
              Esqueceu a senha?
            </Link>
          </View>
          <TouchableOpacity
            onPress={handleSubmit(handleLogin)}
            disabled={isLoading}
            className="flex-row items-center border border-cyber-green-500 rounded-2xl mb-6 h-16 bg-cyber-green-300 justify-center"
          >
            <Text className="font-geist-medium text-xl text-primary">
              Entrar
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row gap-8 justify-center items-center mb-6">
          <View className="h-[1px] bg-secondary opacity-60 w-[36%]" />
          <Text className="font-geist-medium text-secondary">ou</Text>
          <View className="h-[1px] bg-secondary opacity-60 w-[36%]" />
        </View>
        <View className="bg-light-gray h-[32%] rounded-t-3xl p-6">
          <TouchableOpacity
            disabled={isLoading}
            className="border border-secondary h-16 rounded-2xl justify-center items-center bg-base-white flex-row gap-4 mb-16"
          >
            <Image
              source={GLoginLogo}
              className="w-6 h-6"
              resizeMode="contain"
            />
            <Text className="font-geist-medium text-primary text-lg">
              Continuar com Google
            </Text>
          </TouchableOpacity>
          <Link
            href={"/(auth)/register"}
            className="font-geist-medium text-center text-primary text-lg"
          >
            Não possui conta? <Text className="underline">Cadastre-se</Text>
          </Link>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default login;
