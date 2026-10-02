import { ReactNode } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Menu } from "lucide-react-native";
import { colors, radius, shadow } from "@/theme";

export function AppButton({ label, onPress, tone = "primary", style }: { label: string; onPress?: () => void; tone?: "primary" | "danger" | "success" | "quiet"; style?: ViewStyle }) {
  const bg = { primary: colors.primary, danger: colors.destructive, success: colors.success, quiet: colors.card }[tone];
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [s.btn, { backgroundColor: bg, opacity: pressed ? 0.85 : 1 }, tone === "quiet" && { borderWidth: 1, borderColor: colors.border, shadowOpacity: 0 }, style]}>
      <Text style={[s.btnText, tone === "quiet" && { color: colors.foreground }]}>{label}</Text>
    </Pressable>
  );
}

export function Header({ title = "SGSmartTravel", onMenu, onBack }: { title?: string; onMenu?: () => void; onBack?: () => void }) {
  const Icon = onBack ? ArrowLeft : Menu;
  return (
    <View style={s.header}>
      <Pressable onPress={onBack ?? onMenu} hitSlop={8} accessibilityLabel={onBack ? "Go back" : "Open menu"}>
        <Icon color="#fff" size={26} strokeWidth={3} />
      </Pressable>
      <Text style={s.headerTitle}>{title}</Text>
      <View style={{ width: 26 }} />
    </View>
  );
}

/** Teal header + scrollable body, the shared layout for most screens. */
export function ScreenFrame({ children, onMenu, title }: { children: ReactNode; onMenu?: () => void; title?: string }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }} edges={["top"]}>
      <Header onMenu={onMenu} title={title} />
      <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

export function Field({ label, placeholder, icon, hint, value, onChangeText, secure }: { label: string; placeholder: string; icon?: ReactNode; hint?: string; value?: string; onChangeText?: (t: string) => void; secure?: boolean }) {
  return (
    <View style={{ marginVertical: 8, flex: 1 }}>
      <Text style={s.fieldLabel}>{label}</Text>
      <View style={s.inputWrap}>
        {icon}
        <TextInput style={s.input} placeholder={placeholder} placeholderTextColor={colors.mutedForeground + "99"} value={value} onChangeText={onChangeText} secureTextEntry={secure} />
      </View>
      {hint ? <Text style={s.hint}>{hint}</Text> : null}
    </View>
  );
}

export function SectionTitle({ title, action, onPress }: { title: string; action: string; onPress: () => void }) {
  return (
    <View style={s.sectionTitle}>
      <Text style={s.h2}>{title}</Text>
      <Pressable onPress={onPress}><Text style={s.link}>{action}</Text></Pressable>
    </View>
  );
}

export function Chips({ items, value, onChange, wide }: { items: string[]; value: string; onChange: (v: string) => void; wide?: boolean }) {
  return (
    <View style={{ flexDirection: "row", gap: 8, marginBottom: 18 }}>
      {items.map((x) => (
        <Pressable key={x} onPress={() => onChange(x)} style={[s.chip, wide && { flex: 1, borderRadius: 4 }, x === value && { backgroundColor: colors.primary, borderColor: colors.primary }]}>
          <Text style={[s.chipText, x === value && { color: "#fff" }]}>{x}</Text>
        </Pressable>
      ))}
    </View>
  );
}

export const s = StyleSheet.create({
  btn: { minHeight: 46, borderRadius: 10, alignItems: "center", justifyContent: "center", paddingHorizontal: 16, marginTop: 10, ...shadow },
  btnText: { color: "#fff", fontWeight: "800", fontSize: 14 },
  header: { height: 54, backgroundColor: colors.primary, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 14 },
  headerTitle: { color: "#fff", fontWeight: "700", fontSize: 17 },
  fieldLabel: { fontSize: 12, fontWeight: "700", color: colors.foreground, marginBottom: 6 },
  inputWrap: { height: 44, borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm, flexDirection: "row", alignItems: "center", paddingHorizontal: 11, gap: 9, backgroundColor: colors.card },
  input: { flex: 1, fontSize: 13, color: colors.foreground },
  hint: { fontSize: 10, color: colors.mutedForeground, marginTop: 4 },
  sectionTitle: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 14, marginBottom: 8 },
  h1: { fontSize: 22, fontWeight: "800", color: colors.foreground },
  h2: { fontSize: 15, fontWeight: "700", color: colors.foreground },
  link: { color: colors.primary, fontSize: 11, fontWeight: "700" },
  chip: { height: 30, borderRadius: 18, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card, paddingHorizontal: 16, alignItems: "center", justifyContent: "center" },
  chipText: { fontSize: 11, fontWeight: "700", color: colors.mutedForeground },
  card: { backgroundColor: colors.card, borderRadius: radius.md, padding: 12, ...shadow },
  muted: { fontSize: 11, color: colors.mutedForeground },
});
