import { useEffect, useState } from "react";
import { loadAuthData, saveAuthData } from "../services/storage";

const DEMO_ACCOUNT = {
  id: "demo",
  name: "Marina Costa",
  email: "demo@giro.app",
  password: "giro123",
  business: "Café Raiz",
  city: "São Paulo, SP",
};

function withoutPassword(account) {
  if (!account) return null;
  const { password, ...safeAccount } = account;
  return safeAccount;
}

export default function useAuth() {
  const [auth, setAuth] = useState({ account: null, session: null });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadAuthData()
      .then(setAuth)
      .finally(() => setReady(true));
  }, []);

  async function persist(next) {
    setAuth(next);
    await saveAuthData(next);
  }

  async function login(email, password) {
    const normalizedEmail = email.trim().toLowerCase();
    const account = auth.account || DEMO_ACCOUNT;
    if (
      normalizedEmail !== account.email.toLowerCase() ||
      password !== account.password
    ) {
      return { ok: false, error: "E-mail ou senha incorretos." };
    }
    await persist({ account, session: withoutPassword(account) });
    return { ok: true, account: withoutPassword(account) };
  }

  async function loginDemo() {
    await persist({
      account: auth.account || DEMO_ACCOUNT,
      session: withoutPassword(DEMO_ACCOUNT),
    });
    return withoutPassword(DEMO_ACCOUNT);
  }

  async function register(form) {
    const account = {
      id: String(Date.now()),
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      password: form.password,
      business: form.business.trim() || "Meu estabelecimento",
      city: form.city.trim() || "Minha cidade",
      cep: form.cep || "",
      address: form.address || "",
    };
    await persist({ account, session: withoutPassword(account) });
    return withoutPassword(account);
  }

  async function logout() {
    await persist({ ...auth, session: null });
  }

  return {
    ready,
    session: auth.session,
    login,
    loginDemo,
    register,
    logout,
  };
}
