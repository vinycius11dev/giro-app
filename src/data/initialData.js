export const categoryIcons = {
  Padaria: "storefront-outline",
  Laticínios: "water-outline",
  Hortifruti: "nutrition-outline",
  Mercearia: "basket-outline",
  Bebidas: "cafe-outline",
  Outros: "cube-outline",
};

// Fotos locais para o APK funcionar mesmo sem conexão com a internet.
export const productImages = {
  Padaria: require("../../assets/products/croissant.png"),
  Laticínios: require("../../assets/products/iogurte.png"),
  Hortifruti: require("../../assets/products/banana.png"),
  Mercearia: require("../../assets/products/cafe.png"),
};

function isoFromToday(offset) {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return date.toISOString().slice(0, 10);
}

export function createInitialProducts() {
  return [
    {
      id: "1",
      name: "Croissant de manteiga",
      category: "Padaria",
      quantity: 18,
      expiry: isoFromToday(0),
      icon: categoryIcons.Padaria,
      image: productImages.Padaria,
    },
    {
      id: "2",
      name: "Iogurte natural",
      category: "Laticínios",
      quantity: 12,
      expiry: isoFromToday(1),
      icon: categoryIcons.Laticínios,
      image: productImages.Laticínios,
    },
    {
      id: "3",
      name: "Banana prata",
      category: "Hortifruti",
      quantity: 24,
      expiry: isoFromToday(3),
      icon: categoryIcons.Hortifruti,
      image: productImages.Hortifruti,
    },
    {
      id: "4",
      name: "Café em grãos",
      category: "Mercearia",
      quantity: 6,
      expiry: isoFromToday(11),
      icon: categoryIcons.Mercearia,
      image: productImages.Mercearia,
    },
  ];
}

export function createInitialHistory() {
  return [
    {
      id: "h1",
      product: "Pão italiano",
      action: "Oferta criada",
      date: "Hoje",
      icon: "pricetag-outline",
      tone: "orange",
    },
    {
      id: "h2",
      product: "Morangos orgânicos",
      action: "Doação registrada",
      date: "Ontem",
      icon: "heart-outline",
      tone: "green",
    },
  ];
}

export const defaultProfile = {
  name: "Marina Costa",
  business: "Café Raiz",
  city: "São Paulo, SP",
  cep: "",
  address: "",
};
