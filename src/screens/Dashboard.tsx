import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Bell, Bus, Calculator, ChevronRight, MapPin, Menu, Search, TrainFront } from "lucide-react-native";
import { SectionTitle, s } from "@/components/ui";
import { colors, savedTrips, Screen, shadow } from "@/theme";

export function Dashboard({ onMenu, navigate }: { onMenu: () => void; navigate: (s: Screen) => void }) {
  const actions: [Screen, string, typeof Bus][] = [["bus", "Bus Arrivals", Bus], ["mrt", "MRT Arrivals", TrainFront], ["plan", "Plan a Trip", MapPin], ["fare", "Fare Calculation", Calculator]];
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }} edges={["top"]}>
      <View style={d.top}>
        <View style={d.bar}>
          <Pressable onPress={onMenu} hitSlop={8}><Menu color="#fff" size={26} strokeWidth={3} /></Pressable>
          <Text style={s.headerTitle}>SGSmartTravel</Text><View style={{ width: 26 }} />
        </View>
        <View style={d.greet}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: "#ffffffd9", fontSize: 11 }}>Good morning</Text>
            <Text style={{ color: "#fff", fontSize: 20, fontWeight: "800" }}>Hi, Explorer 👋</Text>
          </View>
          <Pressable onPress={() => navigate("alerts")} style={[d.circle, { backgroundColor: colors.deepTeal }]}><Bell color="#fff" size={15} /></Pressable>
          <View style={[d.circle, { backgroundColor: colors.accent }]}><Text style={{ color: "#fff", fontWeight: "800" }}>E</Text></View>
        </View>
        <View style={d.search}><Search size={16} color={colors.mutedForeground} /><TextInput placeholder="Search places, guides, MRT..." style={{ flex: 1, fontSize: 12 }} /></View>
      </View>
      <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
        <View style={{ flexDirection: "row", marginBottom: 12 }}>
          {actions.map(([k, label, Icon]) => (
            <Pressable key={k} onPress={() => navigate(k)} style={{ flex: 1, alignItems: "center" }}>
              <View style={d.action}><Icon color={colors.primary} size={20} /></View>
              <Text style={{ fontSize: 10, marginTop: 6, textAlign: "center", color: colors.foreground }}>{label}</Text>
            </Pressable>
          ))}
        </View>
        <SectionTitle title="Your current trip" action="Details" onPress={() => navigate("trip")} />
        <Pressable onPress={() => navigate("trip")} style={d.trip}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "800" }}>Hall 16</Text>
            <Text style={d.tripSub}>Lee Wee Nam Lib → Hall 16</Text>
            <Text style={{ color: "#fff", fontSize: 9 }}>PROGRESS: 50%</Text>
            <View style={d.track}><View style={d.fill} /></View>
            <Text style={d.tripSub}>Next · <Text style={{ fontWeight: "800", color: "#fff" }}>Pioneer Stn Exit A</Text> · 2:30 PM</Text>
          </View>
          <View style={d.chev}><ChevronRight color={colors.primary} size={17} /></View>
        </Pressable>
        <SectionTitle title="Saved Plans" action="See all" onPress={() => navigate("saved")} />
        <View style={d.grid}>{savedTrips.slice(2, 4).map((t) => (
          <Pressable key={t.name} onPress={() => navigate("saved")} style={d.mini}><Text style={d.miniB}>{t.name}</Text><Text style={d.miniS}>Travel Time: {t.time}</Text></Pressable>
        ))}</View>
        <SectionTitle title="History" action="See all" onPress={() => navigate("history")} />
        <View style={d.grid}>{savedTrips.slice(1, 3).map((t, i) => (
          <Pressable key={t.name} onPress={() => navigate("history")} style={d.mini}><Text style={d.miniB}>{t.name}</Text><Text style={d.miniS}>{i ? "25 August 2027, 11:50am" : "18 August 2027, 12:38pm"}</Text></Pressable>
        ))}</View>
      </ScrollView>
    </SafeAreaView>
  );
}

const d = StyleSheet.create({
  top: { backgroundColor: colors.primary, paddingBottom: 15 },
  bar: { height: 54, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 14 },
  greet: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingBottom: 10, gap: 9 },
  circle: { width: 34, height: 34, borderRadius: 17, alignItems: "center", justifyContent: "center" },
  search: { height: 40, marginHorizontal: 16, backgroundColor: colors.card, borderRadius: 9, flexDirection: "row", alignItems: "center", paddingHorizontal: 11, gap: 8 },
  action: { width: 46, height: 46, borderRadius: 12, backgroundColor: colors.mint, alignItems: "center", justifyContent: "center" },
  trip: { backgroundColor: colors.deepTeal, borderRadius: 14, padding: 16, flexDirection: "row", alignItems: "center", ...shadow },
  tripSub: { color: "#ffffffbf", fontSize: 10, marginVertical: 4 },
  track: { height: 4, backgroundColor: "#ffffff3d", borderRadius: 4, marginVertical: 8 },
  fill: { width: "50%", height: 4, backgroundColor: "#fff", borderRadius: 4 },
  chev: { width: 28, height: 28, borderRadius: 14, backgroundColor: "#fff", alignItems: "center", justifyContent: "center" },
  grid: { flexDirection: "row", gap: 8 },
  mini: { flex: 1, backgroundColor: colors.card, borderRadius: 10, padding: 11, ...shadow },
  miniB: { fontSize: 12, fontWeight: "700", color: colors.foreground },
  miniS: { fontSize: 9, color: colors.mutedForeground, marginTop: 2 },
});
