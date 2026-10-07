import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import AppIcon from "../components/AppIcon";
import ScreenHeader from "../components/ScreenHeader";
import { fetchWorkspace, remoteEnabled } from "../services/remoteStore";

function formatExpiry(value) {
  if (!value) return "Validade não informada";
  const [year, month, day] = String(value).split("-");
  return year && month && day ? `Validade ${day}/${month}/${year}` : `Validade ${value}`;
}

function Metric({ value, label, styles }) {
  return (
    <View style={styles.syncMetricCard}>
      <Text style={styles.syncMetricValue}>{value}</Text>
      <Text style={styles.syncMetricLabel}>{label}</Text>
    </View>
  );
}

export default function DatabaseSyncScreen({ ownerId, localData, onBack, styles }) {
  const [queryVersion, setQueryVersion] = useState(0);
  const [status, setStatus] = useState("loading");
  const [remoteData, setRemoteData] = useState(null);
  const [checkedAt, setCheckedAt] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadRemoteData() {
      if (!remoteEnabled(ownerId)) {
        setRemoteData(null);
        setCheckedAt(null);
        setStatus("local");
        return;
      }

      setStatus("loading");
      try {
        const result = await fetchWorkspace(ownerId);
        if (cancelled) return;
        setRemoteData(result);
        setCheckedAt(new Date());
        setStatus(result ? "connected" : "empty");
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    loadRemoteData();
    return () => {
      cancelled = true;
    };
  }, [ownerId, queryVersion]);

  const products = remoteData?.products || [];
  const history = remoteData?.history || [];
  const checkedTime = checkedAt
    ? checkedAt.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    : null;
  const statusDetails = {
    loading: {
      icon: null,
      title: "Consultando o Supabase",
      message: "Buscando os registros desta conta nas tabelas remotas.",
      tone: "neutral",
    },
    connected: {
      icon: "checkmark-circle-outline",
      title: "Consulta concluída",
      message: "Os dados abaixo foram lidos diretamente do Supabase.",
      tone: "success",
    },
    empty: {
      icon: "checkmark-circle-outline",
      title: "Banco conectado, sem registros",
      message: "A consulta funcionou, mas ainda não encontrou dados para esta conta.",
      tone: "success",
    },
    local: {
      icon: "cloud-offline-outline",
      title: "Consulta remota indisponível",
      message: "Esta sessão está usando o armazenamento local; não foi feita uma leitura do banco.",
      tone: "warning",
    },
    error: {
      icon: "alert-circle-outline",
      title: "Não foi possível consultar",
      message: "Confira a conexão e a configuração do Supabase. Os dados locais do app continuam disponíveis.",
      tone: "warning",
    },
  }[status];

  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      <ScreenHeader
        title="Sincronização"
        subtitle="Dados consultados no Supabase"
        onBack={onBack}
        styles={styles}
      />

      <View style={[styles.syncStatusCard, styles[`syncStatus${statusDetails.tone}`]]}>
        <View style={styles.syncStatusTop}>
          <View style={[styles.syncStatusIcon, styles[`syncStatusIcon${statusDetails.tone}`]]}>
            {status === "loading" ? (
              <ActivityIndicator size="small" color="#0D6A49" />
            ) : (
              <AppIcon
                name={statusDetails.icon}
                size={22}
                color={statusDetails.tone === "success" ? "#0D6A49" : "#A66B19"}
              />
            )}
          </View>
          <View style={styles.syncStatusCopy}>
            <Text style={styles.syncStatusTitle}>{statusDetails.title}</Text>
            <Text style={styles.syncStatusText}>{statusDetails.message}</Text>
          </View>
        </View>
        {checkedTime && status !== "loading" && (
          <Text style={styles.syncCheckedAt}>Última consulta: hoje às {checkedTime}</Text>
        )}
        <Pressable
          style={({ pressed }) => [styles.syncRefreshButton, pressed && { opacity: 0.78 }]}
          onPress={() => setQueryVersion((current) => current + 1)}
          disabled={status === "loading"}
          accessibilityRole="button"
        >
          <AppIcon name="refresh-outline" size={16} color="#FFFFFF" />
          <Text style={styles.syncRefreshText}>
            {status === "loading" ? "Consultando…" : "Consultar novamente"}
          </Text>
        </Pressable>
      </View>

      <Text style={styles.heading}>Registros encontrados no banco</Text>
      <View style={styles.syncMetrics}>
        <Metric value={products.length} label="Produtos" styles={styles} />
        <Metric value={history.length} label="Ações no histórico" styles={styles} />
        <Metric value={remoteData?.stateExists ? 1 : 0} label="Estado da conta" styles={styles} />
      </View>

      <View style={styles.syncTableNote}>
        <AppIcon name="database-outline" size={17} color="#0D6A49" />
        <Text style={styles.syncTableNoteText}>
          Tabelas consultadas: giro_products, giro_history e giro_state.
        </Text>
      </View>

      {products.length > 0 && (
        <>
          <Text style={styles.heading}>Produtos sincronizados</Text>
          <View style={styles.syncDataCard}>
            {products.map((product) => (
              <View key={product.id} style={styles.syncRecord}>
                <View style={styles.syncRecordCopy}>
                  <Text style={styles.syncRecordTitle}>{product.name}</Text>
                  <Text style={styles.syncRecordDetail}>
                    {product.category} · {product.quantity} unidades
                  </Text>
                </View>
                <Text style={styles.syncRecordDate}>{formatExpiry(product.expiry)}</Text>
              </View>
            ))}
          </View>
        </>
      )}

      {history.length > 0 && (
        <>
          <Text style={styles.heading}>Histórico sincronizado</Text>
          <View style={styles.syncDataCard}>
            {history.map((entry) => (
              <View key={entry.id} style={styles.syncRecord}>
                <View style={styles.syncRecordCopy}>
                  <Text style={styles.syncRecordTitle}>{entry.product}</Text>
                  <Text style={styles.syncRecordDetail}>{entry.action}</Text>
                </View>
                <Text style={styles.syncRecordDate}>{entry.date}</Text>
              </View>
            ))}
          </View>
        </>
      )}

      {status === "empty" && (
        <View style={styles.syncEmptyCard}>
          <AppIcon name="cube-outline" size={21} color="#7B877F" />
          <Text style={styles.syncEmptyText}>
            Nenhum produto ou ação de histórico foi encontrado nesta consulta.
          </Text>
        </View>
      )}

      <View style={styles.syncPrivacyNote}>
        <AppIcon name="lock-closed-outline" size={16} color="#68766D" />
        <Text style={styles.syncPrivacyText}>
          A tela não exibe e-mail, identificador da conta nem credenciais. Login e sessão continuam locais nesta versão.
        </Text>
      </View>
      {localData?.products && status === "connected" && (
        <Text style={styles.syncFootnote}>
          A lista exibida veio da consulta remota; no app há {localData.products.length} produto(s) carregado(s).
        </Text>
      )}
    </ScrollView>
  );
}
