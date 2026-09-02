import AppIcon from "../components/AppIcon";
import { Alert, Modal, Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import ModalHeader from "../components/ModalHeader";

function limitText(value) {
  return Number.isFinite(value) ? String(value) : "Ilimitado";
}

function UsageRow({ label, used, limit, styles }) {
  const percentage = Number.isFinite(limit) ? Math.min(100, Math.round((used / limit) * 100)) : 14;
  return (
    <View style={styles.subscriptionUsageRow}>
      <View style={styles.subscriptionUsageHeader}>
        <Text style={styles.subscriptionUsageLabel}>{label}</Text>
        <Text style={styles.subscriptionUsageValue}>{used} / {limitText(limit)}</Text>
      </View>
      <View style={styles.subscriptionProgressTrack}>
        <View style={[styles.subscriptionProgressFill, { width: `${percentage}%` }]} />
      </View>
    </View>
  );
}

export default function SubscriptionModal({ visible, close, plan, subscription, onUpgrade, styles }) {
  const isPro = plan === "pro";
  function activatePro() {
    if (isPro) return;
    Alert.alert(
      "Ativar Giro Pro?",
      "Esta demonstração simula a assinatura e não realiza nenhuma cobrança.",
      [
        { text: "Agora não", style: "cancel" },
        { text: "Ativar Pro", onPress: onUpgrade },
      ],
    );
  }

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={close}>
      <SafeAreaView style={styles.modal}>
        <ModalHeader title="Planos do Giro" close={close} styles={styles} />
        <ScrollView contentContainerStyle={styles.subscriptionContent} showsVerticalScrollIndicator={false}>
          <View style={styles.subscriptionHero}>
            <View style={styles.subscriptionHeroIcon}><AppIcon name="sparkles" size={24} color="#0D6A49" /></View>
            <Text style={styles.subscriptionEyebrow}>CRESÇA SEM DESPERDÍCIO</Text>
            <Text style={styles.subscriptionTitle}>Mais giro para o seu negócio.</Text>
            <Text style={styles.subscriptionSubtitle}>Comece grátis e evolua quando sua operação pedir mais escala.</Text>
          </View>

          <View style={styles.subscriptionCurrentCard}>
            <View style={styles.subscriptionCurrentTop}>
              <View>
                <Text style={styles.subscriptionCurrentLabel}>SEU PLANO ATUAL</Text>
                <Text style={styles.subscriptionCurrentName}>{isPro ? "Giro Pro" : "Giro Essencial"}</Text>
              </View>
              <View style={[styles.subscriptionPlanPill, isPro && styles.subscriptionPlanPillPro]}>
                <Text style={styles.subscriptionPlanPillText}>{isPro ? "PRO" : "GRÁTIS"}</Text>
              </View>
            </View>
            <UsageRow label="Produtos ativos" used={subscription.activeProducts} limit={subscription.limits.maxActiveProducts} styles={styles} />
            <UsageRow label="Cadastros neste mês" used={subscription.usage.registrations} limit={subscription.limits.monthlyRegistrations} styles={styles} />
            <UsageRow label="Ações neste mês" used={subscription.usage.actions} limit={subscription.limits.monthlyActions} styles={styles} />
          </View>

          <Text style={styles.subscriptionSectionTitle}>Escolha o plano ideal</Text>
          <View style={[styles.subscriptionPlanCard, !isPro && styles.subscriptionPlanCardActive]}>
            <View style={styles.subscriptionPlanHeader}>
              <View><Text style={styles.subscriptionPlanName}>Giro Essencial</Text><Text style={styles.subscriptionPlanPrice}>Grátis para começar</Text></View>
              {!isPro ? <View style={styles.subscriptionSelected}><AppIcon name="checkmark" size={14} color="#fff" /></View> : null}
            </View>
            {[
              `Até ${subscription.limits.maxActiveProducts} produtos ativos`,
              `${subscription.limits.monthlyRegistrations} cadastros por mês`,
              `${subscription.limits.monthlyActions} ações por mês`,
              "1 estabelecimento",
            ].map((item) => <View key={item} style={styles.subscriptionFeature}><AppIcon name="checkmark-circle" size={17} color="#278657" /><Text style={styles.subscriptionFeatureText}>{item}</Text></View>)}
          </View>

          <View style={[styles.subscriptionPlanCard, styles.subscriptionPlanCardPro, isPro && styles.subscriptionPlanCardActivePro]}>
            <View style={styles.subscriptionProBadge}><AppIcon name="sparkles" size={13} color="#765514" /><Text style={styles.subscriptionProBadgeText}>RECOMENDADO PARA CRESCER</Text></View>
            <View style={styles.subscriptionPlanHeader}>
              <View><Text style={styles.subscriptionPlanName}>Giro Pro</Text><Text style={styles.subscriptionPlanPrice}>Assinatura mensal</Text></View>
              {isPro ? <View style={styles.subscriptionSelectedPro}><AppIcon name="checkmark" size={14} color="#fff" /></View> : null}
            </View>
            {["Produtos e cadastros ilimitados", "Até 5 estabelecimentos", "Relatórios avançados e exportação", "Notificações inteligentes", "Suporte prioritário"].map((item) => <View key={item} style={styles.subscriptionFeature}><AppIcon name="checkmark-circle" size={17} color="#E76832" /><Text style={styles.subscriptionFeatureText}>{item}</Text></View>)}
            <Pressable style={({ pressed }) => [styles.subscriptionCta, pressed && { opacity: 0.82 }]} onPress={activatePro} disabled={isPro} accessibilityRole="button">
              <Text style={styles.subscriptionCtaText}>{isPro ? "Plano Pro ativo" : "Ativar Giro Pro (simulação)"}</Text>
              <AppIcon name={isPro ? "checkmark" : "arrow-forward"} size={17} color="#fff" />
            </Pressable>
          </View>
          <Text style={styles.subscriptionDisclaimer}>A assinatura real será conectada a um provedor de pagamentos em uma próxima versão. Nesta entrega, a ativação é local para demonstração do modelo de negócio.</Text>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}
