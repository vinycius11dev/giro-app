import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

export default function QuickActionCard({
  icon,
  title,
  text,
  color,
  background,
  onPress,
  styles,
}) {
  return (
    <Pressable style={styles.quickCard} onPress={onPress}>
      <View style={[styles.quickIcon, { backgroundColor: background }]}>
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <Text style={styles.quickTitle}>{title}</Text>
      <Text style={styles.quickText}>{text}</Text>
      <Ionicons name="arrow-forward" size={16} color="#9AA59E" />
    </Pressable>
  );
}
