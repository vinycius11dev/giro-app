import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import FormField from "../components/FormField";
import ModalHeader from "../components/ModalHeader";
import { categoryIcons } from "../data/initialData";
import { dateAfterDays, defaultExpiryDate, isValidISODate } from "../utils/productDates";

const blankForm = () => ({
  name: "",
  category: "Padaria",
  quantity: "",
  expiry: defaultExpiryDate(),
});

export default function ProductFormModal({
  visible,
  product,
  close,
  onSave,
  styles,
}) {
  const [form, setForm] = useState(blankForm);

  useEffect(() => {
    if (!visible) return;
    setForm(
      product
        ? {
            name: product.name,
            category: product.category,
            quantity: String(product.quantity),
            expiry: product.expiry,
          }
        : blankForm(),
    );
  }, [product, visible]);

  function submit() {
    const normalizedQuantity = form.quantity.replace(",", ".");
    if (!form.name.trim())
      return Alert.alert("Nome obrigatório", "Informe o nome do produto.");
    if (
      !Number.isFinite(Number(normalizedQuantity)) ||
      Number(normalizedQuantity) <= 0
    )
      return Alert.alert(
        "Quantidade inválida",
        "Informe uma quantidade maior que zero.",
      );
    if (!isValidISODate(form.expiry))
      return Alert.alert(
        "Data inválida",
        "Use uma data real no formato AAAA-MM-DD.",
      );
    onSave({ ...form, quantity: normalizedQuantity }, product?.id);
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
          title={product ? "Editar produto" : "Novo produto"}
          close={close}
          styles={styles}
        />
        <ScrollView
          contentContainerStyle={styles.form}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.formIntro}>
            Mantenha seus produtos no giro certo.
          </Text>
          <FormField
            label="Nome do produto"
            value={form.name}
            onChangeText={(name) => setForm({ ...form, name })}
            placeholder="Ex.: Pão de fermentação natural"
            styles={styles}
          />
          <Text style={styles.inputLabel}>Categoria</Text>
          <View style={styles.categories}>
            {Object.keys(categoryIcons).map((category) => (
              <Pressable
                key={category}
                style={[
                  styles.category,
                  form.category === category && styles.categoryActive,
                ]}
                onPress={() => setForm({ ...form, category })}
              >
                <Text>{categoryIcons[category]}</Text>
                <Text
                  style={[
                    styles.categoryText,
                    form.category === category && styles.categoryTextActive,
                  ]}
                >
                  {category}
                </Text>
              </Pressable>
            ))}
          </View>
          <FormField
            label="Quantidade"
            value={form.quantity}
            onChangeText={(quantity) =>
              setForm({ ...form, quantity: quantity.replace(/[^0-9.,]/g, "") })
            }
            placeholder="Ex.: 12"
            keyboardType="decimal-pad"
            styles={styles}
          />
          <FormField
            label="Data de validade"
            value={form.expiry}
            onChangeText={(expiry) => setForm({ ...form, expiry })}
            placeholder="AAAA-MM-DD"
            autoCapitalize="none"
            styles={styles}
          />
          <View style={styles.datePresets}>
            <Text style={styles.datePresetLabel}>Atalhos:</Text>
            {[
              [1, "Amanhã"],
              [3, "3 dias"],
              [7, "7 dias"],
              [30, "30 dias"],
            ].map(([days, label]) => (
              <Pressable
                key={label}
                style={styles.datePreset}
                onPress={() => setForm({ ...form, expiry: dateAfterDays(days) })}
              >
                <Text style={styles.datePresetText}>{label}</Text>
              </Pressable>
            ))}
          </View>
          <Text style={styles.hint}>
            Use o formato AAAA-MM-DD. Exemplo: {defaultExpiryDate()}.
          </Text>
          <Pressable style={styles.save} onPress={submit}>
            <Text style={styles.saveText}>
              {product ? "Salvar alterações" : "Adicionar ao estoque"}
            </Text>
            <Ionicons name="arrow-forward" size={18} color="#fff" />
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}
