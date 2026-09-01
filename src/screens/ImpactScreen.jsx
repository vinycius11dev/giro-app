import { Ionicons } from "@expo/vector-icons";
import { FlatList, Text, View } from "react-native";
import EmptyState from "../components/EmptyState";
import ScreenHeader from "../components/ScreenHeader";

export default function ImpactScreen({ history, impactRate, onBack, styles }) {
  const donations = history.filter(
    (item) => item.action === "Doação registrada",
  ).length;
  const offers = history.filter(
    (item) => item.action === "Oferta criada",
  ).length;
  const discarded = history.filter(
    (item) => item.action === "Item descartado",
  ).length;
  return (
    <View style={styles.screen}>
      <ScreenHeader
        title="Impacto"
        subtitle="Resultados das decisões do estoque"
        onBack={onBack}
        styles={styles}
      />
      <View style={styles.impactHero}>
        <Text style={styles.impactHeroValue}>{impactRate}%</Text>
        <Text style={styles.impactHeroTitle}>de aproveitamento registrado</Text>
        <Text style={styles.impactHeroText}>
          Ofertas e doações contam como produtos recuperados.
        </Text>
      </View>
      <View style={styles.impactStats}>
        <View style={styles.impactStat}>
          <Ionicons name="pricetag-outline" size={19} color="#E76832" />
          <Text style={styles.impactStatValue}>{offers}</Text>
          <Text style={styles.impactStatLabel}>Ofertas</Text>
        </View>
        <View style={styles.impactStat}>
          <Ionicons name="heart-outline" size={19} color="#278657" />
          <Text style={styles.impactStatValue}>{donations}</Text>
          <Text style={styles.impactStatLabel}>Doações</Text>
        </View>
        <View style={styles.impactStat}>
          <Ionicons name="trash-outline" size={19} color="#6F7872" />
          <Text style={styles.impactStatValue}>{discarded}</Text>
          <Text style={styles.impactStatLabel}>Descartes</Text>
        </View>
      </View>
      <Text style={styles.heading}>Linha do tempo</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.impactTimeline}>
            <View style={styles.timelineDot} />
            <View style={{ flex: 1 }}>
              <Text style={styles.historyProduct}>{item.product}</Text>
              <Text style={styles.historyAction}>{item.action}</Text>
            </View>
            <Text style={styles.historyDate}>{item.date}</Text>
          </View>
        )}
        ListEmptyComponent={
          <EmptyState
            title="Sem impacto registrado"
            message="Conclua ofertas ou doações para acompanhar os resultados."
            styles={styles}
          />
        }
      />
    </View>
  );
}
