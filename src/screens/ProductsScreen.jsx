import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { FlatList, Pressable, ScrollView, Text, View } from "react-native";
import EmptyState from "../components/EmptyState";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import { getProductStatus } from "../utils/productDates";

const filters = [
  ["all", "Todos"],
  ["today", "Agir hoje"],
  ["soon", "Atenção"],
  ["ok", "Em dia"],
];

export default function ProductsScreen({
  products,
  openDetail,
  openForm,
  styles,
}) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const visibleProducts = useMemo(
    () =>
      products.filter((item) => {
        const matchesFilter =
          filter === "all" || getProductStatus(item.expiry) === filter;
        const term = search.trim().toLocaleLowerCase("pt-BR");
        const matchesSearch =
          !term ||
          `${item.name} ${item.category}`
            .toLocaleLowerCase("pt-BR")
            .includes(term);
        return matchesFilter && matchesSearch;
      }),
    [filter, products, search],
  );
  return (
    <View style={styles.screen}>
      <View style={styles.listHead}>
        <View>
          <Text style={styles.title}>Produtos</Text>
          <Text style={styles.subtitle}>Seu estoque, sempre no giro.</Text>
        </View>
        <Pressable style={styles.plus} onPress={() => openForm()}>
          <Ionicons name="add" size={25} color="#fff" />
        </Pressable>
      </View>
      <SearchBar value={search} onChangeText={setSearch} styles={styles} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filters}
      >
        {filters.map(([id, label]) => (
          <Pressable
            key={id}
            style={[styles.chip, filter === id && styles.chipActive]}
            onPress={() => setFilter(id)}
          >
            <Text
              style={[styles.chipText, filter === id && styles.chipTextActive]}
            >
              {label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
      <Text style={[styles.subtitle, { marginBottom: 10 }]}>
        {visibleProducts.length}{" "}
        {visibleProducts.length === 1
          ? "produto encontrado"
          : "produtos encontrados"}
      </Text>
      <FlatList
        data={visibleProducts}
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            onPress={() => openDetail(item)}
            styles={styles}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <EmptyState
            title="Nenhum produto encontrado"
            message="Tente outro filtro ou termo de busca."
            styles={styles}
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
