import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

export default function ModalHeader({ title, close, right, styles }) {
  return (
    <View style={styles.modalHead}>
      <Pressable onPress={close} hitSlop={12}>
        <Ionicons name="close" size={25} color="#1D3026" />
      </Pressable>
      <Text style={styles.modalTitle}>{title}</Text>
      {right || <View style={{ width: 25 }} />}
    </View>
  );
}
