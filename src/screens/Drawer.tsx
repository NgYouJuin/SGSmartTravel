import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Bell, Bus, Calculator, History, House, MapPin, Star, TrainFront, X } from "lucide-react-native";
import { colors, Screen } from "@/theme";

const items: { screen: Screen; label: string; Icon: typeof House }[] = [
  { screen: "dashboard", label: "Home", Icon: House }, { screen: "trip", label: "Current Trip", Icon: MapPin },
  { screen: "alerts", label: "Alerts", Icon: Bell }, { screen: "bus", label: "Bus Arrivals", Icon: Bus },
  { screen: "mrt", label: "MRT Arrivals", Icon: TrainFront }, { screen: "plan", label: "Plan a Trip", Icon: MapPin },
  { screen: "fare", label: "Fare Calculation", Icon: Calculator }, { screen: "saved", label: "Saved Plans", Icon: Star },
  { screen: "history", label: "History", Icon: History },
];

export function NavDrawer({ close, navigate, active, logout }: { close: () => void; navigate: (s: Screen) => void; active: Screen; logout: () => void }) {
  return (
    <SafeAreaView style={d.root}>
      <View style={d.top}>
        <Text style={d.brand}>SGSmartTravel</Text>
        <Pressable onPress={close} style={d.close} accessibilityLabel="Close menu"><X color="#fff" size={26} strokeWidth={3} /></Pressable>
      </View>
      <View style={{ paddingHorizontal: 38, paddingVertical: 14 }}>
        {items.map(({ screen, label, Icon }) => (
          <Pressable key={screen} onPress={() => navigate(screen)} style={[d.item, active === screen && { backgroundColor: colors.deepTeal + "90" }]}>
            <Icon color="#fff" size={19} /><Text style={d.label}>{label}</Text>
          </Pressable>
        ))}
      </View>
      <Pressable onPress={logout} style={d.logout}><Text style={{ color: "#fff", fontWeight: "700" }}>Log out</Text></Pressable>
    </SafeAreaView>
  );
}

const d = StyleSheet.create({
  root: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: colors.primary, zIndex: 20 },
  top: { height: 54, justifyContent: "center", alignItems: "center" },
  brand: { color: "#fff", fontWeight: "700", fontSize: 17 },
  close: { position: "absolute", right: 14 },
  item: { height: 51, flexDirection: "row", alignItems: "center", gap: 18, paddingHorizontal: 16, borderRadius: 8 },
  label: { color: "#fff", fontWeight: "700", fontSize: 15 },
  logout: { alignSelf: "center", borderWidth: 1, borderColor: "#ffffff90", borderRadius: 8, paddingVertical: 9, paddingHorizontal: 28, marginTop: 4 },
});
