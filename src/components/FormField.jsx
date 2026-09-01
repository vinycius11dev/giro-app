import { Text, TextInput, View } from "react-native";

export default function FormField({ label, styles, ...props }) {
  return (
    <View style={styles.inputWrap}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="#9BA59E"
        {...props}
      />
    </View>
  );
}
