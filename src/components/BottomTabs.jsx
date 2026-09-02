import AppIcon from "./AppIcon";
import { Pressable, Text, View } from "react-native";

const tabs = [
  ["home", "Início", "home-outline", "home"],
  ["products", "Produtos", "cube-outline", "cube"],
  ["history", "Histórico", "pulse-outline", "pulse"],
  ["profile", "Conta", "person-outline", "person"],
];

export default function BottomTabs({ active, setActive, styles }) {
  return (
    <View style={styles.tabs}>
      {tabs.map(([id, label, outline, filled]) => (
        <Pressable key={id} style={styles.tab} onPress={() => setActive(id)}>
          <AppIcon
            name={active === id ? filled : outline}
            size={22}
            color={active === id ? "#0D6A49" : "#9AA49D"}
          />
          <Text style={[styles.tabText, active === id && styles.tabTextActive]}>
            {label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
