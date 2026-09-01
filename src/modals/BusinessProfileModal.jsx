import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
} from "react-native";
import FormField from "../components/FormField";
import ModalHeader from "../components/ModalHeader";

export default function BusinessProfileModal({
  visible,
  profile,
  close,
  onSave,
  styles,
}) {
  const [form, setForm] = useState(profile);
  useEffect(() => {
    if (visible) setForm(profile);
  }, [profile, visible]);
  function submit() {
    if (!form.name.trim() || !form.business.trim() || !form.city.trim())
      return Alert.alert(
        "Confira os dados",
        "Preencha seu nome, estabelecimento e cidade.",
      );
    onSave({
      name: form.name.trim(),
      business: form.business.trim(),
      city: form.city.trim(),
    });
    close();
  }
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={close}
    >
      <SafeAreaView style={styles.modal}>
        <ModalHeader
          title="Meu estabelecimento"
          close={close}
          styles={styles}
        />
        <ScrollView
          contentContainerStyle={styles.form}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.formIntro}>
            Esses dados aparecem na tela de conta.
          </Text>
          <FormField
            label="Seu nome"
            value={form.name}
            onChangeText={(name) => setForm({ ...form, name })}
            styles={styles}
          />
          <FormField
            label="Nome do estabelecimento"
            value={form.business}
            onChangeText={(business) => setForm({ ...form, business })}
            styles={styles}
          />
          <FormField
            label="Cidade e estado"
            value={form.city}
            onChangeText={(city) => setForm({ ...form, city })}
            styles={styles}
          />
          <Pressable style={styles.save} onPress={submit}>
            <Text style={styles.saveText}>Salvar perfil</Text>
            <Ionicons name="checkmark" size={19} color="#fff" />
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}
