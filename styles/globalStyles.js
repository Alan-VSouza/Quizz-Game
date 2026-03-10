import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const colors = {
  primary: "#6366f1",
  secondary: "#a855f7",
  success: "#22c55e",
  danger: "#ef4444",
  background: "#0f172a",
  cardBg: "rgba(255, 255, 255, 0.05)",
  text: "#f8fafc",
  textLight: "#94a3b8",
  border: "rgba(255, 255, 255, 0.1)",
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 16,
    width: "100%",
    alignItems: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#fff",
    textAlign: "center",
    marginBottom: 12,
  },
});
