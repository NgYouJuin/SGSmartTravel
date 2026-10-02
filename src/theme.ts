// Design tokens ported from smart-commute-hub (src/styles.css, oklch -> hex)
export const colors = {
  background: "#EEF6F1", foreground: "#0A121C", card: "#FFFFFF",
  primary: "#149483", primaryForeground: "#FFFFFF", secondary: "#C9EEE5",
  muted: "#E6F1F2", mutedForeground: "#637482", accent: "#F27F5C",
  destructive: "#F14E49", border: "#CDDAE2", deepTeal: "#005047",
  mint: "#C3ECE1", success: "#5AB757", warning: "#EFAC44", softPink: "#FFF1F0",
  coral: "#FF4C4D", skyTop: "#002B43", skyMid: "#008081", skyBot: "#EF816A",
};
export const radius = { sm: 8, md: 12, lg: 16 };
export const shadow = {
  shadowColor: "#1B3A3F", shadowOpacity: 0.12, shadowRadius: 8,
  shadowOffset: { width: 0, height: 4 }, elevation: 3,
};
export type Screen = "dashboard" | "trip" | "alerts" | "bus" | "mrt" | "plan" | "fare" | "saved" | "history";
export const savedTrips = [
  { name: "Lee Wee Nam Lib", route: "Pioneer MRT Station → Lee Wee Nam Lib", time: "3.5 hrs", fav: true },
  { name: "North Spine", route: "Boon Lay MRT Station → North Spine", time: "0.5 hrs", fav: false },
  { name: "North Spine Kofu", route: "Pioneer MRT Station → North Spine Kofu", time: "3.5 hrs", fav: true },
  { name: "Hall 16", route: "Lee Wee Nam Lib → Hall 16", time: "2.5 hrs", fav: false },
  { name: "Home", route: "Lee Wee Nam Lib → Home", time: "2 hrs", fav: true },
];
