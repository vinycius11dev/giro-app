import { Animated, SafeAreaView, View } from "react-native";
import { useEffect, useRef } from "react";

export default function LoadingScreen({ styles }) {
  const pulse = useRef(new Animated.Value(0.45)).current;
  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 650, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0.45, duration: 650, useNativeDriver: true }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [pulse]);
  return (
    <SafeAreaView style={styles.safe}>
      <Animated.View style={[styles.loadingWrap, { opacity: pulse }]}>
        <View style={styles.loadingLogo} />
        <View style={styles.loadingLineLarge} />
        <View style={styles.loadingLine} />
        <View style={styles.loadingCard} />
        <View style={styles.loadingCard} />
      </Animated.View>
    </SafeAreaView>
  );
}
