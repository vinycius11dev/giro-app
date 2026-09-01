import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Alert, SafeAreaView, Text, View } from "react-native";
import BottomTabs from "./src/components/BottomTabs";
import useAuth from "./src/hooks/useAuth";
import useInventory from "./src/hooks/useInventory";
import AboutModal from "./src/modals/AboutModal";
import BusinessProfileModal from "./src/modals/BusinessProfileModal";
import HelpModal from "./src/modals/HelpModal";
import ProductDetailModal from "./src/modals/ProductDetailModal";
import ProductFormModal from "./src/modals/ProductFormModal";
import HistoryScreen from "./src/screens/HistoryScreen";
import HomeScreen from "./src/screens/HomeScreen";
import AlertsScreen from "./src/screens/AlertsScreen";
import ImpactScreen from "./src/screens/ImpactScreen";
import InsightsScreen from "./src/screens/InsightsScreen";
import OpportunitiesScreen from "./src/screens/OpportunitiesScreen";
import ProductsScreen from "./src/screens/ProductsScreen";
import ProjectShowcaseScreen from "./src/screens/ProjectShowcaseScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import LoginScreen from "./src/screens/LoginScreen";
import OnboardingScreen from "./src/screens/OnboardingScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import { loadOnboardingSeen, saveOnboardingSeen } from "./src/services/storage";
import { syncExpiryNotifications } from "./src/services/notifications";
import styles from "./src/styles/appStyles";

export default function App() {
  const auth = useAuth();
  const inventory = useInventory();
  const [authMode, setAuthMode] = useState("login");
  const [activeTab, setActiveTab] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formProduct, setFormProduct] = useState(null);
  const [productFormVisible, setProductFormVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const [helpVisible, setHelpVisible] = useState(false);
  const [aboutVisible, setAboutVisible] = useState(false);
  const [onboardingSeen, setOnboardingSeen] = useState(null);

  useEffect(() => {
    loadOnboardingSeen().then(setOnboardingSeen).catch(() => setOnboardingSeen(true));
  }, []);

  useEffect(() => {
    if (inventory.storageError)
      Alert.alert("Aviso de armazenamento", inventory.storageError);
  }, [inventory.storageError]);

  function openProductForm(product = null) {
    setFormProduct(product);
    setSelectedProduct(null);
    setProductFormVisible(true);
  }

  function confirmReset() {
    Alert.alert(
      "Restaurar demonstração?",
      "Produtos, histórico e perfil voltarão aos dados iniciais.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Restaurar",
          style: "destructive",
          onPress: inventory.resetDemo,
        },
      ],
    );
  }

  function applyAccountProfile(account) {
    if (!account) return;
    inventory.updateProfile({
      name: account.name,
      business: account.business || "Meu estabelecimento",
      city: account.city || "Minha cidade",
    });
  }

  useEffect(() => {
    if (inventory.ready && auth.session) applyAccountProfile(auth.session);
  }, [inventory.ready, auth.session]);

  useEffect(() => {
    if (!inventory.ready || !auth.session) return;
    syncExpiryNotifications(inventory.products, inventory.alertsEnabled);
  }, [inventory.ready, auth.session, inventory.products, inventory.alertsEnabled]);

  async function finishOnboarding() {
    setOnboardingSeen(true);
    await saveOnboardingSeen();
  }

  async function handleLogin(email, password) {
    const result = await auth.login(email, password);
    if (result.ok) applyAccountProfile(result.account);
    return result;
  }

  async function handleDemo() {
    const account = await auth.loginDemo();
    applyAccountProfile(account);
  }

  async function handleCreateAccount(form) {
    const account = await auth.register(form);
    applyAccountProfile(account);
  }

  async function handleLogout() {
    await auth.logout();
    setAuthMode("login");
    setActiveTab("home");
  }

  if (!inventory.ready || !auth.ready || onboardingSeen === null) {
    return (
      <SafeAreaView
        style={[
          styles.safe,
          { alignItems: "center", justifyContent: "center" },
        ]}
      >
        <StatusBar style="dark" />
        <Text style={styles.subtitle}>Preparando seu estoque...</Text>
      </SafeAreaView>
    );
  }

  if (!onboardingSeen) {
    return <OnboardingScreen onFinish={finishOnboarding} styles={styles} />;
  }

  if (!auth.session) {
    if (authMode === "showcase") {
      return (
        <ProjectShowcaseScreen
          onBack={() => setAuthMode("login")}
          onLogin={() => setAuthMode("login")}
          onDemo={handleDemo}
          styles={styles}
        />
      );
    }
    if (authMode === "signup") {
      return (
        <SignUpScreen
          onBack={() => setAuthMode("login")}
          onCreateAccount={handleCreateAccount}
          styles={styles}
        />
      );
    }
    return (
      <LoginScreen
        onLogin={handleLogin}
        onDemo={handleDemo}
        onSignUp={() => setAuthMode("signup")}
        onShowcase={() => setAuthMode("showcase")}
        styles={styles}
      />
    );
  }

  const isSecondaryScreen = [
    "alerts",
    "opportunities",
    "insights",
    "impact",
  ].includes(activeTab);
  const goHome = () => setActiveTab("home");

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.app}>
        {activeTab === "home" && (
          <HomeScreen
            stats={inventory.stats}
            history={inventory.history}
            products={inventory.sortedProducts}
            profile={inventory.profile}
            openDetail={setSelectedProduct}
            goProducts={() => setActiveTab("products")}
            openForm={openProductForm}
            openScreen={setActiveTab}
            styles={styles}
          />
        )}
        {activeTab === "products" && (
          <ProductsScreen
            products={inventory.sortedProducts}
            openDetail={setSelectedProduct}
            openForm={openProductForm}
            styles={styles}
          />
        )}
        {activeTab === "history" && (
          <HistoryScreen history={inventory.history} styles={styles} />
        )}
        {activeTab === "profile" && (
          <ProfileScreen
            products={inventory.products}
            history={inventory.history}
            profile={inventory.profile}
            alertsEnabled={inventory.alertsEnabled}
            impactRate={inventory.impactRate}
            onEditProfile={() => setProfileVisible(true)}
            onToggleAlerts={inventory.toggleAlerts}
            onHelp={() => setHelpVisible(true)}
            onAbout={() => setAboutVisible(true)}
            onRestartOnboarding={() => setOnboardingSeen(false)}
            onReset={confirmReset}
            onLogout={handleLogout}
            styles={styles}
          />
        )}
        {activeTab === "alerts" && (
          <AlertsScreen
            products={inventory.sortedProducts}
            alertsEnabled={inventory.alertsEnabled}
            onBack={goHome}
            openDetail={setSelectedProduct}
            styles={styles}
          />
        )}
        {activeTab === "opportunities" && (
          <OpportunitiesScreen
            products={inventory.sortedProducts}
            onBack={goHome}
            openDetail={setSelectedProduct}
            styles={styles}
          />
        )}
        {activeTab === "insights" && (
          <InsightsScreen
            products={inventory.products}
            history={inventory.history}
            impactRate={inventory.impactRate}
            onBack={goHome}
            styles={styles}
          />
        )}
        {activeTab === "impact" && (
          <ImpactScreen
            history={inventory.history}
            impactRate={inventory.impactRate}
            onBack={goHome}
            styles={styles}
          />
        )}
      </View>
      {!isSecondaryScreen && (
        <BottomTabs
          active={activeTab}
          setActive={setActiveTab}
          styles={styles}
        />
      )}

      <ProductFormModal
        visible={productFormVisible}
        product={formProduct}
        close={() => setProductFormVisible(false)}
        onSave={inventory.saveProduct}
        styles={styles}
      />
      <ProductDetailModal
        product={selectedProduct}
        close={() => setSelectedProduct(null)}
        edit={() => openProductForm(selectedProduct)}
        remove={inventory.removeProduct}
        registerAction={inventory.registerAction}
        styles={styles}
      />
      <BusinessProfileModal
        visible={profileVisible}
        profile={inventory.profile}
        close={() => setProfileVisible(false)}
        onSave={inventory.updateProfile}
        styles={styles}
      />
      <HelpModal
        visible={helpVisible}
        close={() => setHelpVisible(false)}
        styles={styles}
      />
      <AboutModal
        visible={aboutVisible}
        close={() => setAboutVisible(false)}
        styles={styles}
      />
    </SafeAreaView>
  );
}
