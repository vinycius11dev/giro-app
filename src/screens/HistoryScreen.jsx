import { Ionicons } from "@expo/vector-icons";
import { FlatList, Text, View } from "react-native";
import EmptyState from "../components/EmptyState";

function HistoryItem({ item, styles }) {
  const color = item.tone === "orange" ? "#E76832" : "#278657";
  const bg = item.tone === "orange" ? "#FFF0E8" : "#E9F7EF";
  return (
    <View style={styles.historyItem}>
      <View style={[styles.historyIcon, { backgroundColor: bg }]}>
        <Ionicons name={item.icon} size={19} color={color} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.historyProduct}>{item.product}</Text>
        <Text style={styles.historyAction}>{item.action}</Text>
      </View>
      <Text style={styles.historyDate}>{item.date}</Text>
    </View>
  );
}

export default function HistoryScreen({ history, styles }) {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Histórico</Text>
      <Text style={styles.subtitle}>
        Cada decisão que evita desperdício conta.
      </Text>
      <View style={styles.impact}>
        <View style={styles.impactIcon}>
          <Ionicons name="leaf" size={22} color="#0D6A49" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.impactTitle}>Seu giro já fez diferença</Text>
          <Text style={styles.impactText}>
            {history.length} ações registradas para aproveitar melhor o estoque.
          </Text>
        </View>
      </View>
      <Text style={styles.heading}>Atividades recentes</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <HistoryItem item={item} styles={styles} />}
        ListEmptyComponent={
          <EmptyState
            title="Histórico vazio"
            message="As ações concluídas aparecerão aqui."
            styles={styles}
          />
        }
      />
    </View>
  );
}
