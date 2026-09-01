import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function EmptyState({
  title = "Nada por aqui",
  message,
  styles,
}) {
  return (
    <View style={styles.empty}>
      <Ionicons name="leaf-outline" size={27} color="#77A990" />
      <Text style={[styles.emptyText, { fontWeight: "800", color: "#314238" }]}>
        {title}
      </Text>
      <Text style={styles.emptyText}>{message}</Text>
    </View>
  );
}
