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

export default function ProjectShowcaseScreen({ onBack, onLogin, onDemo, darkMode, onToggleDarkMode, styles }) {
  const scrollRef = useRef(null);
  const positions = useRef({});
  const entrance = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;

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
        <View style={styles.showcaseTopActions}>
          <Pressable
            onPress={onToggleDarkMode}
            style={({ hovered, pressed }) => [
              styles.showcaseThemeButton,
              hovered && styles.showcaseThemeButtonHover,
              pressed && { opacity: 0.72 },
            ]}
            accessibilityRole="button"
            accessibilityLabel={darkMode ? "Ativar modo claro" : "Ativar modo escuro"}
          >
            <Ionicons name={darkMode ? "sunny-outline" : "moon-outline"} size={17} color="#0D6A49" />
          </Pressable>
          <Pressable onPress={onLogin} style={styles.showcaseLoginLink}>
            <Text style={styles.showcaseLoginLinkText}>Entrar</Text>
          </Pressable>
        </View>
      </View>

      <Animated.ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.showcaseContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}
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
              <Animated.View
                style={[
                  styles.showcaseHeroMark,
                  {
                    transform: [
                      {
                        translateY: scrollY.interpolate({
                          inputRange: [0, 340],
                          outputRange: [0, 46],
                          extrapolate: "clamp",
                        }),
                      },
                      {
                        rotate: scrollY.interpolate({
                          inputRange: [0, 340],
                          outputRange: ["0deg", "8deg"],
                          extrapolate: "clamp",
                        }),
                      },
                    ],
                  },
                ]}
              >
                <Image
                  source={require("../../assets/giro-logo.png")}
                  style={styles.showcaseHeroLogo}
                  resizeMode="contain"
                />
              </Animated.View>
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

          <View style={styles.showcaseSection}>
            <SectionTitle
              eyebrow="IMPACTO MEDIDO"
              title="Pequenas decisões, resultados que aparecem."
              text="O Giro conecta a rotina do estoque a dois objetivos de desenvolvimento sustentável."
              styles={styles}
            />
            <View style={styles.showcaseMetricGrid}>
              {[
                ["ODS 12", "Consumo responsável", "Menos descarte e mais aproveitamento."],
                ["ODS 2", "Fome zero", "Doações organizadas para quem precisa."],
              ].map(([tag, title, text], index) => (
                <Animated.View
                  key={tag}
                  style={[
                    styles.showcaseMetricCard,
                    { transform: [{ scale: entrance.interpolate({ inputRange: [0, 1], outputRange: [0.94 + index * 0.01, 1] }) }] },
                  ]}
                >
                  <View style={styles.showcaseMetricTag}><Text style={styles.showcaseMetricTagText}>{tag}</Text></View>
                  <Text style={styles.showcaseMetricTitle}>{title}</Text>
                  <Text style={styles.showcaseMetricText}>{text}</Text>
                </Animated.View>
              ))}
            </View>
            <View style={styles.showcaseNumbersCard}>
              <View><Text style={styles.showcaseNumberValue}>+32%</Text><Text style={styles.showcaseNumberLabel}>potencial de aproveitamento</Text></View>
              <View style={styles.showcaseNumberDivider} />
              <View><Text style={styles.showcaseNumberValue}>4 passos</Text><Text style={styles.showcaseNumberLabel}>do alerta à ação</Text></View>
            </View>
          </View>

          <View style={styles.showcaseSection}>
            <SectionTitle
              eyebrow="POR QUE O GIRO"
              title="Mais simples que uma planilha. Mais útil que um alerta solto."
              text="A proposta foi desenhada para caber na rotina de quem cuida do estoque."
              styles={styles}
            />
            <View style={styles.showcaseCompareCard}>
              <View style={styles.showcaseCompareHeader}><Text style={styles.showcaseCompareHeaderText}>O que muda</Text><Text style={styles.showcaseCompareHeaderText}>Giro</Text></View>
              {[
                ["Prioriza o que vence primeiro", true],
                ["Sugere uma ação prática", true],
                ["Registra o impacto gerado", true],
                ["Funciona na rotina do celular", true],
              ].map(([label, enabled]) => (
                <View key={label} style={styles.showcaseCompareRow}>
                  <Text style={styles.showcaseCompareLabel}>{label}</Text>
                  <View style={styles.showcaseCompareCheck}><Ionicons name={enabled ? "checkmark" : "close"} size={14} color="#0D6A49" /></View>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.showcaseGallery}>
            <View style={styles.showcaseGalleryCopy}>
              <Text style={styles.showcaseEyebrow}>FEITO PARA A ROTINA</Text>
              <Text style={styles.showcaseGalleryTitle}>Produtos reais, decisões mais rápidas.</Text>
              <Text style={styles.showcaseSectionText}>A interface usa imagens do catálogo para deixar cada decisão mais visual e fácil de acompanhar.</Text>
            </View>
            <View style={styles.showcaseGalleryGrid}>
              {[productImages.Padaria, productImages.Laticínios, productImages.Hortifruti, productImages.Mercearia].map((image, index) => (
                <Animated.Image
                  key={index}
                  source={image}
                  style={[styles.showcaseGalleryPhoto, { transform: [{ scale: entrance.interpolate({ inputRange: [0, 1], outputRange: [0.9, 1] }) }] }]}
                  resizeMode="cover"
                />
              ))}
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

          <View style={styles.showcaseSection}>
            <SectionTitle
              eyebrow="BASE DO PROJETO"
              title="Uma ideia documentada, uma marca reconhecível e um app organizado."
              text="Esta é a base apresentada no CP4: do problema e do público até a identidade visual e o setup técnico que sustenta a evolução do Giro."
              styles={styles}
            />
            <View style={styles.showcaseFoundationGrid}>
              {[
                ["document-text-outline", "Documentação", "README, escopo, manual de uso, roteiro de testes e decisões técnicas organizados no GitHub."],
                ["color-palette-outline", "Marca e identidade", "Nome Giro, logo do ciclo com folha, verde de impacto, laranja de ação e tipografia sans-serif nativa."],
                ["code-slash-outline", "Setup técnico", "React Native + Expo em JSX, estrutura modular de telas, componentes, hooks, serviços e dados."],
                ["sparkles-outline", "Identidade aplicada", "Telas conceituais, navegação, cartões, hierarquia visual e estados de interação formam a identidade do produto."],
              ].map(([icon, title, text]) => (
                <View key={title} style={styles.showcaseFoundationCard}>
                  <IconBox icon={icon} color="#0D6A49" background="#E9F6D5" styles={styles} />
                  <Text style={styles.showcaseFoundationTitle}>{title}</Text>
                  <Text style={styles.showcaseFoundationText}>{text}</Text>
                </View>
              ))}
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
      </Animated.ScrollView>
    </View>
  );
}
