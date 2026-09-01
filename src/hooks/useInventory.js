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
  currentDateLabel,
  getProductStatus,
  parseDate,
} from "../utils/productDates";

function freshData() {
  return {
    products: createInitialProducts(),
    history: createInitialHistory(),
    profile: defaultProfile,
    alertsEnabled: true,
    darkMode: false,
    largeText: false,
  };
}

export default function useInventory() {
  const [data, setData] = useState(freshData);
  const [ready, setReady] = useState(false);
  const [storageError, setStorageError] = useState("");
  const [lastMutation, setLastMutation] = useState(null);

  useEffect(() => {
    loadAppData(freshData())
      .then(setData)
      .catch(() =>
        setStorageError("Não foi possível carregar os dados salvos."),
      )
      .finally(() => setReady(true));
  }, []);

  useEffect(() => {
    if (!ready) return;
    saveAppData(data).catch(() =>
      setStorageError("Não foi possível salvar a última alteração."),
    );
  }, [data, ready]);

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

  function saveProduct(form, editingId) {
    const product = {
      id: editingId || String(Date.now()),
      name: form.name.trim(),
      category: form.category,
      quantity: Number(form.quantity),
      expiry: form.expiry,
      icon: categoryIcons[form.category],
      image: productImages[form.category] || null,
    };
    setData((current) => ({
      ...current,
      products: editingId
        ? current.products.map((item) =>
            item.id === editingId ? product : item,
          )
        : [product, ...current.products],
    }));
  }

  function removeProduct(id) {
    const product = data.products.find((item) => item.id === id);
    if (product) setLastMutation({ id: String(Date.now()), type: "remove", product });
    setData((current) => {
      return {
        ...current,
        products: current.products.filter((item) => item.id !== id),
      };
    });
  }
  function registerAction(product, action, icon, tone) {
    const historyEntry = {
      id: String(Date.now()),
      product: product.name,
      action,
      date: currentDateLabel(),
      icon,
      tone,
    };
    setLastMutation({ id: historyEntry.id, type: "action", product, historyId: historyEntry.id, action });
    setData((current) => ({
      ...current,
      products: current.products.filter((item) => item.id !== product.id),
      history: [historyEntry, ...current.history],
    }));
  }
  function undoLastMutation() {
    if (!lastMutation) return;
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
  function resetDemo() {
    setData(freshData());
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
    resetDemo,
    lastMutation,
    undoLastMutation,
    clearLastMutation,
  };
}
