import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@giro:data:v2";
const AUTH_STORAGE_KEY = "@giro:auth:v1";
const ONBOARDING_STORAGE_KEY = "@giro:onboarding:v1";

export async function loadAppData(fallback) {
  const stored = await AsyncStorage.getItem(STORAGE_KEY);
  if (!stored) return fallback;
  const parsed = JSON.parse(stored);
  return {
    ...fallback,
    ...parsed,
    profile: { ...fallback.profile, ...parsed.profile },
    plan: parsed.plan === "pro" ? "pro" : fallback.plan,
    usage: { ...fallback.usage, ...parsed.usage },
  };
}

export async function saveAppData(data) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export async function loadAuthData() {
  const stored = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
  if (!stored) return { account: null, session: null };
  try {
    const parsed = JSON.parse(stored);
    return {
      account: parsed.account || null,
      session: parsed.session || null,
    };
  } catch {
    return { account: null, session: null };
  }
}

export async function saveAuthData(data) {
  await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));
}

export async function loadOnboardingSeen() {
  return (await AsyncStorage.getItem(ONBOARDING_STORAGE_KEY)) === "true";
}

export async function saveOnboardingSeen() {
  await AsyncStorage.setItem(ONBOARDING_STORAGE_KEY, "true");
}
