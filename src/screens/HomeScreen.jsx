import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import ProductCard from "../components/ProductCard";
import QuickActionCard from "../components/QuickActionCard";
import { getProductStatus, statusInfo } from "../utils/productDates";

function Header({ title, right, action, styles }) {
  return (
    <View style={styles.header}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action ? (
        <Pressable onPress={action}>
          <Text style={styles.link}>Ver todos</Text>
        </Pressable>
      ) : (
        <Text style={styles.month}>{right}</Text>
      )}
    </View>
  );
}

function Metric({ value, text, tone, styles }) {
  const info = statusInfo[tone];
  return (
    <View style={[styles.metric, { backgroundColor: info.bg }]}>
      <Ionicons name={info.icon} size={18} color={info.color} />
      <Text style={[styles.metricNumber, { color: info.color }]}>{value}</Text>
      <Text style={styles.metricText}>{text}</Text>
    </View>
  );
}

function EmptyState({ text, styles }) {
  return (
    <View style={styles.empty}>
      <Ionicons name="leaf-outline" size={25} color="#77A990" />
      <Text style={styles.emptyText}>{text}</Text>
    </View>
  );
}

export default function HomeScreen({
  stats,
  history,
  products,
  profile,
  openDetail,
  goProducts,
  openForm,
  openScreen,
  styles,
}) {
  const initials = profile.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
  const urgent = products
    .filter((item) => getProductStatus(item.expiry) !== "ok")
    .slice(0, 3);
  return (
    <ScrollView
      contentContainerStyle={styles.scroll}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.top}>
        <View style={styles.brand}>
          <Image
            source={require("../../assets/giro-logo.png")}
            style={styles.logo}
            resizeMode="contain"
            accessibilityLabel="Logo do Giro"
          />
          <Text style={styles.brandText}>giro</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
      </View>
      <Text style={styles.hello}>Olá, {profile.name.split(" ")[0]}.</Text>
      <Text style={styles.subhello}>Vamos fazer cada produto girar?</Text>
      <LinearGradient colors={["#0D6748", "#258B61"]} style={styles.hero}>
        <View style={styles.glow} />
        <Text style={styles.eyebrow}>VISÃO DE HOJE</Text>
        <Text style={styles.heroTitle}>
          {stats.today
            ? `${stats.today} item${stats.today > 1 ? "s precisam" : " precisa"} de você`
            : "Tudo sob controle"}
        </Text>
        <Text style={styles.heroText}>
          {stats.today
            ? "Crie uma oferta ou doe antes que vençam."
            : "Seus produtos estão dentro do prazo."}
        </Text>
        <View style={styles.leaf}>
          <Ionicons
            name={stats.today ? "leaf" : "checkmark"}
            size={33}
            color="#E9F6D5"
          />
        </View>
        <Pressable style={styles.heroButton} onPress={goProducts}>
          <Text style={styles.heroButtonText}>Ver produtos</Text>
          <Ionicons name="arrow-forward" size={16} color="#0D6748" />
        </Pressable>
      </LinearGradient>
      <Header
        title="Panorama do estoque"
        right={new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(
          new Date(),
        )}
        styles={styles}
      />
      <View style={styles.metrics}>
        <Metric
          value={stats.today}
          text="Agir hoje"
          tone="today"
          styles={styles}
        />
        <Metric value={stats.soon} text="Atenção" tone="soon" styles={styles} />
        <Metric value={stats.ok} text="Em dia" tone="ok" styles={styles} />
      </View>
      <Pressable style={styles.impactSummary} onPress={() => openScreen("impact")}>
        <View style={styles.impactSummaryHead}>
          <View>
            <Text style={styles.impactSummaryEyebrow}>IMPACTO DO GIRO</Text>
            <Text style={styles.impactSummaryTitle}>Cada ação conta</Text>
          </View>
          <View style={styles.impactSummaryBadge}>
            <Text style={styles.impactSummaryBadgeText}>{inventorySafeRate(history)}%</Text>
          </View>
        </View>
        <Text style={styles.impactSummaryText}>
          {history.length
            ? `${history.length} ${history.length === 1 ? "ação registrada" : "ações registradas"} no histórico.`
            : "Registre sua primeira oferta ou doação."}
        </Text>
        <View style={styles.impactProgressTrack}>
          <View style={[styles.impactProgressFill, { width: `${inventorySafeRate(history)}%` }]} />
        </View>
      </Pressable>
      <Header title="Gestão inteligente" styles={styles} />
      <View style={styles.quickGrid}>
        <QuickActionCard
          icon="notifications-outline"
          title="Alertas"
          text={`${stats.today + stats.soon} prioridades`}
          color="#E76832"
          background="#FFF0E8"
          onPress={() => openScreen("alerts")}
          styles={styles}
        />
        <QuickActionCard
          icon="sparkles-outline"
          title="Oportunidades"
          text="Sugestões de giro"
          color="#C98415"
          background="#FFF6DD"
          onPress={() => openScreen("opportunities")}
          styles={styles}
        />
        <QuickActionCard
          icon="bar-chart-outline"
          title="Relatórios"
          text="Resumo do estoque"
          color="#0D6A49"
          background="#E9F7EF"
          onPress={() => openScreen("insights")}
          styles={styles}
        />
        <QuickActionCard
          icon="leaf-outline"
          title="Impacto"
          text="Resultados positivos"
          color="#278657"
          background="#E9F6D5"
          onPress={() => openScreen("impact")}
          styles={styles}
        />
      </View>
      <Header title="Precisam de giro" action={goProducts} styles={styles} />
      {urgent.length ? (
        urgent.map((item) => (
          <ProductCard
            key={item.id}
            item={item}
            onPress={() => openDetail(item)}
            styles={styles}
          />
        ))
      ) : (
        <EmptyState text="Nenhum item urgente por enquanto." styles={styles} />
      )}
      <Pressable style={styles.mainButton} onPress={() => openForm()}>
        <Ionicons name="add-circle" size={20} color="#fff" />
        <Text style={styles.mainButtonText}>Adicionar produto</Text>
      </Pressable>
    </ScrollView>
  );
}

function inventorySafeRate(history) {
  if (!history.length) return 0;
  const rescued = history.filter((item) => item.action !== "Item descartado").length;
  return Math.round((rescued / history.length) * 100);
}
