import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Lock, Mail, UserRound } from "lucide-react-native";
import { AppButton, Field, s } from "@/components/ui";
import { colors } from "@/theme";

export function AuthScreen({ onLogin }: { onLogin: () => void }) {
  const [signup, setSignup] = useState(false);
  const ic = <Mail size={15} color={colors.mutedForeground} />;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.skyTop }} edges={["top"]}>
      <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={a.banner}>
          <View style={a.sunset} />
          <View style={a.skyline} />
          <View style={a.brand}>
            <View style={a.logo}><Text style={{ color: "#fff", fontWeight: "900" }}>◎</Text></View>
            <View>
              <Text style={a.brandName}>SGSmartTravel</Text>
              <Text style={a.brandSub}>Your intelligent guide to the Lion City</Text>
            </View>
          </View>
        </View>
        <View style={a.panel}>
          <Text style={s.h1}>{signup ? "Join the Adventure" : "Welcome Back"}</Text>
          <Text style={[s.muted, { marginVertical: 7, lineHeight: 17 }]}>
            {signup ? "Create an account to save custom itineraries, view real-time crowds & unlock smart rewards." : "Log in to access smart routes, EZ-Link integration & curated guides."}
          </Text>
          {signup && <Field label="Username" placeholder="e.g. merlion_explorer" icon={<UserRound size={15} color={colors.mutedForeground} />} hint="Must be unique. Alphanumeric characters only." />}
          <Field label="Email Address" placeholder="e.g. explorer@visitsingapore.com" icon={ic} hint={signup ? "Requires a valid verification email address." : undefined} />
          <Field label="Password" placeholder="••••••••••••" secure icon={<Lock size={15} color={colors.mutedForeground} />} hint={signup ? "Minimum of 8 characters, including a number." : undefined} />
          {signup && <Field label="Age (Optional)" placeholder="e.g. 25" hint="Used strictly to filter age-appropriate museum discounts." />}
          {!signup && <Text style={[s.link, { alignSelf: "flex-end", marginVertical: 4 }]}>Forgot Password?</Text>}
          <AppButton label={signup ? "Create Account" : "Log In"} onPress={onLogin} />
          {!signup && (
            <>
              <View style={a.divider}><View style={a.line} /><Text style={a.or}>OR CONTINUE WITH</Text><View style={a.line} /></View>
              <View style={{ flexDirection: "row", gap: 8 }}>
                <AppButton label="G  Google" tone="quiet" style={{ flex: 1 }} />
                <AppButton label="●  Apple" tone="quiet" style={{ flex: 1 }} />
              </View>
            </>
          )}
        </View>
        <Pressable onPress={() => setSignup(!signup)} style={{ padding: 20 }}>
          <Text style={{ textAlign: "center", fontSize: 12, color: colors.mutedForeground }}>
            {signup ? "Already have an account? " : "Don't have an account? "}
            <Text style={{ color: colors.destructive, fontWeight: "800" }}>{signup ? "Log In" : "Sign Up"}</Text>
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const a = StyleSheet.create({
  banner: { height: 196, backgroundColor: colors.skyMid, overflow: "hidden" },
  sunset: { position: "absolute", left: 0, right: 0, bottom: 0, height: 90, backgroundColor: colors.skyBot, opacity: 0.8 },
  skyline: { position: "absolute", bottom: 0, left: 0, right: 0, height: 56, backgroundColor: colors.foreground, opacity: 0.9 },
  brand: { position: "absolute", left: 20, bottom: 14, flexDirection: "row", alignItems: "center", gap: 8 },
  logo: { width: 30, height: 30, borderRadius: 15, backgroundColor: colors.coral, alignItems: "center", justifyContent: "center" },
  brandName: { color: "#fff", fontSize: 20, fontWeight: "800" },
  brandSub: { color: "#fff", fontSize: 10 },
  panel: { padding: 18, backgroundColor: colors.card, borderBottomLeftRadius: 18, borderBottomRightRadius: 18 },
  divider: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 16, marginBottom: 4 },
  line: { flex: 1, height: 1, backgroundColor: colors.border },
  or: { fontSize: 9, color: colors.mutedForeground },
});
