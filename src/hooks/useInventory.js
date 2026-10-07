import { useEffect, useMemo, useState } from "react";
import {
  categoryIcons,
  createInitialHistory,
  createInitialProducts,
  defaultProfile,
  productImages,
} from "../data/initialData";
import { loadAppData, saveAppData } from "../services/storage";
import {
  deleteHistoryEntry,
  deleteProduct,
  fetchWorkspace,
  insertHistoryEntry,
  pushWorkspace,
  remoteEnabled,
  resetWorkspace,
  upsertProduct,
  upsertWorkspaceState,
} from "../services/remoteStore";
import {
  currentDateLabel,
  getProductStatus,
  parseDate,
} from "../utils/productDates";
import { PLAN_LIMITS, freshUsage, normalizeUsage } from "../data/plans";

function freshData() {
  return {
    products: createInitialProducts(),
    history: createInitialHistory(),
    profile: defaultProfile,
    alertsEnabled: true,
    darkMode: false,
    largeText: false,
    plan: "free",
    usage: freshUsage(),
  };
}

export default function useInventory(ownerId = null) {
  const [data, setData] = useState(freshData);
  const [ready, setReady] = useState(false);
  const [storageError, setStorageError] = useState("");
  const [lastMutation, setLastMutation] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setReady(false);
    loadAppData(freshData())
      .then(async (localData) => {
        if (!remoteEnabled(ownerId)) {
          if (!cancelled) setData(localData);
          return;
        }
        try {
          const remote = await fetchWorkspace(ownerId);
          if (remote) {
            if (!cancelled) {
              setData({
                ...localData,
                products: remote.products,
                history: remote.history,
                profile: { ...localData.profile, ...remote.profile },
                alertsEnabled: remote.alertsEnabled ?? localData.alertsEnabled,
                darkMode: remote.darkMode ?? localData.darkMode,
                largeText: remote.largeText ?? localData.largeText,
                plan: remote.plan === "pro" ? "pro" : "free",
                usage: remote.usage || localData.usage,
              });
            }
          } else {
            if (!cancelled) setData(localData);
            await pushWorkspace(ownerId, localData);
          }
        } catch {
          if (!cancelled) {
            setData(localData);
            setStorageError(
              "Sem conexão com o Supabase. Usando os dados locais do aparelho.",
            );
          }
        }
      })
      .catch(() =>
        setStorageError("Não foi possível carregar os dados salvos."),
      )
      .finally(() => {
        if (!cancelled) setReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, [ownerId]);

  useEffect(() => {
    if (!ready) return;
    saveAppData(data).catch(() =>
      setStorageError("Não foi possível salvar a última alteração."),
    );
    if (remoteEnabled(ownerId)) {
      upsertWorkspaceState(ownerId, data).catch(() =>
        setStorageError(
          "Alteração salva no aparelho, mas falhou a sincronização com o Supabase.",
        ),
      );
    }
  }, [data, ready, ownerId]);

  function syncRemote(task) {
    if (!remoteEnabled(ownerId)) return;
    task().catch(() =>
      setStorageError(
        "Alteração salva no aparelho, mas falhou a sincronização com o Supabase.",
      ),
    );
  }

  const sortedProducts = useMemo(
    () =>
      [...data.products].sort(
        (a, b) => parseDate(a.expiry) - parseDate(b.expiry),
      ),
    [data.products],
  );
  const stats = useMemo(
    () => ({
      today: data.products.filter(
        (item) => getProductStatus(item.expiry) === "today",
      ).length,
      soon: data.products.filter(
        (item) => getProductStatus(item.expiry) === "soon",
      ).length,
      ok: data.products.filter((item) => getProductStatus(item.expiry) === "ok")
        .length,
      total: data.products.length,
      rescued: data.history.filter((item) => item.action !== "Item descartado").length,
    }),
    [data.history, data.products],
  );
  const rescued = data.history.filter(
    (item) => item.action !== "Item descartado",
  ).length;
  const impactRate = data.history.length
    ? Math.round((rescued / data.history.length) * 100)
    : 0;
  const plan = data.plan === "pro" ? "pro" : "free";
  const limits = PLAN_LIMITS[plan];
  const usage = normalizeUsage(data.usage);
  const subscription = {
    plan,
    limits,
    usage,
    activeProducts: data.products.length,
    productsRemaining: Number.isFinite(limits.maxActiveProducts)
      ? Math.max(0, limits.maxActiveProducts - data.products.length)
      : null,
    registrationsRemaining: Number.isFinite(limits.monthlyRegistrations)
      ? Math.max(0, limits.monthlyRegistrations - usage.registrations)
      : null,
    actionsRemaining: Number.isFinite(limits.monthlyActions)
      ? Math.max(0, limits.monthlyActions - usage.actions)
      : null,
  };

  function saveProduct(form, editingId) {
    if (!editingId && plan === "free") {
      if (data.products.length >= limits.maxActiveProducts) {
        return { ok: false, reason: "active_products", message: `O plano grátis permite até ${limits.maxActiveProducts} produtos ativos.` };
      }
      if (usage.registrations >= limits.monthlyRegistrations) {
        return { ok: false, reason: "registrations", message: `Você atingiu o limite de ${limits.monthlyRegistrations} cadastros neste mês.` };
      }
    }
    const product = {
      id: editingId || String(Date.now()),
      name: form.name.trim(),
      category: form.category,
      quantity: Number(form.quantity),
      expiry: form.expiry,
      icon: categoryIcons[form.category],
      image: productImages[form.category] || null,
    };
    syncRemote(() => upsertProduct(ownerId, product));
    setData((current) => ({
      ...current,
      products: editingId
        ? current.products.map((item) =>
            item.id === editingId ? product : item,
          )
        : [product, ...current.products],
      usage: editingId
        ? normalizeUsage(current.usage)
        : { ...normalizeUsage(current.usage), registrations: normalizeUsage(current.usage).registrations + 1 },
    }));
    return { ok: true };
  }

  function removeProduct(id) {
    const product = data.products.find((item) => item.id === id);
    if (product) setLastMutation({ id: String(Date.now()), type: "remove", product });
    syncRemote(() => deleteProduct(ownerId, id));
    setData((current) => {
      return {
        ...current,
        products: current.products.filter((item) => item.id !== id),
      };
    });
  }
  function registerAction(product, action, icon, tone) {
    if (plan === "free" && usage.actions >= limits.monthlyActions) {
      return { ok: false, reason: "actions", message: `O plano grátis permite ${limits.monthlyActions} ações por mês.` };
    }
    const historyEntry = {
      id: String(Date.now()),
      product: product.name,
      action,
      date: currentDateLabel(),
      icon,
      tone,
    };
    setLastMutation({ id: historyEntry.id, type: "action", product, historyId: historyEntry.id, action });
    syncRemote(async () => {
      await deleteProduct(ownerId, product.id);
      await insertHistoryEntry(ownerId, historyEntry);
    });
    setData((current) => ({
      ...current,
      products: current.products.filter((item) => item.id !== product.id),
      history: [historyEntry, ...current.history],
      usage: { ...normalizeUsage(current.usage), actions: normalizeUsage(current.usage).actions + 1 },
    }));
    return { ok: true };
  }
  function undoLastMutation() {
    if (!lastMutation) return;
    syncRemote(async () => {
      await upsertProduct(ownerId, lastMutation.product);
      if (lastMutation.type === "action" && lastMutation.historyId) {
        await deleteHistoryEntry(ownerId, lastMutation.historyId);
      }
    });
    setData((current) => {
      if (lastMutation.type === "remove") {
        return { ...current, products: [lastMutation.product, ...current.products] };
      }
      return {
        ...current,
        products: [lastMutation.product, ...current.products],
        history: current.history.filter((item) => item.id !== lastMutation.historyId),
      };
    });
    setLastMutation(null);
  }
  function clearLastMutation() {
    setLastMutation(null);
  }
  function updateProfile(profile) {
    setData((current) => ({ ...current, profile }));
  }
  function toggleAlerts() {
    setData((current) => ({
      ...current,
      alertsEnabled: !current.alertsEnabled,
    }));
  }
  function toggleDarkMode() {
    setData((current) => ({ ...current, darkMode: !current.darkMode }));
  }
  function toggleLargeText() {
    setData((current) => ({ ...current, largeText: !current.largeText }));
  }
  function upgradeToPro() {
    setData((current) => ({ ...current, plan: "pro", usage: normalizeUsage(current.usage) }));
  }
  function resetDemo() {
    setData((current) => {
      const demo = freshData();
      return {
        ...demo,
        // Restaurar os produtos de demonstração não deve trocar a identidade
        // nem apagar preferências da conta que está atualmente conectada.
        profile: current.profile,
        alertsEnabled: current.alertsEnabled,
        darkMode: current.darkMode,
        largeText: current.largeText,
        plan: current.plan,
        usage: normalizeUsage(current.usage),
      };
    });
    syncRemote(() => resetWorkspace(ownerId, freshData()));
  }

  return {
    ...data,
    ready,
    storageError,
    sortedProducts,
    stats,
    impactRate,
    saveProduct,
    removeProduct,
    registerAction,
    updateProfile,
    toggleAlerts,
    toggleDarkMode,
    toggleLargeText,
    upgradeToPro,
    subscription,
    resetDemo,
    lastMutation,
    undoLastMutation,
    clearLastMutation,
  };
}
