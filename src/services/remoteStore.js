import { categoryIcons, productImages } from "../data/initialData";
import { isSupabaseConfigured, supabase } from "./supabase";

const PRODUCTS_TABLE = "giro_products";
const HISTORY_TABLE = "giro_history";
const STATE_TABLE = "giro_state";
const CONFLICT_KEY = "owner_id,id";
const REMOTE_TIMEOUT_MS = 8000;

export function remoteEnabled(ownerId) {
  return isSupabaseConfigured && Boolean(ownerId);
}

function withTimeout(promise) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Supabase timeout")), REMOTE_TIMEOUT_MS),
    ),
  ]);
}

function throwOnError({ error }) {
  if (error) throw error;
}

function productToRow(ownerId, product) {
  return {
    id: product.id,
    owner_id: ownerId,
    name: product.name,
    category: product.category,
    quantity: product.quantity,
    expiry: product.expiry,
    icon: product.icon || categoryIcons[product.category] || null,
  };
}

function rowToProduct(row) {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    quantity: row.quantity,
    expiry: row.expiry,
    icon: row.icon || categoryIcons[row.category],
    image: productImages[row.category] || null,
  };
}

function historyToRow(ownerId, entry) {
  return {
    id: entry.id,
    owner_id: ownerId,
    product: entry.product,
    action: entry.action,
    date_label: entry.date,
    icon: entry.icon,
    tone: entry.tone,
  };
}

function rowToHistory(row) {
  return {
    id: row.id,
    product: row.product,
    action: row.action,
    date: row.date_label,
    icon: row.icon,
    tone: row.tone,
  };
}

function stateToRow(ownerId, data) {
  return {
    owner_id: ownerId,
    profile: data.profile,
    alerts_enabled: data.alertsEnabled,
    dark_mode: data.darkMode,
    large_text: data.largeText,
    plan: data.plan,
    usage: data.usage,
    updated_at: new Date().toISOString(),
  };
}

export async function fetchWorkspace(ownerId) {
  const [productsRes, historyRes, stateRes] = await withTimeout(
    Promise.all([
      supabase.from(PRODUCTS_TABLE).select("*").eq("owner_id", ownerId),
      supabase
        .from(HISTORY_TABLE)
        .select("*")
        .eq("owner_id", ownerId)
        .order("created_at", { ascending: false }),
      supabase
        .from(STATE_TABLE)
        .select("*")
        .eq("owner_id", ownerId)
        .maybeSingle(),
    ]),
  );

  throwOnError(productsRes);
  throwOnError(historyRes);
  throwOnError(stateRes);

  if (!stateRes.data && productsRes.data.length === 0 && historyRes.data.length === 0) {
    return null;
  }

  return {
    products: productsRes.data.map(rowToProduct),
    history: historyRes.data.map(rowToHistory),
    profile: stateRes.data?.profile || null,
    alertsEnabled: stateRes.data?.alerts_enabled,
    darkMode: stateRes.data?.dark_mode,
    largeText: stateRes.data?.large_text,
    plan: stateRes.data?.plan,
    usage: stateRes.data?.usage || null,
  };
}

function pushWorkspaceRows(ownerId, data) {
  const writes = [];
  if (data.products.length) {
    writes.push(
      supabase
        .from(PRODUCTS_TABLE)
        .upsert(data.products.map((item) => productToRow(ownerId, item)), { onConflict: CONFLICT_KEY }),
    );
  }
  if (data.history.length) {
    writes.push(
      supabase
        .from(HISTORY_TABLE)
        .upsert(data.history.map((item) => historyToRow(ownerId, item)), { onConflict: CONFLICT_KEY }),
    );
  }
  return writes;
}

export async function pushWorkspace(ownerId, data) {
  const writes = pushWorkspaceRows(ownerId, data);
  writes.push(supabase.from(STATE_TABLE).upsert(stateToRow(ownerId, data)));
  const results = await Promise.all(writes);
  results.forEach(throwOnError);
}

export async function upsertProduct(ownerId, product) {
  throwOnError(
    await supabase
      .from(PRODUCTS_TABLE)
      .upsert(productToRow(ownerId, product), { onConflict: CONFLICT_KEY }),
  );
}

export async function deleteProduct(ownerId, productId) {
  throwOnError(
    await supabase
      .from(PRODUCTS_TABLE)
      .delete()
      .eq("owner_id", ownerId)
      .eq("id", productId),
  );
}

export async function insertHistoryEntry(ownerId, entry) {
  throwOnError(
    await supabase
      .from(HISTORY_TABLE)
      .upsert(historyToRow(ownerId, entry), { onConflict: CONFLICT_KEY }),
  );
}

export async function deleteHistoryEntry(ownerId, entryId) {
  throwOnError(
    await supabase
      .from(HISTORY_TABLE)
      .delete()
      .eq("owner_id", ownerId)
      .eq("id", entryId),
  );
}

export async function upsertWorkspaceState(ownerId, data) {
  throwOnError(
    await supabase.from(STATE_TABLE).upsert(stateToRow(ownerId, data)),
  );
}

export async function resetWorkspace(ownerId, data) {
  throwOnError(
    await supabase.from(PRODUCTS_TABLE).delete().eq("owner_id", ownerId),
  );
  throwOnError(
    await supabase.from(HISTORY_TABLE).delete().eq("owner_id", ownerId),
  );
  const results = await Promise.all(pushWorkspaceRows(ownerId, data));
  results.forEach(throwOnError);
}
