import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

export default function ScreenHeader({ title, subtitle, onBack, styles }) {
  return (
    <View style={styles.subScreenHeader}>
      <Pressable
        style={styles.backButton}
        onPress={onBack}
        hitSlop={10}
        accessibilityRole="button"
        accessibilityLabel="Voltar"
      >
        <Ionicons name="arrow-back" size={21} color="#0D6A49" />
      </Pressable>
      <View style={{ flex: 1 }}>
        <Text style={styles.subScreenTitle}>{title}</Text>
        <Text style={styles.subScreenSubtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}
