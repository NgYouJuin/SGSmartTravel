import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ArrowDown, Bus, ChevronRight, CircleUserRound, CloudRain, TrainFront, WalletCards } from "lucide-react-native";
import { AppButton, Chips, ScreenFrame, s } from "@/components/ui";
import { colors } from "@/theme";

const row = { flexDirection: "row" as const, justifyContent: "space-between" as const, alignItems: "center" as const, paddingVertical: 12, paddingHorizontal: 8, borderBottomWidth: 1, borderBottomColor: colors.border };

export function CurrentTrip({ onMenu }: { onMenu: () => void }) {
  const [boarded, setBoarded] = useState(false);
  return (
    <ScreenFrame onMenu={onMenu}>
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <Text style={{ fontSize: 15, color: colors.foreground }}>Currently on trip:</Text>
        <Text style={{ fontSize: 17, fontWeight: "800", color: colors.foreground }}>Lee Wee Nam Lib</Text>
      </View>
      <Text style={j.sub}>Progress:</Text>
      <Pressable onPress={() => setBoarded(!boarded)} style={j.progress}>
        <Text style={{ color: "#fff", fontWeight: "800", fontSize: 14 }}>{boarded ? "Boarded: Bus 179" : "Walking"}</Text>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 11 }}>
          {boarded ? <Bus color="#fff" size={40} /> : <Text style={{ fontSize: 36 }}>🚶</Text>}
          <View style={{ height: 3, width: 18, backgroundColor: "#fff" }} />
          <Text style={{ color: "#fff", fontSize: 12, fontWeight: "700", textAlign: "center" }}>{boarded ? "5 stops\n(8 min)" : "45 m\n(1 min)"}</Text>
          <ChevronRight color="#fff" size={34} /><TrainFront color="#fff" size={40} />
        </View>
      </Pressable>
      <Text style={j.sub}>Next:</Text>
      {!boarded && (
        <View>
          <View style={row}><Text>Pioneer Stn Exit A</Text><Text>08:16</Text></View>
          <View style={row}><Text>Board Bus 179</Text><Text style={{ fontSize: 20, fontWeight: "800" }}>2 <Text style={{ fontSize: 10 }}>min</Text></Text></View>
          <View style={row}><View><Text>Crowd level:</Text><Text style={{ color: colors.success }}>Not too crowded</Text></View><Text>Next: <Text style={{ fontWeight: "800" }}>4</Text> min</Text></View>
          <View style={[row, { justifyContent: "center", gap: 12, borderBottomWidth: 0 }]}><ArrowDown size={18} color={colors.foreground} /><Text>Ride 8 stops (11 min)</Text></View>
        </View>
      )}
      <Text style={{ fontWeight: "800", padding: 8, color: colors.foreground }}>Destination reached at 8:30</Text>
      <AppButton label="Cancel Travel Plan" tone="danger" />
    </ScreenFrame>
  );
}

export function Alerts({ onMenu }: { onMenu: () => void }) {
  const [filter, setFilter] = useState("All");
  const all = [
    { cat: "Transport", title: "MRT delay · Downtown Line", body: "~10 min delays between Bugis and Chinatown. Consider the bus 174 instead.", time: "8m ago", Icon: TrainFront, bar: colors.primary },
    { cat: "Weather", title: "Heavy rain expected", body: "Thundery showers 4–6 PM near Marina Bay. Bring an umbrella for the Supertree walk.", time: "32m ago", Icon: CloudRain, bar: colors.warning },
    { cat: "Bookings", title: "Booking confirmed", body: "Gardens by the Bay tickets for 2 · 2:30 PM entry. Added to your Wallet.", time: "1h ago", Icon: WalletCards, bar: colors.success },
    { cat: "Transport", title: "High crowd · Merlion Park", body: "Very busy right now. Best photos after 6 PM when tour groups leave.", time: "Yesterday", Icon: CircleUserRound, bar: colors.primary },
  ];
  const list = filter === "All" ? all : all.filter((x) => x.cat === filter);
  return (
    <ScreenFrame onMenu={onMenu}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <Text style={s.h1}>Alerts</Text><Text style={s.link}>Mark All As Read</Text>
      </View>
      <Chips items={["All", "Transport", "Weather", "Bookings"]} value={filter} onChange={setFilter} />
      <Text style={{ fontSize: 10, color: colors.mutedForeground, marginBottom: 8 }}>TODAY</Text>
      {list.map(({ title, body, time, Icon, bar }) => (
        <View key={title} style={[j.alert, { borderLeftColor: bar }]}>
          <View style={j.alertIcon}><Icon size={16} color={colors.primary} /></View>
          <View style={{ flex: 1 }}><Text style={{ fontSize: 12, fontWeight: "700" }}>{title}</Text><Text style={{ fontSize: 10, marginTop: 3, color: colors.foreground }}>{body}</Text></View>
          <Text style={{ fontSize: 9, color: colors.mutedForeground }}>{time}</Text>
        </View>
      ))}
    </ScreenFrame>
  );
}

const j = StyleSheet.create({
  sub: { fontSize: 16, marginVertical: 14, marginHorizontal: 8, color: colors.foreground },
  progress: { backgroundColor: colors.primary, borderRadius: 14, padding: 14 },
  alert: { flexDirection: "row", gap: 9, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderLeftWidth: 3, borderRadius: 10, padding: 11, marginBottom: 9 },
  alertIcon: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.mint, alignItems: "center", justifyContent: "center" },
});
