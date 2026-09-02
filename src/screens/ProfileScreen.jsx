import AppIcon from "../components/AppIcon";
import { ScrollView, Text, View } from "react-native";
import SettingRow from "../components/SettingRow";

function Stat({ value, label, styles }) {
  return (
    <View style={styles.profileStat}>
      <Text style={styles.profileValue}>{value}</Text>
      <Text style={styles.profileLabel}>{label}</Text>
    </View>
  );
}
export default function ProfileScreen({
  products,
  history,
  profile,
  alertsEnabled,
  darkMode,
  largeText,
  impactRate,
  plan,
  onEditProfile,
  onToggleAlerts,
  onToggleDarkMode,
  onToggleLargeText,
  onHelp,
  onAbout,
  onSubscription,
  onRestartOnboarding,
  onReset,
  onLogout,
  styles,
}) {
  const initials = profile.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      <View style={styles.profileTop}>
        <View style={styles.bigAvatar}>
          <Text style={styles.bigAvatarText}>{initials}</Text>
        </View>
        <Text style={styles.profileName}>{profile.name}</Text>
        <Text style={styles.profileBusiness}>
          {profile.business} • {profile.city}
        </Text>
      </View>
      <View style={styles.profileStats}>
        <Stat value={products.length} label="Itens ativos" styles={styles} />
        <Stat value={history.length} label="Ações" styles={styles} />
        <Stat value={`${impactRate}%`} label="Aproveitamento" styles={styles} />
      </View>
      <Text style={styles.heading}>Sua conta</Text>
      <SettingRow
        icon="business-outline"
        text="Meu estabelecimento"
        onPress={onEditProfile}
        styles={styles}
      />
      <SettingRow
        icon="sparkles-outline"
        text="Plano Giro"
        right={plan === "pro" ? "Pro ativo" : "Grátis"}
        onPress={onSubscription}
        styles={styles}
      />
      <SettingRow
        icon="notifications-outline"
        text="Alertas de validade"
        switchValue={alertsEnabled}
        onToggle={onToggleAlerts}
        styles={styles}
      />
      <SettingRow
        icon="moon-outline"
        text="Modo escuro"
        switchValue={darkMode}
        onToggle={onToggleDarkMode}
        styles={styles}
      />
      <SettingRow
        icon="text-outline"
        text="Texto maior"
        switchValue={largeText}
        onToggle={onToggleLargeText}
        styles={styles}
      />
      <SettingRow
        icon="help-circle-outline"
        text="Central de ajuda"
        onPress={onHelp}
        styles={styles}
      />
      <SettingRow
        icon="information-circle-outline"
        text="Sobre o projeto"
        onPress={onAbout}
        styles={styles}
      />
      <SettingRow
        icon="sparkles-outline"
        text="Ver introdução novamente"
        onPress={onRestartOnboarding}
        styles={styles}
      />
      <SettingRow
        icon="refresh-outline"
        text="Restaurar dados de demonstração"
        onPress={onReset}
        styles={styles}
      />
      <SettingRow
        icon="log-out-outline"
        text="Sair da conta"
        onPress={onLogout}
        styles={styles}
      />
      <View style={styles.tip}>
        <AppIcon name="bulb-outline" size={23} color="#C98415" />
        <Text style={styles.tipText}>
          Dica Giro: registre os produtos assim que chegarem para receber
          alertas no momento certo.
        </Text>
      </View>
    </ScrollView>
  );
}
