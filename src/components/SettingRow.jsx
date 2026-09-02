import AppIcon from "./AppIcon";
import { Pressable, Switch, Text, View } from "react-native";

export default function SettingRow({
  icon,
  text,
  right,
  onPress,
  switchValue,
  onToggle,
  styles,
}) {
  return (
    <Pressable
      style={styles.setting}
      onPress={onPress}
      disabled={!onPress && !onToggle}
    >
      <View style={styles.settingIcon}>
        <AppIcon name={icon} size={19} color="#0D6A49" />
      </View>
      <Text style={styles.settingText}>{text}</Text>
      {typeof switchValue === "boolean" ? (
        <Switch
          value={switchValue}
          onValueChange={onToggle}
          trackColor={{ false: "#DCE1DD", true: "#8FCBA9" }}
          thumbColor={switchValue ? "#0D6A49" : "#fff"}
        />
      ) : (
        <>
          {right && <Text style={styles.settingRight}>{right}</Text>}
          <AppIcon name="chevron-forward" size={18} color="#AAB2AC" />
        </>
      )}
    </Pressable>
  );
}
