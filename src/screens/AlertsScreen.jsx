import { Ionicons } from "@expo/vector-icons";
import { FlatList, Text, View } from "react-native";
import EmptyState from "../components/EmptyState";
import ProductCard from "../components/ProductCard";
import ScreenHeader from "../components/ScreenHeader";
import { getProductStatus } from "../utils/productDates";

export default function AlertsScreen({
  products,
  alertsEnabled,
  onBack,
  openDetail,
  styles,
}) {
  const urgent = products.filter(
    (item) => getProductStatus(item.expiry) !== "ok",
  );
  return (
    <View style={styles.screen}>
      <ScreenHeader
        title="Alertas"
        subtitle="Prioridades que pedem atenção"
        onBack={onBack}
        styles={styles}
      />
      <View
        style={[
          styles.noticeCard,
          { backgroundColor: alertsEnabled ? "#E9F7EF" : "#F1F2EF" },
        ]}
      >
        <Ionicons
          name={alertsEnabled ? "notifications" : "notifications-off"}
          size={22}
          color={alertsEnabled ? "#278657" : "#6F7872"}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.noticeTitle}>
            {alertsEnabled ? "Alertas ativados" : "Alertas pausados"}
          </Text>
          <Text style={styles.noticeText}>
            {alertsEnabled
              ? "Você verá prioridades assim que abrir o Giro."
              : "Ative novamente pela tela Conta."}
          </Text>
        </View>
      </View>
      <Text style={styles.heading}>
        {urgent.length}{" "}
        {urgent.length === 1
          ? "prioridade encontrada"
          : "prioridades encontradas"}
      </Text>
      <FlatList
        data={urgent}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            onPress={() => openDetail(item)}
            styles={styles}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            title="Nenhum alerta"
            message="Todo o estoque está dentro do prazo."
            styles={styles}
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
