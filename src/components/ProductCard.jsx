import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";
import { categoryIcons, productImages } from "../data/initialData";
import {
  getDueText,
  getProductStatus,
  statusInfo,
} from "../utils/productDates";

export default function ProductCard({ item, onPress, styles }) {
  const info = statusInfo[getProductStatus(item.expiry)];
  return (
    <Pressable style={styles.card} onPress={onPress}>
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
        <Text style={styles.productName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.meta}>
          {item.quantity} {item.category === "Hortifruti" ? "kg" : "un."} •{" "}
          {item.category}
        </Text>
        <View style={[styles.pill, { backgroundColor: info.bg }]}>
          <Ionicons name={info.icon} size={12} color={info.color} />
          <Text style={[styles.pillText, { color: info.color }]}>
            {getDueText(item.expiry)}
          </Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={19} color="#B6BEB8" />
    </Pressable>
  );
}
