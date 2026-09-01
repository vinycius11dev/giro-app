import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { productImages } from "../data/initialData";

const navItems = [
  ["visao", "Visão"],
  ["fluxo", "Como funciona"],
  ["negocio", "Negócio"],
  ["entrega", "CP4 · CP5 · CP6"],
];

function IconBox({ icon, color, background, styles }) {
  return (
    <View style={[styles.showcaseIconBox, { backgroundColor: background }]}>
      <Ionicons name={icon} size={20} color={color} />
    </View>
  );
}

function SectionTitle({ eyebrow, title, text, styles }) {
  return (
    <View style={styles.showcaseSectionTitle}>
      <Text style={styles.showcaseEyebrow}>{eyebrow}</Text>
      <Text style={styles.showcaseSectionHeading}>{title}</Text>
      {text ? <Text style={styles.showcaseSectionText}>{text}</Text> : null}
    </View>
  );
}

export default function ProjectShowcaseScreen({ onBack, onLogin, onDemo, styles }) {
  const scrollRef = useRef(null);
  const positions = useRef({});
  const entrance = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(entrance, {
      toValue: 1,
      duration: 520,
      useNativeDriver: false,
    }).start();
  }, [entrance]);

  function remember(key) {
    return (event) => {
      positions.current[key] = event.nativeEvent.layout.y;
    };
  }

  function jumpTo(key) {
    const y = positions.current[key];
    if (typeof y === "number") {
      scrollRef.current?.scrollTo({ y: Math.max(0, y - 14), animated: true });
    }
  }

  const contentStyle = {
    opacity: entrance,
    transform: [
      {
        translateY: entrance.interpolate({
          inputRange: [0, 1],
          outputRange: [18, 0],
        }),
      },
    ],
  };

  return (
    <View style={styles.showcaseScreen}>
      <View style={styles.showcaseTopbar}>
        <Pressable
          onPress={onBack}
          style={({ hovered, pressed }) => [
            styles.showcaseBack,
            hovered && styles.showcaseBackHover,
            pressed && { opacity: 0.72 },
          ]}
        >
          <Ionicons name="arrow-back" size={19} color="#0D6A49" />
          <Text style={styles.showcaseBackText}>Voltar</Text>
        </Pressable>
        <View style={styles.showcaseMiniBrand}>
          <Image
            source={require("../../assets/giro-logo.png")}
            style={styles.showcaseMiniLogo}
            resizeMode="contain"
          />
          <Text style={styles.showcaseMiniBrandText}>giro</Text>
        </View>
        <Pressable onPress={onLogin} style={styles.showcaseLoginLink}>
          <Text style={styles.showcaseLoginLinkText}>Entrar</Text>
        </Pressable>
      </View>

      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.showcaseContent}
      >
        <Animated.View style={contentStyle}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.showcaseNav}
          >
            {navItems.map(([key, label]) => (
              <Pressable
                key={key}
                onPress={() => jumpTo(key)}
                style={({ hovered, pressed }) => [
                  styles.showcaseNavItem,
                  hovered && styles.showcaseNavItemHover,
                  pressed && { opacity: 0.75 },
                ]}
              >
                <Text style={styles.showcaseNavText}>{label}</Text>
              </Pressable>
            ))}
          </ScrollView>

          <View onLayout={remember("visao")}>
            <LinearGradient
              colors={["#0D6748", "#21875D"]}
              style={styles.showcaseHero}
            >
              <View style={styles.showcaseHeroGlow} />
              <Text style={styles.showcaseHeroEyebrow}>PROJETO GIRO</Text>
              <Text style={styles.showcaseHeroTitle}>
                Menos desperdício.{"\n"}Mais resultado.
              </Text>
              <Text style={styles.showcaseHeroText}>
                Uma forma simples de transformar validade em decisão para pequenos negócios de alimentos.
              </Text>
              <View style={styles.showcaseHeroActions}>
                <Pressable
                  onPress={onDemo}
                  style={({ hovered, pressed }) => [
                    styles.showcasePrimaryButton,
                    hovered && styles.showcasePrimaryButtonHover,
                    pressed && { transform: [{ scale: 0.97 }] },
                  ]}
                >
                  <Text style={styles.showcasePrimaryButtonText}>Ver demonstração</Text>
                  <Ionicons name="arrow-forward" size={16} color="#0D6748" />
                </Pressable>
                <Text style={styles.showcaseHeroHint}>React Native · Expo · Offline</Text>
              </View>
              <View style={styles.showcaseHeroMark}>
                <Image
                  source={require("../../assets/giro-logo.png")}
                  style={styles.showcaseHeroLogo}
                  resizeMode="contain"
                />
              </View>
            </LinearGradient>
          </View>

          <View style={styles.showcaseIntroRow}>
            <View style={styles.showcaseIntroCopy}>
              <Text style={styles.showcaseEyebrow}>A IDEIA</Text>
              <Text style={styles.showcaseIntroTitle}>Validade não precisa virar prejuízo.</Text>
              <Text style={styles.showcaseSectionText}>
                Cafés, padarias, mercados e hortifrutis perdem produtos porque a informação chega tarde. O Giro organiza o estoque e aponta o próximo melhor passo.
              </Text>
            </View>
            <View style={styles.showcasePhotoStack}>
              <Image source={productImages.Padaria} style={styles.showcasePhotoMain} resizeMode="cover" />
              <Image source={productImages.Hortifruti} style={styles.showcasePhotoSmall} resizeMode="cover" />
            </View>
          </View>

          <View onLayout={remember("fluxo")} style={styles.showcaseSection}>
            <SectionTitle
              eyebrow="COMO FUNCIONA"
              title="Do alerta à ação em quatro passos."
              text="O aplicativo não apenas mostra a validade: ele ajuda a escolher um destino para cada item."
              styles={styles}
            />
            <View style={styles.showcaseSteps}>
              {[
                ["01", "Cadastre", "Registre produto, quantidade e validade.", "create-outline"],
                ["02", "Priorize", "O Giro classifica o que pede atenção.", "funnel-outline"],
                ["03", "Decida", "Escolha oferta, doação ou descarte.", "swap-horizontal-outline"],
                ["04", "Impacte", "A ação fica salva no histórico.", "leaf-outline"],
              ].map(([number, title, text, icon]) => (
                <View key={number} style={styles.showcaseStepCard}>
                  <View style={styles.showcaseStepTop}>
                    <Text style={styles.showcaseStepNumber}>{number}</Text>
                    <IconBox icon={icon} color="#0D6A49" background="#E9F6D5" styles={styles} />
                  </View>
                  <Text style={styles.showcaseStepTitle}>{title}</Text>
                  <Text style={styles.showcaseStepText}>{text}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.showcaseFeatureBand}>
            <View style={styles.showcaseFeatureBandCopy}>
              <Text style={styles.showcaseEyebrow}>PARA QUEM É</Text>
              <Text style={styles.showcaseFeatureBandTitle}>Pequenos negócios, decisões mais inteligentes.</Text>
              <Text style={styles.showcaseFeatureBandText}>
                Uma ferramenta leve para quem cuida do estoque no dia a dia e precisa recuperar valor antes que o produto se perca.
              </Text>
              <View style={styles.showcaseAudienceList}>
                {[
                  ["cafe-outline", "Cafés e padarias"],
                  ["storefront-outline", "Mercados de bairro"],
                  ["restaurant-outline", "Restaurantes e hortifrutis"],
                ].map(([icon, label]) => (
                  <View key={label} style={styles.showcaseAudienceItem}>
                    <Ionicons name={icon} size={17} color="#E9F6D5" />
                    <Text style={styles.showcaseAudienceText}>{label}</Text>
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.showcaseProductStrip}>
              <Image source={productImages.Laticínios} style={styles.showcaseStripPhoto} resizeMode="cover" />
              <Image source={productImages.Mercearia} style={styles.showcaseStripPhoto} resizeMode="cover" />
            </View>
          </View>

          <View onLayout={remember("negocio")} style={styles.showcaseSection}>
            <SectionTitle
              eyebrow="MODELO DE NEGÓCIO"
              title="Valor para o negócio e para a comunidade."
              text="O Giro pode crescer com um modelo freemium, mantendo o essencial acessível para quem está começando."
              styles={styles}
            />
            <View style={styles.showcasePlans}>
              <View style={styles.showcasePlanCard}>
                <View style={styles.showcasePlanHeader}>
                  <Text style={styles.showcasePlanName}>Giro Essencial</Text>
                  <Text style={styles.showcasePlanPrice}>Grátis</Text>
                </View>
                <Text style={styles.showcasePlanDescription}>Para um estabelecimento começar a reduzir perdas.</Text>
                {[
                  "Cadastro de produtos",
                  "Alertas e filtros de validade",
                  "Oferta, doação e histórico",
                ].map((item) => (
                  <View key={item} style={styles.showcasePlanItem}>
                    <Ionicons name="checkmark-circle" size={17} color="#278657" />
                    <Text style={styles.showcasePlanItemText}>{item}</Text>
                  </View>
                ))}
              </View>
              <View style={[styles.showcasePlanCard, styles.showcasePlanCardPro]}>
                <View style={styles.showcaseProBadge}><Text style={styles.showcaseProBadgeText}>PRÓXIMO PASSO</Text></View>
                <View style={styles.showcasePlanHeader}>
                  <Text style={styles.showcasePlanName}>Giro Pro</Text>
                  <Text style={styles.showcasePlanPrice}>Assinatura</Text>
                </View>
                <Text style={styles.showcasePlanDescription}>Para redes e operações que precisam crescer com dados.</Text>
                {[
                  "Múltiplos usuários e lojas",
                  "Relatórios avançados e exportação",
                  "Notificações inteligentes",
                ].map((item) => (
                  <View key={item} style={styles.showcasePlanItem}>
                    <Ionicons name="checkmark-circle" size={17} color="#E76832" />
                    <Text style={styles.showcasePlanItemText}>{item}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.showcaseImpactRow}>
            <IconBox icon="leaf" color="#0D6A49" background="#D9EFC0" styles={styles} />
            <View style={{ flex: 1 }}>
              <Text style={styles.showcaseImpactTitle}>Cada item aproveitado gera impacto.</Text>
              <Text style={styles.showcaseImpactText}>Menos descarte, mais receita recuperada e mais alimentos chegando a quem precisa.</Text>
            </View>
          </View>

          <View onLayout={remember("entrega")} style={styles.showcaseSection}>
            <SectionTitle
              eyebrow="ENTREGA ACADÊMICA"
              title="Um projeto contínuo do CP4 ao CP6."
              text="A mesma ideia evolui da proposta ao aplicativo instalável, com documentação e evidências."
              styles={styles}
            />
            <View style={styles.showcaseCheckpointList}>
              {[
                ["CP4", "Conceito e negócio", "Problema, público, proposta de valor, marca e diferenciais."],
                ["CP5", "Protótipo funcional", "Fluxos em JSX, dados mockados, testes, imagens e telas interativas."],
                ["CP6", "Aplicativo final", "Persistência local, manual, evidências e preparação do APK."],
              ].map(([tag, title, text], index) => (
                <View key={tag} style={styles.showcaseCheckpoint}>
                  <View style={styles.showcaseCheckpointTag}><Text style={styles.showcaseCheckpointTagText}>{tag}</Text></View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.showcaseCheckpointTitle}>{title}</Text>
                    <Text style={styles.showcaseCheckpointText}>{text}</Text>
                  </View>
                  <Ionicons name={index === 2 ? "rocket-outline" : "checkmark-circle-outline"} size={20} color="#0D6A49" />
                </View>
              ))}
            </View>
          </View>

          <View style={styles.showcaseCta}>
            <Text style={styles.showcaseCtaTitle}>Pronto para ver o Giro funcionando?</Text>
            <Text style={styles.showcaseCtaText}>Acesse a demonstração e explore o estoque por dentro.</Text>
            <Pressable
              onPress={onDemo}
              style={({ hovered, pressed }) => [
                styles.showcaseCtaButton,
                hovered && styles.showcaseCtaButtonHover,
                pressed && { opacity: 0.82 },
              ]}
            >
              <Text style={styles.showcaseCtaButtonText}>Entrar na demonstração</Text>
              <Ionicons name="arrow-forward" size={17} color="#0D6748" />
            </Pressable>
          </View>
          <Text style={styles.showcaseFooter}>Giro · Menos desperdício, mais resultado.</Text>
        </Animated.View>
      </ScrollView>
    </View>
  );
}
