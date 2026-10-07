import { Alert, Platform } from "react-native";

export default function showAlert(title, message, buttons = []) {
  if (Platform.OS !== "web") {
    Alert.alert(title, message, buttons);
    return;
  }

  const text = message ? `${title}\n\n${message}` : title;
  if (buttons.length < 2) {
    globalThis.alert(text);
    buttons[0]?.onPress?.();
    return;
  }

  const accepted = globalThis.confirm(text);
  const button = accepted
    ? buttons.find((item) => item.style !== "cancel")
    : buttons.find((item) => item.style === "cancel");
  button?.onPress?.();
}
