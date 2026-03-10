import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "../styles/globalStyles";

export default function QuizOption({ text, onPress, selected, isCorrect }) {
  let borderColor = colors.border;
  let shadowColor = "transparent";

  if (selected) {
    if (isCorrect === true) borderColor = colors.success;
    else if (isCorrect === false) borderColor = colors.danger;
    else borderColor = colors.primary;
  }

  return (
    <TouchableOpacity
      style={[styles.option, { borderColor }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.text}>{text}</Text>
      {selected && isCorrect === true && <Text style={styles.icon}>✓</Text>}
      {selected && isCorrect === false && <Text style={styles.icon}>✕</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  option: {
    backgroundColor: colors.cardBg,
    padding: 20,
    borderRadius: 20,
    marginVertical: 10,
    borderWidth: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: { color: "#fff", fontSize: 16, fontWeight: "600" },
  icon: { color: "#fff", fontWeight: "bold" },
});
