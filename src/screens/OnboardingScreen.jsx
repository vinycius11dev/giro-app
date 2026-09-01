import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { Animated, Image, Pressable, SafeAreaView, Text, View } from "react-native";

const slides = [
  {
    icon: "leaf-outline",
    eyebrow: "BEM-VINDO AO GIRO",
    title: "Validade virou decisão.",
    text: "Organize o estoque e descubra qual é o melhor próximo passo para cada produto.",
    color: "#E9F6D5",
  },
  {
    icon: "notifications-outline",
    eyebrow: "PRIORIDADES CLARAS",
    title: "Aja antes do desperdício.",
    text: "Alertas e filtros mostram o que precisa de atenção hoje, sem planilhas complicadas.",
    color: "#FFF0E8",
  },
  {
    icon: "sparkles-outline",
    eyebrow: "IMPACTO POSITIVO",
    title: "Mais giro, menos perda.",
    text: "Registre ofertas, doações e resultados para transformar estoque parado em valor.",
    color: "#FFF6DD",
  },
];

export default function OnboardingScreen({ onFinish, styles }) {
  const [index, setIndex] = useState(0);
  const fade = useRef(new Animated.Value(1)).current;
  const slide = slides[index];

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fade, { toValue: 0, duration: 90, useNativeDriver: true }),
      Animated.timing(fade, { toValue: 1, duration: 260, useNativeDriver: true }),
    ]).start();
  }, [fade, index]);

  function next() {
    if (index === slides.length - 1) return onFinish();
    setIndex((current) => current + 1);
  }

  return (
    <SafeAreaView style={styles.onboardingScreen}>
      <View style={styles.onboardingTop}>
        <View style={styles.onboardingBrand}>
          <Image
            source={require("../../assets/giro-logo.png")}
            style={styles.onboardingLogo}
            resizeMode="contain"
            accessibilityLabel="Logo do Giro"
          />
          <Text style={styles.onboardingBrandText}>giro</Text>
        </View>
        <Pressable onPress={onFinish} accessibilityRole="button">
          <Text style={styles.onboardingSkip}>Pular</Text>
        </Pressable>
      </View>
      <Animated.View style={[styles.onboardingBody, { opacity: fade }]}>
        <View style={[styles.onboardingIcon, { backgroundColor: slide.color }]}>
          <Ionicons name={slide.icon} size={44} color="#0D6A49" />
        </View>
        <Text style={styles.onboardingEyebrow}>{slide.eyebrow}</Text>
        <Text style={styles.onboardingTitle}>{slide.title}</Text>
        <Text style={styles.onboardingText}>{slide.text}</Text>
      </Animated.View>
      <View style={styles.onboardingBottom}>
        <View style={styles.onboardingDots}>
          {slides.map((item, dotIndex) => (
            <View
              key={item.eyebrow}
              style={[
                styles.onboardingDot,
                dotIndex === index && styles.onboardingDotActive,
              ]}
            />
          ))}
        </View>
        <Pressable
          style={({ pressed }) => [
            styles.onboardingButton,
            pressed && styles.onboardingButtonPressed,
          ]}
          onPress={next}
          accessibilityRole="button"
          accessibilityLabel={index === slides.length - 1 ? "Começar" : "Próximo"}
        >
          <Text style={styles.onboardingButtonText}>
            {index === slides.length - 1 ? "Começar no Giro" : "Continuar"}
          </Text>
          <Ionicons name="arrow-forward" size={18} color="#fff" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
