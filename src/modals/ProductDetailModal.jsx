import { Ionicons } from "@expo/vector-icons";
import {
  Alert,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import ModalHeader from "../components/ModalHeader";
import { categoryIcons, productImages } from "../data/initialData";
import {
  getDueText,
  getProductStatus,
  statusInfo,
} from "../utils/productDates";

function Action({ label, sub, icon, color, bg, onPress, styles }) {
  return (
    <Pressable style={styles.action} onPress={onPress}>
      <View style={[styles.actionIcon, { backgroundColor: bg }]}>
        <Ionicons name={icon} size={21} color={color} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.actionLabel}>{label}</Text>
        <Text style={styles.actionSub}>{sub}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color="#AAB2AC" />
    </Pressable>
  );
}

export default function ProductDetailModal({
  product,
  close,
  edit,
  remove,
  registerAction,
  styles,
}) {
  if (!product) return null;
  const state = getProductStatus(product.expiry);
  const info = statusInfo[state];
  const advice =
    state === "today"
      ? "Crie uma oferta agora ou separe este item para doação."
      : state === "soon"
        ? "Planeje uma oferta para movimentar este produto antes do vencimento."
        : "Produto dentro do prazo. Continue acompanhando o giro.";
  function confirmAction(title, message, action, icon, tone) {
    Alert.alert(title, message, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Confirmar",
        onPress: () => {
          const result = registerAction(product, action, icon, tone);
          if (result?.ok === false) {
            return Alert.alert("Limite do plano gratuito", result.message);
          }
          close();
        },
      },
    ]);
  }
  function confirmDelete() {
    Alert.alert(
      "Excluir produto?",
      `${product.name} será removido sem registro no histórico.`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => {
            remove(product.id);
            close();
          },
        },
      ],
    );
  }

  const editButton = (
    <Pressable onPress={edit} hitSlop={12}>
      <Ionicons name="create-outline" size={23} color="#0D6A49" />
    </Pressable>
  );
  return (
    <Modal
      visible
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={close}
    >
      <SafeAreaView style={styles.modal}>
        <ModalHeader
          title="Detalhe do produto"
          close={close}
          right={editButton}
          styles={styles}
        />
        <ScrollView contentContainerStyle={styles.detail}>
          <View style={styles.detailTop}>
            <View style={styles.detailIcon}>
              {product.image || productImages[product.category] ? (
                <Image
                  source={product.image || productImages[product.category]}
                  style={styles.detailImage}
                  resizeMode="cover"
                  accessibilityLabel={`Foto de ${product.name}`}
                />
              ) : (
                <Ionicons
                  name={categoryIcons[product.category] || "cube-outline"}
                  size={39}
                  color="#0D6A49"
                />
              )}
            </View>
            <Text style={styles.detailName}>{product.name}</Text>
            <Text style={styles.detailMeta}>
              {product.category} • {product.quantity}{" "}
              {product.category === "Hortifruti" ? "kg" : "un."}
            </Text>
            <View style={[styles.detailPill, { backgroundColor: info.bg }]}>
              <Ionicons name={info.icon} size={15} color={info.color} />
              <Text style={[styles.detailPillText, { color: info.color }]}>
                {getDueText(product.expiry)}
              </Text>
            </View>
          </View>
          <View style={styles.advice}>
            <View style={styles.adviceIcon}>
              <Ionicons name="sparkles" size={20} color="#0D6A49" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.adviceTitle}>Sugestão do Giro</Text>
              <Text style={styles.adviceText}>{advice}</Text>
            </View>
          </View>
          <Text style={styles.actionTitle}>O que aconteceu com este item?</Text>
          <Action
            label="Criar oferta"
            sub="Registra uma promoção"
            icon="pricetag-outline"
            color="#E76832"
            bg="#FFF0E8"
            onPress={() =>
              confirmAction(
                "Criar oferta?",
                "O item sairá do estoque ativo e será registrado no histórico.",
                "Oferta criada",
                "pricetag-outline",
                "orange",
              )
            }
            styles={styles}
          />
          <Action
            label="Registrar doação"
            sub="Registra o aproveitamento social"
            icon="heart-outline"
            color="#278657"
            bg="#E9F7EF"
            onPress={() =>
              confirmAction(
                "Registrar doação?",
                "O item sairá do estoque ativo e será registrado como doado.",
                "Doação registrada",
                "heart-outline",
                "green",
              )
            }
            styles={styles}
          />
          <Action
            label="Descartar item"
            sub="Registra uma perda"
            icon="trash-outline"
            color="#657069"
            bg="#F1F2EF"
            onPress={() =>
              confirmAction(
                "Registrar descarte?",
                "O item sairá do estoque e ficará registrado como perda.",
                "Item descartado",
                "trash-outline",
                "orange",
              )
            }
            styles={styles}
          />
          <Pressable style={styles.delete} onPress={confirmDelete}>
            <Ionicons name="trash-outline" size={17} color="#BC3D38" />
            <Text style={styles.deleteText}>Excluir sem registrar</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}
