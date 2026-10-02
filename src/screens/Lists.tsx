import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { ArrowDown, Search, Star } from "lucide-react-native";
import { AppButton, Chips, Field, ScreenFrame, s } from "@/components/ui";
import { colors, savedTrips } from "@/theme";

const line = { flexDirection: "row" as const, justifyContent: "space-between" as const, borderBottomWidth: 1, borderBottomColor: colors.border, paddingVertical: 12 };
const JourneyFields = () => (
  <>
    <Text style={[s.h1, { fontSize: 18 }]}>Plan Your Journey</Text>
    <View style={{ flexDirection: "row", gap: 12 }}><Field label="Preference" placeholder="Bus" /><Field label="Minimum Distance" placeholder="100m" /></View>
    <Field label="Starting Location" placeholder="Pioneer MRT Station" />
    <Field label="Destination" placeholder="Lee Wee Nam Library" />
  </>
);

export function Planner({ onMenu }: { onMenu: () => void }) {
  const [generated, setGenerated] = useState(false);
  return (
    <ScreenFrame onMenu={onMenu}>
      {generated ? (
        <View>
          <Text style={l.center}>Here is the generated travel plan:</Text>
          <Text style={{ fontWeight: "800" }}>Starting Location</Text>
          <View style={{ marginVertical: 15 }}>
            <View style={line}><Text>Pioneer MRT Station</Text><Text>08:15</Text></View>
            <Text style={l.step}><ArrowDown size={18} color={colors.foreground} />  Walk 90 m (2 min)</Text>
            <View style={line}><Text>Pioneer Stn Exit A</Text><Text>08:17</Text></View>
            <View style={line}><Text>Board Bus 179</Text></View>
            <Text style={l.step}><ArrowDown size={18} color={colors.foreground} />  Ride 8 stops (11 min)</Text>
            <View style={line}><Text>Lee Wee Nam Lib</Text><Text>08:28</Text></View>
          </View>
          <Text style={{ fontWeight: "800" }}>Destination Reached</Text>
          <Text style={{ marginTop: 8 }}>Total Fare: <Text style={{ fontWeight: "800" }}>$5.00</Text></Text>
          <AppButton label="Save Travel Plan" />
          <AppButton label="Edit Travel Plan" tone="success" />
          <AppButton label="Regenerate Travel Plan" tone="danger" onPress={() => setGenerated(false)} />
        </View>
      ) : (
        <View>
          <JourneyFields />
          <Field label="Departure Time" placeholder="08:15" />
          <Field label="Arrival Time" placeholder="08:50" />
          <AppButton label="Generate Travel Plan" onPress={() => setGenerated(true)} />
        </View>
      )}
    </ScreenFrame>
  );
}

export function Fare({ onMenu }: { onMenu: () => void }) {
  const [result, setResult] = useState(false);
  return (
    <ScreenFrame onMenu={onMenu}>
      {result ? (
        <View>
          <Text style={l.center}>Here is the total fare:</Text>
          <View style={{ flexDirection: "row", marginVertical: 20 }}>
            <View style={{ flex: 2, padding: 8, borderRightWidth: 1, borderRightColor: colors.border, gap: 14 }}>
              <Text style={{ fontWeight: "800" }}>Transport</Text><Text>1. Bus 179</Text>
              <Text><Text style={{ fontWeight: "700" }}>Board:</Text> Pioneer Stn Exit A</Text>
              <Text>8 stops (3.1 km)</Text>
              <Text><Text style={{ fontWeight: "700" }}>Alight:</Text> Pioneer Stn Exit A</Text>
            </View>
            <View style={{ flex: 1, padding: 8, justifyContent: "space-between" }}><Text style={{ fontWeight: "800" }}>Fare</Text><Text style={{ fontWeight: "800" }}>$5.00</Text></View>
          </View>
          <Text>Total Fare: <Text style={{ fontWeight: "800" }}>$5.00</Text></Text>
          <AppButton label="Go back" onPress={() => setResult(false)} />
        </View>
      ) : (
        <View><JourneyFields /><AppButton label="Calculate total fare" onPress={() => setResult(true)} /></View>
      )}
    </ScreenFrame>
  );
}

export function Saved({ onMenu }: { onMenu: () => void }) {
  const [filter, setFilter] = useState("All");
  const list = filter === "Favourite" ? savedTrips.filter((x) => x.fav) : savedTrips;
  return (
    <ScreenFrame onMenu={onMenu}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <Text style={s.h1}>Saved Plans</Text>
        <View style={l.add}><Text style={{ color: "#fff", fontSize: 24, lineHeight: 28 }}>+</Text></View>
      </View>
      <Chips wide items={["All", "Favourite", "Destination"]} value={filter} onChange={setFilter} />
      {list.map((t) => (
        <View key={t.name} style={l.item}>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}><Text style={l.name}>{t.name}</Text><StarIcon on={t.fav} /></View>
            <Text style={{ fontSize: 10, color: colors.mutedForeground }}>{t.route}</Text>
          </View>
          <Text style={l.edit}>Edit Trip</Text>
        </View>
      ))}
    </ScreenFrame>
  );
}

export function TripHistory({ onMenu }: { onMenu: () => void }) {
  const [q, setQ] = useState("");
  const list = useMemo(() => savedTrips.filter((t) => t.name.toLowerCase().includes(q.toLowerCase())), [q]);
  return (
    <ScreenFrame onMenu={onMenu}>
      <Text style={[s.h1, { fontSize: 23, marginBottom: 16 }]}>My Trips</Text>
      <View style={l.search}><TextInput placeholder="Search..." value={q} onChangeText={setQ} style={{ flex: 1, fontSize: 12 }} /><Search size={16} color={colors.mutedForeground} /></View>
      <Chips wide items={["All", "Upcoming", "Completed"]} value="All" onChange={() => {}} />
      {list.map((t, i) => (
        <View key={t.name} style={l.item}>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}><Text style={l.name}>{t.name}</Text><StarIcon on={t.fav} /></View>
            <Text style={{ fontSize: 10, marginVertical: 2 }}>{t.route}</Text>
            <Text style={{ fontSize: 10, color: colors.mutedForeground }}>Completed: {18 - i * 2} August 2027, 12:{58 - i * 10}pm</Text>
          </View>
          <Text style={l.badge}>Completed</Text>
        </View>
      ))}
    </ScreenFrame>
  );
}

const StarIcon = ({ on }: { on: boolean }) => <Star size={15} color={on ? colors.accent : colors.muted} fill={on ? colors.accent : colors.muted} />;

const l = StyleSheet.create({
  center: { textAlign: "center", fontSize: 16, marginBottom: 28, color: colors.foreground },
  step: { textAlign: "center", paddingVertical: 6, color: colors.foreground },
  add: { width: 36, height: 36, borderRadius: 8, backgroundColor: colors.deepTeal, alignItems: "center", justifyContent: "center" },
  item: { backgroundColor: colors.card, borderRadius: 4, padding: 12, flexDirection: "row", alignItems: "center", marginBottom: 14, gap: 8 },
  name: { fontSize: 17, fontWeight: "700", color: colors.foreground },
  edit: { fontSize: 10, color: colors.mutedForeground, backgroundColor: colors.muted, borderRadius: 13, paddingHorizontal: 14, paddingVertical: 6, overflow: "hidden" },
  badge: { alignSelf: "flex-start", fontSize: 10, color: "#fff", backgroundColor: colors.mutedForeground, borderRadius: 14, paddingHorizontal: 11, paddingVertical: 5, overflow: "hidden" },
  search: { height: 38, backgroundColor: colors.card, borderRadius: 9, flexDirection: "row", alignItems: "center", paddingHorizontal: 11, marginBottom: 18 },
});
