import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Bus, ChevronRight, MapPin, Menu, Search, TrainFront } from "lucide-react-native";
import { colors, Screen } from "@/theme";

type Row = [string, string, string, string, string, string];
const BUS: Row[] = [["179", "Boon Lay", "Single-Deck", "1", "Limited", "5 · 11"], ["179B", "Jurong West St 63", "Double-Deck", "2", "Standing", "8 · 17"], ["179A", "Nanyang Technological University (NTU)", "Double-Deck", "5", "Seats Avail", "12 · 24"]];
const MRT: Row[] = [["EW", "Pasir Ris", "East West Line", "Arr", "Seats Avail", "12 · 24"], ["EW", "Pasir Ris", "East West Line", "4", "Limited", "5 · 11"], ["EW", "Tuas Link", "East West Line", "8", "Standing", "8 · 17"]];

export function Arrivals({ mode, onMenu, switchMode }: { mode: "bus" | "mrt"; onMenu: () => void; switchMode: (s: Screen) => void }) {
  const isBus = mode === "bus", q = isBus ? "27211" : "EW28";
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }} edges={["top"]}>
      <View style={a.header}>
        <Pressable onPress={onMenu} hitSlop={8}><Menu color="#fff" size={26} strokeWidth={3} /></Pressable>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
          <Text style={{ color: "#fff", fontSize: 21, fontWeight: "800" }}>Live {isBus ? "Bus" : "MRT"} Arrivals</Text>
          <Text style={a.live}>● LIVE</Text>
        </View>
        <View style={a.search}>
          <Search size={16} color={colors.mutedForeground} />
          <TextInput value={q} editable={false} style={{ flex: 1, fontWeight: "700" }} />
          <View style={a.go}><Search size={20} color="#fff" /></View>
        </View>
        <Text style={{ color: "#ffffffa6", fontSize: 11, marginTop: 11 }}>Search Result: <Text style={a.chip}> {q} </Text></Text>
      </View>
      <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
        <Pressable onPress={() => switchMode(isBus ? "mrt" : "bus")} style={a.station}>
          <View style={a.pin}><MapPin size={18} color={colors.primary} /></View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 14, fontWeight: "700" }}>{isBus ? "Lee Wee Nam Library" : "Pioneer MRT Station"}</Text>
            <Text style={{ fontSize: 10, color: colors.mutedForeground }}>{isBus ? "Nanyang Ave · NTU" : "31 Jurong West Street 63"}</Text>
          </View>
          <ChevronRight size={17} color={colors.mutedForeground} />
        </Pressable>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 13 }}>
          <Text style={{ fontSize: 10, color: colors.mutedForeground }}><Text style={{ color: colors.success }}>●</Text> Updated 5s ago · auto-refresh</Text>
          <Text style={{ fontSize: 10, fontWeight: "700", color: colors.primary }}>↻ Refresh</Text>
        </View>
        {(isBus ? BUS : MRT).map((r, i) => (
          <View key={i} style={a.card}>
            <View style={a.num}><Text style={{ color: "#fff", fontWeight: "800" }}>{r[0]}</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 13, fontWeight: "700" }}>{r[1]}</Text>
              <Text style={a.tag}>{r[2]}</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={{ fontSize: 24, fontWeight: "800" }}>{r[3]}{r[3] !== "Arr" && <Text style={{ fontSize: 10, fontWeight: "400" }}> min</Text>}</Text>
              <Text style={{ fontSize: 10, color: colors.destructive, fontWeight: "700" }}>{r[4]}</Text>
              <Text style={{ fontSize: 10, color: colors.mutedForeground }}>then {r[5]} min</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <SafeAreaView edges={["bottom"]} style={a.switchWrap} pointerEvents="box-none">
        <View style={a.switch}>
          {([["bus", Bus, "Bus"], ["mrt", TrainFront, "MRT"]] as const).map(([k, Icon, label]) => (
            <Pressable key={k} onPress={() => switchMode(k)} style={[a.seg, mode === k && { backgroundColor: colors.primary }]}>
              <Icon size={16} color={mode === k ? "#fff" : colors.mutedForeground} />
              <Text style={{ fontSize: 12, fontWeight: "700", color: mode === k ? "#fff" : colors.mutedForeground }}>{label}</Text>
            </Pressable>
          ))}
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
}

const a = StyleSheet.create({
  header: { backgroundColor: colors.primary, paddingHorizontal: 16, paddingTop: 12, paddingBottom: 14 },
  live: { color: "#fff", fontSize: 9, backgroundColor: colors.deepTeal, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10, overflow: "hidden" },
  search: { height: 46, backgroundColor: colors.card, borderRadius: 24, flexDirection: "row", alignItems: "center", paddingLeft: 13, gap: 8, marginTop: 10 },
  go: { width: 38, height: 38, borderRadius: 19, backgroundColor: colors.accent, alignItems: "center", justifyContent: "center", marginRight: 4 },
  chip: { backgroundColor: colors.deepTeal, color: "#fff", fontWeight: "800" },
  station: { backgroundColor: colors.card, borderRadius: 14, padding: 12, flexDirection: "row", alignItems: "center", gap: 10 },
  pin: { width: 38, height: 38, borderRadius: 10, backgroundColor: colors.mint, alignItems: "center", justifyContent: "center" },
  card: { backgroundColor: colors.card, borderRadius: 16, padding: 12, flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 11 },
  num: { width: 50, height: 50, borderRadius: 12, backgroundColor: colors.deepTeal, alignItems: "center", justifyContent: "center" },
  tag: { fontSize: 9, backgroundColor: colors.muted, color: colors.mutedForeground, paddingHorizontal: 5, paddingVertical: 2, borderRadius: 3, alignSelf: "flex-start", marginTop: 6, overflow: "hidden" },
  switchWrap: { position: "absolute", left: 16, right: 16, bottom: 0 },
  switch: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 4, flexDirection: "row", marginBottom: 8 },
  seg: { flex: 1, height: 40, borderRadius: 8, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 7 },
});
