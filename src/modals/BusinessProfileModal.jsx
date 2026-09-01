import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
} from "react-native";
import FormField from "../components/FormField";
import ModalHeader from "../components/ModalHeader";
import { formatCep, lookupCep } from "../services/cep";

export default function BusinessProfileModal({
  visible,
  profile,
  close,
  onSave,
  styles,
}) {
  const [form, setForm] = useState({ ...profile, cep: profile.cep || "", address: profile.address || "" });
  const [cepError, setCepError] = useState("");
  const [cepLoading, setCepLoading] = useState(false);
  useEffect(() => {
    if (visible) {
      setForm({ ...profile, cep: profile.cep || "", address: profile.address || "" });
      setCepError("");
    }
  }, [profile, visible]);

  async function searchCep() {
    setCepError("");
    if (form.cep.replace(/\D/g, "").length !== 8) {
      setCepError("Digite um CEP com 8 números.");
      return;
    }
    setCepLoading(true);
    try {
      const data = await lookupCep(form.cep);
      setForm((current) => ({
        ...current,
        cep: formatCep(form.cep),
        address: [data.logradouro, data.bairro].filter(Boolean).join(", "),
        city: [data.localidade, data.uf].filter(Boolean).join(", "),
      }));
    } catch (lookupError) {
      setCepError(lookupError.message || "Não foi possível consultar o CEP.");
    } finally {
      setCepLoading(false);
    }
  }

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
      cep: formatCep(form.cep || ""),
      address: (form.address || "").trim(),
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
          <FormField
            label="CEP"
            value={form.cep}
            onChangeText={(cep) => {
              setCepError("");
              setForm({ ...form, cep: formatCep(cep) });
            }}
            placeholder="00000-000"
            keyboardType="numeric"
            maxLength={9}
            styles={styles}
          />
          <Pressable
            style={({ pressed }) => [styles.cepLookupButton, styles.modalCepLookup, pressed && { opacity: 0.82 }]}
            onPress={searchCep}
            disabled={cepLoading}
            accessibilityRole="button"
            accessibilityLabel="Buscar endereço pelo CEP"
          >
            {cepLoading ? <ActivityIndicator size="small" color="#0D6A49" /> : <Ionicons name="search-outline" size={16} color="#0D6A49" />}
            <Text style={styles.cepLookupText}>{cepLoading ? "Consultando CEP..." : "Buscar endereço pelo CEP"}</Text>
          </Pressable>
          {cepError ? <Text style={styles.cepError}>{cepError} Você ainda pode preencher os campos manualmente.</Text> : null}
          <FormField
            label="Endereço"
            value={form.address}
            onChangeText={(address) => setForm({ ...form, address })}
            placeholder="Rua, número e bairro"
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
