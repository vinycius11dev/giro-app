import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  Platform,
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
  const [calendarVisible, setCalendarVisible] = useState(false);

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
    setCalendarVisible(false);
  }, [product, visible]);

  function openCalendar() {
    if (Platform.OS !== "web") {
      setCalendarVisible(true);
      return;
    }
    const input = document.createElement("input");
    input.type = "date";
    input.value = form.expiry;
    input.onchange = (event) => {
      if (event.target.value) setForm({ ...form, expiry: event.target.value });
    };
    input.click();
  }

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
    const result = onSave({ ...form, quantity: normalizedQuantity }, product?.id);
    if (result?.ok === false) {
      return Alert.alert("Limite do plano gratuito", result.message);
    }
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
                <Ionicons
                  name={categoryIcons[category]}
                  size={16}
                  color={form.category === category ? "#0E6A49" : "#647269"}
                />
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
          <Pressable
            style={styles.datePickerButton}
            onPress={openCalendar}
            accessibilityRole="button"
            accessibilityLabel="Abrir calendário para escolher a validade"
          >
            <Ionicons name="calendar-outline" size={17} color="#0D6A49" />
            <Text style={styles.datePickerButtonText}>Escolher no calendário</Text>
          </Pressable>
          {calendarVisible && Platform.OS !== "web" && (
            <DateTimePicker
              value={isValidISODate(form.expiry) ? new Date(`${form.expiry}T12:00:00`) : new Date()}
              mode="date"
              display="calendar"
              onChange={(event, value) => {
                if (Platform.OS === "android") setCalendarVisible(false);
                if (value) {
                  const year = value.getFullYear();
                  const month = String(value.getMonth() + 1).padStart(2, "0");
                  const day = String(value.getDate()).padStart(2, "0");
                  setForm({ ...form, expiry: `${year}-${month}-${day}` });
                }
              }}
            />
          )}
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
