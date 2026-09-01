import { Ionicons } from "@expo/vector-icons";
import { Modal, SafeAreaView, ScrollView, Text, View } from "react-native";
import ModalHeader from "../components/ModalHeader";

const tips = [
  [
    "add-circle-outline",
    "Cadastre o produto",
    "Informe quantidade e validade assim que o item chegar.",
  ],
  [
    "flame-outline",
    "Acompanhe a prioridade",
    "O Giro classifica automaticamente o que precisa de ação.",
  ],
  [
    "pricetag-outline",
    "Escolha um destino",
    "Crie uma oferta, registre uma doação ou documente o descarte.",
  ],
  [
    "pulse-outline",
    "Veja o histórico",
    "Acompanhe as decisões tomadas pela equipe.",
  ],
];

export default function HelpModal({ visible, close, styles }) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={close}
    >
      <SafeAreaView style={styles.modal}>
        <ModalHeader title="Como usar o Giro" close={close} styles={styles} />
        <ScrollView contentContainerStyle={styles.form}>
          <Text style={styles.formIntro}>
            Um fluxo simples para reduzir desperdício.
          </Text>
          {tips.map(([icon, title, text]) => (
            <View key={title} style={styles.action}>
              <View style={[styles.actionIcon, { backgroundColor: "#E9F6D5" }]}>
                <Ionicons name={icon} size={21} color="#0D6A49" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.actionLabel}>{title}</Text>
                <Text style={styles.actionSub}>{text}</Text>
              </View>
            </View>
          ))}
          <View style={styles.tip}>
            <Ionicons
              name="information-circle-outline"
              size={23}
              color="#C98415"
            />
            <Text style={styles.tipText}>
              O Giro é uma ferramenta de apoio. Confira sempre as condições
              reais e as normas sanitárias antes de vender ou doar alimentos.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}
