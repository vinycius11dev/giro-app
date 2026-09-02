import AppIcon from "../components/AppIcon";
import { ScrollView, Text, View } from "react-native";
import ScreenHeader from "../components/ScreenHeader";

export default function InsightsScreen({
  products,
  history,
  impactRate,
  onBack,
  styles,
}) {
  const totalUnits = products.reduce(
    (sum, item) => sum + Number(item.quantity),
    0,
  );
  const categories = Object.entries(
    products.reduce(
      (result, item) => ({
        ...result,
        [item.category]: (result[item.category] || 0) + 1,
      }),
      {},
    ),
  ).sort((a, b) => b[1] - a[1]);
  const maxCategory = Math.max(...categories.map(([, total]) => total), 1);
  const offers = history.filter(
    (item) => item.action === "Oferta criada",
  ).length;
  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      <ScreenHeader
        title="Relatórios"
        subtitle="Leitura rápida da operação"
        onBack={onBack}
        styles={styles}
      />
      <View style={styles.reportGrid}>
        <View style={styles.reportCard}>
          <AppIcon name="cube-outline" size={20} color="#0D6A49" />
          <Text style={styles.reportValue}>{products.length}</Text>
          <Text style={styles.reportLabel}>Produtos ativos</Text>
        </View>
        <View style={styles.reportCard}>
          <AppIcon name="layers-outline" size={20} color="#C98415" />
          <Text style={styles.reportValue}>{totalUnits}</Text>
          <Text style={styles.reportLabel}>Unidades em estoque</Text>
        </View>
        <View style={styles.reportCard}>
          <AppIcon name="leaf-outline" size={20} color="#278657" />
          <Text style={styles.reportValue}>{impactRate}%</Text>
          <Text style={styles.reportLabel}>Aproveitamento</Text>
        </View>
        <View style={styles.reportCard}>
          <AppIcon name="pricetag-outline" size={20} color="#E76832" />
          <Text style={styles.reportValue}>{offers}</Text>
          <Text style={styles.reportLabel}>Ofertas criadas</Text>
        </View>
      </View>
      <Text style={styles.heading}>Estoque por categoria</Text>
      <View style={styles.chartCard}>
        {categories.length ? (
          categories.map(([category, total]) => (
            <View key={category} style={styles.chartRow}>
              <View style={styles.chartLabels}>
                <Text style={styles.chartName}>{category}</Text>
                <Text style={styles.chartTotal}>{total}</Text>
              </View>
              <View style={styles.chartTrack}>
                <View
                  style={[
                    styles.chartBar,
                    { width: `${(total / maxCategory) * 100}%` },
                  ]}
                />
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>
            Cadastre produtos para gerar o relatório.
          </Text>
        )}
      </View>
      <View style={styles.tip}>
        <AppIcon name="analytics-outline" size={23} color="#C98415" />
        <Text style={styles.tipText}>
          Os relatórios são atualizados automaticamente a cada alteração no
          estoque ou histórico.
        </Text>
      </View>
    </ScrollView>
  );
}
