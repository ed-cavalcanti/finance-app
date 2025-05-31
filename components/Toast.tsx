import { CheckCircle, Warning, XCircle } from "phosphor-react-native";
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import { Text } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

// Componente adaptado para utilizar tailwind e phosphor icons
// Base do componente do vídeo https://www.youtube.com/watch?v=M2v7vsHcjHk

interface ToastProps {}

interface ToastRef {
  show: ({
    type,
    text,
    duration,
  }: {
    type: "success" | "warning" | "error";
    text: string;
    duration: number;
  }) => void;
}

type ToastType = "success" | "warning" | "error";

const Toast = forwardRef<ToastRef, ToastProps>(({}, ref) => {
  const toastTopAnimation = useSharedValue(-100);
  const context = useSharedValue(0);
  const [showing, setShowing] = useState(false);
  const [toastType, setToastType] = useState<ToastType>("success");
  const [toastText, setToastText] = useState("");
  const [toastDuration, setToastDuration] = useState(0);
  // If you're not using react-native-edge-to-edge, please use the one below by uncommenting it
  const TOP_VALUE = 60;
  // const TOP_VALUE = Platform.OS === 'ios' ? 60 : 20;

  const show = useCallback(
    ({
      type,
      text,
      duration,
    }: {
      type: ToastType;
      text: string;
      duration: number;
    }) => {
      setShowing(true);
      setToastType(type);
      setToastText(text);
      setToastDuration(duration);
      toastTopAnimation.value = withSequence(
        withTiming(TOP_VALUE),
        withDelay(
          duration,
          withTiming(-100, {}, (finish) => {
            if (finish) {
              runOnJS(setShowing)(false);
            }
          })
        )
      );
    },
    [TOP_VALUE, toastTopAnimation]
  );

  useImperativeHandle(
    ref,
    () => ({
      show,
    }),
    [show]
  );

  const animatedTopStyles = useAnimatedStyle(() => {
    return {
      top: toastTopAnimation.value,
    };
  });

  const pan = Gesture.Pan()
    .onBegin(() => {
      context.value = toastTopAnimation.value;
    })
    .onUpdate((event) => {
      if (event.translationY < 100) {
        toastTopAnimation.value = withSpring(
          context.value + event.translationY,
          {
            damping: 600,
            stiffness: 100,
          }
        );
      }
    })
    .onEnd((event) => {
      if (event.translationY < 0) {
        toastTopAnimation.value = withTiming(-100, {}, (finish) => {
          if (finish) {
            runOnJS(setShowing)(false);
          }
        });
      } else if (event.translationY > 0) {
        toastTopAnimation.value = withSequence(
          withTiming(TOP_VALUE),
          withDelay(
            toastDuration,
            withTiming(-100, {}, (finish) => {
              if (finish) {
                runOnJS(setShowing)(false);
              }
            })
          )
        );
      }
    });
  return (
    <>
      {showing && (
        <GestureDetector gesture={pan}>
          <Animated.View
            className={`absolute top-0 w-[90%] p-2.5 rounded-2xl border flex-row items-center self-center ${
              toastType === "success"
                ? "bg-green-50 border-green-700"
                : toastType === "warning"
                ? "bg-orange-50 border-orange-500"
                : "bg-red-50 border-red-600"
            }`}
            style={animatedTopStyles}
          >
            {toastType === "success" ? (
              <CheckCircle color="#15803d" weight="fill" size={28} />
            ) : toastType === "warning" ? (
              <Warning color="#f97316" weight="fill" size={28} />
            ) : (
              <XCircle color="#dc2626" weight="fill" size={28} />
            )}

            <Text
              className={`ml-3.5 text-base ${
                toastType === "success"
                  ? "text-green-700"
                  : toastType === "warning"
                  ? "text-orange-500"
                  : "text-red-600"
              }`}
            >
              {toastText}
            </Text>
          </Animated.View>
        </GestureDetector>
      )}
    </>
  );
});

export default Toast;
