import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, globalStyles } from "../../styles/globalStyles";

export default function ResultsScreen({
  correct,
  total,
  onRestart,
  isGameOver,
}) {
  const percentage = Math.round((correct / total) * 100);
  const win = !isGameOver && percentage >= 50;

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.centerContainer}>
        <Text style={styles.emoji}>{win ? "🏆" : "💀"}</Text>
        <Text
          style={[
            globalStyles.title,
            { color: win ? colors.success : colors.danger },
          ]}
        >
          {win ? "VITÓRIA!" : "GAME OVER"}
        </Text>

        <Text style={styles.subtitle}>
          {isGameOver ? "Suas vidas acabaram..." : "Você concluiu o desafio!"}
        </Text>

        <View style={styles.scoreCard}>
          <Text style={styles.scoreLabel}>Pontuação Final</Text>
          <Text style={styles.scoreValue}>{percentage}%</Text>
          <Text style={styles.details}>
            {correct} acertos de {total}
          </Text>
        </View>

        <TouchableOpacity style={globalStyles.button} onPress={onRestart}>
          <Text style={globalStyles.buttonText}>TENTAR NOVAMENTE 🔄</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  emoji: { fontSize: 80, marginBottom: 10 },
  subtitle: { color: colors.textLight, fontSize: 16, marginBottom: 30 },
  scoreCard: {
    backgroundColor: colors.cardBg,
    width: "100%",
    padding: 30,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 40,
    borderWidth: 1,
    borderColor: colors.border,
  },
  scoreLabel: {
    color: colors.textLight,
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 10,
  },
  scoreValue: { color: "#fff", fontSize: 64, fontWeight: "900" },
  details: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
  },
});
