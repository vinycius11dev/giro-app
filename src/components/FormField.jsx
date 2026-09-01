import { Text, TextInput, View } from "react-native";

export default function FormField({ label, styles, rightAction, ...props }) {
  return (
    <View style={styles.inputWrap}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={rightAction ? styles.cepFieldRow : undefined}>
        <TextInput
          style={[styles.input, rightAction && styles.cepModalInput]}
          placeholderTextColor="#9BA59E"
          {...props}
        />
        {rightAction}
      </View>
    </View>
  );
}
