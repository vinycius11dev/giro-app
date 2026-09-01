import { StyleSheet } from "react-native";

const darkBackgrounds = {
  "#FFFDF8": "#101914",
  "#fff": "#1A2820",
  "#FFFFFF": "#1A2820",
  "#F4F5EE": "#24352B",
  "#F6F8F4": "#213229",
  "#EEF2EC": "#24352B",
  "#EEF1EC": "#26372D",
  "#E9F6D5": "#203D2D",
  "#E9F7EF": "#203D2D",
  "#EFF6E8": "#244231",
  "#FFF6DD": "#44371A",
  "#FFF0E8": "#432B22",
};

function themedColor(color, kind) {
  if (!color || typeof color !== "string") return color;
  if (kind === "backgroundColor") return darkBackgrounds[color] || color;
  if (kind === "borderColor") return color.startsWith("#E") || color.startsWith("#D") ? "#34483B" : color;
  if (kind === "color") {
    if (["#1B3528", "#1C3327", "#1D3026", "#1E3228", "#203529", "#22382C", "#23372C", "#253A2E", "#26382E", "#2A3E31", "#304238", "#314036", "#18362A", "#1B3427"].includes(color)) return "#F1F6EF";
    if (color.startsWith("#7") || color.startsWith("#8") || color.startsWith("#9")) return "#B7C4BB";
    if (color === "#0D6A49" || color === "#0D6748" || color === "#0E6A49") return "#8DD3AA";
  }
  return color;
}

export default function buildThemeStyles(baseStyles, { darkMode = false, largeText = false } = {}) {
  if (!darkMode && !largeText) return baseStyles;
  const output = {};
  for (const key of Object.keys(baseStyles)) {
    const source = StyleSheet.flatten(baseStyles[key]);
    if (!source || typeof source !== "object") {
      output[key] = baseStyles[key];
      continue;
    }
    const next = { ...source };
    if (darkMode) {
      if (next.backgroundColor) next.backgroundColor = themedColor(next.backgroundColor, "backgroundColor");
      if (next.borderColor) next.borderColor = themedColor(next.borderColor, "borderColor");
      if (next.color) next.color = themedColor(next.color, "color");
    }
    if (largeText) {
      if (typeof next.fontSize === "number") next.fontSize = Math.round(next.fontSize * 1.1);
      if (typeof next.lineHeight === "number") next.lineHeight = Math.round(next.lineHeight * 1.1);
    }
    output[key] = next;
  }
  return output;
}
