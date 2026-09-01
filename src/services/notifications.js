import { Platform } from "react-native";
import * as Notifications from "expo-notifications";

export async function prepareNotifications() {
  if (Platform.OS === "web") return false;
  try {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
    const permissions = await Notifications.getPermissionsAsync();
    if (!permissions.granted) {
      const requested = await Notifications.requestPermissionsAsync();
      return requested.granted;
    }
    return true;
  } catch {
    return false;
  }
}

export async function syncExpiryNotifications(products, enabled) {
  if (Platform.OS === "web") return 0;
  try {
    const granted = await prepareNotifications();
    if (!granted) return 0;
    const scheduled = await Notifications.getAllScheduledNotificationsAsync();
    await Promise.all(
      scheduled
        .filter((item) => item.content?.data?.giroExpiry)
        .map((item) =>
          Notifications.cancelScheduledNotificationAsync(item.identifier),
        ),
    );
    if (!enabled) return 0;

    const now = new Date();
    const upcoming = products.filter((product) => {
      const expiry = new Date(`${product.expiry}T09:00:00`);
      return expiry > now && expiry.getTime() - now.getTime() <= 7 * 86400000;
    });
    let count = 0;
    for (const product of upcoming) {
      const expiry = new Date(`${product.expiry}T09:00:00`);
      const triggerDate = new Date(expiry);
      triggerDate.setDate(triggerDate.getDate() - 1);
      if (triggerDate <= now) continue;
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Produto perto do vencimento",
          body: `${product.name} vence amanhã. Que tal criar uma oferta?`,
          data: { giroExpiry: true, productId: product.id },
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DATE,
          date: triggerDate,
        },
      });
      count += 1;
    }
    return count;
  } catch {
    return 0;
  }
}
