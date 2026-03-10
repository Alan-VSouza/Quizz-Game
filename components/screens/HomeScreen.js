import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, globalStyles } from "../../styles/globalStyles";

export default function HomeScreen({
  onStartGame,
  hasSavedGame,
  onContinueGame,
}) {
  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.centerContainer}>
        <View style={styles.glowContainer}>
          <Text style={styles.logoText}>QZ</Text>
        </View>

        <Text style={globalStyles.title}>Quiz Master</Text>
        <Text style={styles.subtitle}>Desafie seu intelecto</Text>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>30</Text>
            <Text style={styles.statLabel}>Questões</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Vidas</Text>
          </View>
        </View>

        <TouchableOpacity style={globalStyles.button} onPress={onStartGame}>
          <Text style={globalStyles.buttonText}>NOVO JOGO 🚀</Text>
        </TouchableOpacity>

        {hasSavedGame && (
          <TouchableOpacity
            style={[globalStyles.button, styles.continueButton]}
            onPress={onContinueGame}
          >
            <Text style={globalStyles.buttonText}>
              RECURAR JOGO (Perg. {hasSavedGame.current_index + 1}) ⏱️
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  glowContainer: {
    width: 100,
    height: 100,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    transform: [{ rotate: "45deg" }],
    shadowColor: colors.primary,
    shadowRadius: 30,
    shadowOpacity: 0.8,
    elevation: 15,
  },
  logoText: {
    fontSize: 40,
    color: "#fff",
    fontWeight: "900",
    transform: [{ rotate: "-45deg" }],
  },
  subtitle: {
    color: colors.textLight,
    fontSize: 18,
    marginBottom: 40,
  },
  statsRow: {
    flexDirection: "row",
    backgroundColor: colors.cardBg,
    borderRadius: 20,
    padding: 20,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statItem: { alignItems: "center", paddingHorizontal: 20 },
  statNumber: { color: "#fff", fontSize: 20, fontWeight: "700" },
  statLabel: { color: colors.textLight, fontSize: 12 },
  divider: { width: 1, backgroundColor: colors.border, height: "100%" },
  continueButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: colors.primary,
    marginTop: 15,
    elevation: 0,
  },
});
