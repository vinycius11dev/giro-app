import AppIcon from "../components/AppIcon";
import { Image, Modal, SafeAreaView, ScrollView, Text, View } from "react-native";
import ModalHeader from "../components/ModalHeader";

const points = [
  ["code-slash-outline", "React Native + Expo", "Aplicativo multiplataforma desenvolvido em JSX."],
  ["cloud-offline-outline", "Offline-first", "Os dados principais ficam disponíveis no dispositivo."],
  ["leaf-outline", "ODS 12 e ODS 2", "Redução do desperdício e incentivo ao aproveitamento de alimentos."],
];

export default function AboutModal({ visible, close, styles }) {
  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={close}>
      <SafeAreaView style={styles.modal}>
        <ModalHeader title="Sobre o projeto" close={close} styles={styles} />
        <ScrollView contentContainerStyle={styles.form} showsVerticalScrollIndicator={false}>
          <View style={styles.aboutBrand}>
            <Image source={require("../../assets/giro-logo.png")} style={styles.aboutLogo} resizeMode="contain" />
            <View>
              <Text style={styles.aboutTitle}>Giro</Text>
              <Text style={styles.aboutVersion}>CP4 · CP5 · CP6</Text>
            </View>
          </View>
          <Text style={styles.formIntro}>
            O Giro transforma datas de validade em decisões práticas para pequenos negócios de alimentos.
          </Text>
          {points.map(([icon, title, text]) => (
            <View key={title} style={styles.action}>
              <View style={[styles.actionIcon, { backgroundColor: "#E9F6D5" }]}>
                <AppIcon name={icon} size={21} color="#0D6A49" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.actionLabel}>{title}</Text>
                <Text style={styles.actionSub}>{text}</Text>
              </View>
            </View>
          ))}
          <View style={styles.aboutCallout}>
            <Text style={styles.aboutCalloutTitle}>Nossa proposta</Text>
            <Text style={styles.aboutCalloutText}>
              Ajudar equipes a agir antes que um produto vire prejuízo, escolhendo entre acompanhar, ofertar, doar ou registrar o descarte.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}
