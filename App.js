import React, { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Platform,
  Text,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "./styles/globalStyles";

import HomeScreen from "./components/screens/HomeScreen";
import QuestionScreen from "./components/screens/QuestionScreen";
import ResultsScreen from "./components/screens/ResultsScreen";

import {
  initializeDatabase,
  insertQuestions,
  getAllQuestions,
  getProgress,
  clearProgress,
} from "./services/database";
import { questionData, shuffleArray } from "./services/quizData";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [savedGame, setSavedGame] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    initializeApp();
  }, []);

  async function initializeApp() {
    try {
      setLoading(true);

      if (Platform.OS !== "web") {
        await initializeDatabase();
        await insertQuestions(questionData);
        const loadedQuestions = await getAllQuestions();
        setQuestions(loadedQuestions);

        const progress = await getProgress();
        if (progress) {
          setSavedGame(progress);
        }
      } else {
        const webQuestions = questionData.map((q, i) => ({
          id: i + 1,
          pergunta: q[0],
          resposta1: q[1],
          resposta2: q[2],
          correta: q[3],
        }));
        setQuestions(webQuestions);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Falha ao carregar base de dados.");
    } finally {
      setLoading(false);
    }
  }

  function handleRestart() {
    setCorrectAnswers(0);
    setTotalQuestions(0);
    setIsGameOver(false);
    setSavedGame(null);
    setScreen("home");
  }

  function handleStartGame() {
    clearProgress();
    setSavedGame(null);
    setQuestions(shuffleArray([...questions]));
    setScreen("question");
  }

  function handleContinueGame() {
    setScreen("question");
  }

  function handleFinishGame(correct, total, gameOverStatus) {
    setCorrectAnswers(correct);
    setTotalQuestions(total);
    setIsGameOver(gameOverStatus);
    setSavedGame(null);
    setScreen("results");
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        {screen === "home" && (
          <HomeScreen
            onStartGame={handleStartGame}
            hasSavedGame={savedGame}
            onContinueGame={handleContinueGame}
          />
        )}
        {screen === "question" && (
          <QuestionScreen
            questions={questions}
            onFinish={handleFinishGame}
            initialData={savedGame}
          />
        )}
        {screen === "results" && (
          <ResultsScreen
            correct={correctAnswers}
            total={totalQuestions}
            onRestart={handleRestart}
            isGameOver={isGameOver}
          />
        )}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
});
