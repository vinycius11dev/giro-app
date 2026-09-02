import AppIcon from "../components/AppIcon";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { formatCep, lookupCep } from "../services/cep";

function Field({ icon, label, value, onChangeText, placeholder, secure, styles, rightAction, ...inputProps }) {
  return (
    <View>
      <Text style={styles.authLabel}>{label}</Text>
      <View style={rightAction ? styles.cepFieldRow : undefined}>
        <View style={[styles.authInputWrap, rightAction && styles.cepInputWrap]}>
          <AppIcon name={icon} size={18} color="#7A8980" />
          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor="#A3ACA6"
            secureTextEntry={secure}
            autoCapitalize={secure ? "none" : "words"}
            style={styles.authInput}
            {...inputProps}
          />
        </View>
        {rightAction}
      </View>
    </View>
  );
}

export default function SignUpScreen({ onBack, onCreateAccount, styles }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    business: "",
    cep: "",
    address: "",
    city: "",
  });
  const [error, setError] = useState("");
  const [cepError, setCepError] = useState("");
  const [cepLoading, setCepLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const update = (key) => (value) => {
    setForm((current) => ({ ...current, [key]: value }));
    setError("");
    if (key === "cep") setCepError("");
  };

  async function searchCep() {
    setCepError("");
    if (form.cep.replace(/\D/g, "").length !== 8) {
      setCepError("Digite um CEP com 8 números.");
      return;
    }
    setCepLoading(true);
    try {
      const data = await lookupCep(form.cep);
      const address = [data.logradouro, data.bairro].filter(Boolean).join(", ");
      setForm((current) => ({
        ...current,
        cep: formatCep(form.cep),
        address,
        city: [data.localidade, data.uf].filter(Boolean).join(", "),
      }));
    } catch (lookupError) {
      setCepError(lookupError.message || "Não foi possível consultar o CEP.");
    } finally {
      setCepLoading(false);
    }
  }

  async function submit() {
    if (!form.name.trim() || !form.email.trim() || !form.password) {
      setError("Preencha nome, e-mail e senha para criar sua conta.");
      return;
    }
    if (!form.email.includes("@")) {
      setError("Digite um e-mail válido.");
      return;
    }
    if (form.password.length < 6) {
      setError("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }
    setLoading(true);
    await onCreateAccount(form);
    setLoading(false);
  }

  return (
    <KeyboardAvoidingView
      style={styles.authScreen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.authContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Pressable style={styles.authBack} onPress={onBack}>
          <AppIcon name="arrow-back" size={20} color="#0D6A49" />
          <Text style={styles.authBackText}>Voltar para entrar</Text>
        </Pressable>
        <View style={styles.authBrand}>
          <Image
            source={require("../../assets/giro-logo.png")}
            style={styles.authLogo}
            resizeMode="contain"
            accessibilityLabel="Logo do Giro"
          />
          <Text style={styles.authBrandText}>giro</Text>
        </View>
        <Text style={styles.authEyebrow}>COMECE AGORA</Text>
        <Text style={styles.authTitle}>Crie sua conta Giro.</Text>
        <Text style={styles.authSubtitle}>
          Organize o estoque do seu estabelecimento em poucos passos.
        </Text>
        <View style={styles.authForm}>
          <Field icon="person-outline" label="Seu nome" value={form.name} onChangeText={update("name")} placeholder="Ex.: Marina Costa" styles={styles} />
          <Field icon="mail-outline" label="E-mail" value={form.email} onChangeText={update("email")} placeholder="voce@empresa.com" styles={styles} />
          <Field icon="lock-closed-outline" label="Senha" value={form.password} onChangeText={update("password")} placeholder="Mínimo de 6 caracteres" secure styles={styles} />
          <View>
            <Field
              icon="navigate-outline"
              label="CEP (opcional)"
              value={form.cep}
              onChangeText={(value) => update("cep")(formatCep(value))}
              placeholder="00000-000"
              keyboardType="numeric"
              maxLength={9}
              styles={styles}
              rightAction={(
                <Pressable
                  style={({ pressed }) => [styles.cepLookupButton, pressed && { opacity: 0.82 }]}
                  onPress={searchCep}
                  disabled={cepLoading}
                  accessibilityRole="button"
                  accessibilityLabel="Buscar endereço pelo CEP"
                  accessibilityHint="Consulta o endereço informado"
                >
                  {cepLoading ? <ActivityIndicator size="small" color="#0D6A49" /> : <AppIcon name="search-outline" size={19} color="#0D6A49" />}
                </Pressable>
              )}
            />
            {cepError ? <Text style={styles.cepError}>{cepError} Você ainda pode preencher os campos manualmente.</Text> : null}
          </View>
          <Field icon="map-outline" label="Endereço (opcional)" value={form.address} onChangeText={update("address")} placeholder="Rua, número e bairro" styles={styles} />
          <Field icon="business-outline" label="Estabelecimento (opcional)" value={form.business} onChangeText={update("business")} placeholder="Ex.: Café Raiz" styles={styles} />
          <Field icon="location-outline" label="Cidade (opcional)" value={form.city} onChangeText={update("city")} placeholder="Ex.: São Paulo, SP" styles={styles} />
          {error ? <Text style={styles.authError}>{error}</Text> : null}
          <Pressable
            style={({ pressed }) => [styles.authButton, pressed && { opacity: 0.86 }]}
            onPress={submit}
            disabled={loading}
          >
            <Text style={styles.authButtonText}>{loading ? "Criando..." : "Criar minha conta"}</Text>
            <AppIcon name="arrow-forward" size={18} color="#fff" />
          </Pressable>
        </View>
        <Text style={styles.authNote}>Seus dados ficam salvos localmente neste dispositivo.</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
