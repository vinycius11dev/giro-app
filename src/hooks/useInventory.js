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
  };
}

export default function useInventory() {
  const [data, setData] = useState(freshData);
  const [ready, setReady] = useState(false);
  const [storageError, setStorageError] = useState("");

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
    }),
    [data.products],
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
    setData((current) => ({
      ...current,
      products: current.products.filter((item) => item.id !== id),
    }));
  }
  function registerAction(product, action, icon, tone) {
    setData((current) => ({
      ...current,
      products: current.products.filter((item) => item.id !== product.id),
      history: [
        {
          id: String(Date.now()),
          product: product.name,
          action,
          date: currentDateLabel(),
          icon,
          tone,
        },
        ...current.history,
      ],
    }));
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
    resetDemo,
  };
}
