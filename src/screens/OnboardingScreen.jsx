import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { Animated, Image, Pressable, SafeAreaView, Text, View, useWindowDimensions } from "react-native";

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
  const { width } = useWindowDimensions();
  const isCompact = width < 480;
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

  function previous() {
    if (index === 0) return;
    setIndex((current) => current - 1);
  }

  return (
    <SafeAreaView style={[styles.onboardingScreen, isCompact && styles.onboardingScreenCompact]}>
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
        <Pressable
          style={({ pressed }) => [
            styles.onboardingSkipButton,
            pressed && styles.onboardingButtonPressed,
          ]}
          onPress={onFinish}
          accessibilityRole="button"
          accessibilityLabel="Pular introdução"
        >
          <Text style={styles.onboardingSkip}>Pular</Text>
        </Pressable>
      </View>
      <Animated.View style={[styles.onboardingBody, isCompact && styles.onboardingBodyCompact, { opacity: fade }]}>
        <View style={[styles.onboardingCard, isCompact && styles.onboardingCardCompact]}>
          <View style={[styles.onboardingIcon, isCompact && styles.onboardingIconCompact, { backgroundColor: slide.color }]}>
            <Ionicons name={slide.icon} size={44} color="#0D6A49" />
          </View>
          <Text style={styles.onboardingEyebrow}>{slide.eyebrow}</Text>
          <Text style={[styles.onboardingTitle, isCompact && styles.onboardingTitleCompact]}>{slide.title}</Text>
          <Text style={[styles.onboardingText, isCompact && styles.onboardingTextCompact]}>{slide.text}</Text>
        </View>
      </Animated.View>
      <View style={[styles.onboardingBottom, isCompact && styles.onboardingBottomCompact]}>
        <View style={styles.onboardingProgressRow}>
          <View style={styles.onboardingDots} accessibilityLabel={`Etapa ${index + 1} de ${slides.length}`}>
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
          <Text style={styles.onboardingProgressText}>
            {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </Text>
        </View>
        <View style={styles.onboardingNav}>
          <Pressable
            style={({ pressed }) => [
              styles.onboardingBackButton,
              index === 0 && styles.onboardingBackButtonDisabled,
              pressed && index > 0 && styles.onboardingButtonPressed,
            ]}
            onPress={previous}
            accessibilityRole="button"
            accessibilityLabel="Voltar para a etapa anterior"
            accessibilityState={{ disabled: index === 0 }}
          >
            <Ionicons name="arrow-back" size={18} color={index === 0 ? "#B8C2BA" : "#0D6A49"} />
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.onboardingButton,
              styles.onboardingButtonFlex,
              pressed && styles.onboardingButtonPressed,
            ]}
            onPress={next}
            accessibilityRole="button"
            accessibilityLabel={index === slides.length - 1 ? "Começar no Giro" : "Avançar para a próxima etapa"}
          >
            <Text style={styles.onboardingButtonText}>
              {index === slides.length - 1 ? "Começar no Giro" : "Continuar"}
            </Text>
            <Ionicons name="arrow-forward" size={18} color="#fff" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
