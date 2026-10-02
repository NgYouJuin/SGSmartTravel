import { useState } from "react";
import { View } from "react-native";
import { AuthScreen } from "@/screens/Auth";
import { Arrivals } from "@/screens/Arrivals";
import { Dashboard } from "@/screens/Dashboard";
import { NavDrawer } from "@/screens/Drawer";
import { Alerts, CurrentTrip } from "@/screens/Journey";
import { Fare, Planner, Saved, TripHistory } from "@/screens/Lists";
import { colors, Screen } from "@/theme";

// Single-route prototype with internal screen state, mirroring the web design.
export default function Index() {
  const [signedIn, setSignedIn] = useState(false);
  const [screen, setScreen] = useState<Screen>("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = (next: Screen) => { setScreen(next); setMenuOpen(false); };
  const openMenu = () => setMenuOpen(true);

  if (!signedIn) return <AuthScreen onLogin={() => setSignedIn(true)} />;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {screen === "dashboard" && <Dashboard onMenu={openMenu} navigate={navigate} />}
      {screen === "trip" && <CurrentTrip onMenu={openMenu} />}
      {screen === "alerts" && <Alerts onMenu={openMenu} />}
      {(screen === "bus" || screen === "mrt") && <Arrivals mode={screen} onMenu={openMenu} switchMode={navigate} />}
      {screen === "plan" && <Planner onMenu={openMenu} />}
      {screen === "fare" && <Fare onMenu={openMenu} />}
      {screen === "saved" && <Saved onMenu={openMenu} />}
      {screen === "history" && <TripHistory onMenu={openMenu} />}
      {menuOpen && <NavDrawer close={() => setMenuOpen(false)} navigate={navigate} active={screen} logout={() => { setMenuOpen(false); setSignedIn(false); }} />}
    </View>
  );
}
