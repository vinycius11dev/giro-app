import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { Animated, Pressable, Text, View } from "react-native";

const confetti = [
  ["#0D6A49", -48, -24],
  ["#E76832", -24, -42],
  ["#C98415", 0, -52],
  ["#77A950", 25, -40],
  ["#E76832", 48, -22],
  ["#0D6A49", -32, -8],
  ["#F0C45C", 31, -9],
];

export default function FeedbackOverlay({ mutation, onUndo, styles }) {
  const progress = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    progress.setValue(0);
    Animated.spring(progress, { toValue: 1, useNativeDriver: true, damping: 14, stiffness: 150 }).start();
  }, [mutation?.id, progress]);
  if (!mutation) return null;
  const isAction = mutation.type === "action";
  return (
    <View pointerEvents="box-none" style={styles.feedbackLayer}>
      {isAction && (
        <View pointerEvents="none" style={styles.confettiLayer}>
          {confetti.map(([color, x, y], index) => (
            <Animated.View
              key={`${color}-${index}`}
              style={[styles.confettiPiece, { backgroundColor: color, transform: [{ translateX: progress.interpolate({ inputRange: [0, 1], outputRange: [0, x] }) }, { translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [0, y] }) }, { rotate: `${index * 25}deg` }] }]}
            />
          ))}
        </View>
      )}
      <Animated.View style={[styles.feedbackBar, { opacity: progress, transform: [{ translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [18, 0] }) }] }]}>
        <Ionicons name={isAction ? "checkmark-circle" : "trash-outline"} size={20} color={isAction ? "#CFEAB7" : "#FFD3BD"} />
        <Text style={styles.feedbackText} numberOfLines={2}>
          {isAction ? `${mutation.action} registrada.` : "Produto excluído."}
        </Text>
        <Pressable onPress={onUndo} style={styles.feedbackUndo} accessibilityRole="button">
          <Text style={styles.feedbackUndoText}>Desfazer</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}
