import AppIcon from "./AppIcon";
import { Pressable, TextInput, View } from "react-native";

export default function SearchBar({ value, onChangeText, styles }) {
  return (
    <View
      style={[
        styles.input,
        { flexDirection: "row", alignItems: "center", marginBottom: 13 },
      ]}
    >
      <AppIcon name="search" size={19} color="#748078" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Buscar produto ou categoria"
        placeholderTextColor="#9BA59E"
        style={{ flex: 1, marginLeft: 8, color: "#1F3428", fontSize: 14 }}
      />
      {value ? (
        <Pressable onPress={() => onChangeText("")}>
          <AppIcon name="close-circle" size={19} color="#A3ADA6" />
        </Pressable>
      ) : null}
    </View>
  );
}
