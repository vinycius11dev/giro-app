import AppIcon from "../components/AppIcon";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

export default function LoginScreen({
  onLogin,
  onDemo,
  onSignUp,
  onShowcase,
  styles,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (!email.trim() || !password) {
      setError("Informe seu e-mail e sua senha para continuar.");
      return;
    }
    setLoading(true);
    const result = await onLogin(email, password);
    setLoading(false);
    if (!result.ok) setError(result.error);
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
        <View style={styles.authBrand}>
          <Image
            source={require("../../assets/giro-logo.png")}
            style={styles.authLogo}
            resizeMode="contain"
            accessibilityLabel="Logo do Giro"
          />
          <Text style={styles.authBrandText}>giro</Text>
        </View>
        <Text style={styles.authEyebrow}>BEM-VINDO DE VOLTA</Text>
        <Text style={styles.authTitle}>Seu estoque no giro certo.</Text>
        <Text style={styles.authSubtitle}>
          Entre para acompanhar validades, oportunidades e impacto do seu negócio.
        </Text>
        <View style={styles.authForm}>
          <Text style={styles.authLabel}>E-mail</Text>
          <View style={styles.authInputWrap}>
            <AppIcon name="mail-outline" size={18} color="#7A8980" />
            <TextInput
              value={email}
              onChangeText={(value) => {
                setEmail(value);
                setError("");
              }}
              placeholder="voce@empresa.com"
              placeholderTextColor="#A3ACA6"
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.authInput}
            />
          </View>
          <Text style={styles.authLabel}>Senha</Text>
          <View style={styles.authInputWrap}>
            <AppIcon name="lock-closed-outline" size={18} color="#7A8980" />
            <TextInput
              value={password}
              onChangeText={(value) => {
                setPassword(value);
                setError("");
              }}
              placeholder="Sua senha"
              placeholderTextColor="#A3ACA6"
              secureTextEntry
              style={styles.authInput}
              onSubmitEditing={submit}
            />
          </View>
          {error ? <Text style={styles.authError}>{error}</Text> : null}
          <Pressable
            style={({ pressed }) => [styles.authButton, pressed && { opacity: 0.86 }]}
            onPress={submit}
            disabled={loading}
          >
            <Text style={styles.authButtonText}>{loading ? "Entrando..." : "Entrar"}</Text>
            <AppIcon name="arrow-forward" size={18} color="#fff" />
          </Pressable>
        </View>
        <Pressable style={styles.authDemoButton} onPress={onDemo}>
          <AppIcon name="sparkles-outline" size={17} color="#0D6A49" />
          <Text style={styles.authDemoText}>Acessar demonstração</Text>
        </Pressable>
        <Pressable
          style={({ hovered, pressed }) => [
            styles.authIdeaButton,
            hovered && styles.authIdeaButtonHover,
            pressed && { opacity: 0.82 },
          ]}
          onPress={onShowcase}
        >
          <AppIcon name="bulb-outline" size={17} color="#C98415" />
          <Text style={styles.authIdeaText}>Conheça a ideia do projeto</Text>
          <AppIcon name="arrow-forward" size={15} color="#C98415" />
        </Pressable>
        <View style={styles.authDivider}>
          <View style={styles.authDividerLine} />
          <Text style={styles.authDividerText}>ou</Text>
          <View style={styles.authDividerLine} />
        </View>
        <View style={styles.authFooterRow}>
          <Text style={styles.authFooterText}>Ainda não tem uma conta?</Text>
          <Pressable onPress={onSignUp}>
            <Text style={styles.authLink}>Criar conta</Text>
          </Pressable>
        </View>
        <Text style={styles.authNote}>Acesso local para demonstração acadêmica.</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
