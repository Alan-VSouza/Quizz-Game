import { View, Text, StyleSheet } from "react-native";
import { colors } from "../styles/globalStyles";

export default function ProgressBar({ current, total }) {
  const percentage = (current / total) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>
          Questão {current} de {total}
        </Text>
        <Text style={styles.percentText}>{Math.round(percentage)}%</Text>
      </View>
      <View style={styles.barContainer}>
        <View style={[styles.filledBar, { width: `${percentage}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20, width: "100%" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  text: { fontSize: 12, color: colors.textLight, fontWeight: "700" },
  percentText: { fontSize: 12, color: colors.primary, fontWeight: "700" },
  barContainer: {
    height: 6,
    backgroundColor: colors.cardBg,
    borderRadius: 3,
    overflow: "hidden",
  },
  filledBar: { height: "100%", backgroundColor: colors.primary },
});
