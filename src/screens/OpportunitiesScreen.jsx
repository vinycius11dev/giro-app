import { Ionicons } from "@expo/vector-icons";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import EmptyState from "../components/EmptyState";
import ScreenHeader from "../components/ScreenHeader";
import { categoryIcons, productImages } from "../data/initialData";
import { getDueText, getProductStatus } from "../utils/productDates";

export default function OpportunitiesScreen({
  products,
  onBack,
  openDetail,
  styles,
}) {
  const opportunities = products.filter(
    (item) => getProductStatus(item.expiry) !== "ok",
  );
  return (
    <View style={styles.screen}>
      <ScreenHeader
        title="Oportunidades"
        subtitle="Sugestões para recuperar valor"
        onBack={onBack}
        styles={styles}
      />
      <View style={styles.opportunityHero}>
        <Ionicons name="sparkles" size={24} color="#C98415" />
        <Text style={styles.opportunityHeroTitle}>
          Transforme urgência em venda
        </Text>
        <Text style={styles.opportunityHeroText}>
          O Giro recomenda descontos indicativos. A decisão final continua sendo
          do estabelecimento.
        </Text>
      </View>
      <FlatList
        data={opportunities}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 20 }}
        renderItem={({ item }) => {
          const today = getProductStatus(item.expiry) === "today";
          return (
            <Pressable
              style={styles.opportunityCard}
              onPress={() => openDetail(item)}
            >
              <View style={styles.productIcon}>
                {item.image || productImages[item.category] ? (
                  <Image
                    source={item.image || productImages[item.category]}
                    style={styles.productImage}
                    resizeMode="cover"
                    accessibilityLabel={`Foto de ${item.name}`}
                  />
                ) : (
                  <Ionicons
                    name={categoryIcons[item.category] || "cube-outline"}
                    size={24}
                    color="#0D6A49"
                  />
                )}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.meta}>{getDueText(item.expiry)}</Text>
                <Text
                  style={[
                    styles.recommendation,
                    { color: today ? "#E76832" : "#C98415" },
                  ]}
                >
                  Sugestão:{" "}
                  {today ? "até 30% de desconto" : "até 15% de desconto"}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={19} color="#B6BEB8" />
            </Pressable>
          );
        }}
        ListEmptyComponent={
          <EmptyState
            title="Sem oportunidades urgentes"
            message="Novas sugestões aparecerão quando um item se aproximar da validade."
            styles={styles}
          />
        }
      />
    </View>
  );
}
