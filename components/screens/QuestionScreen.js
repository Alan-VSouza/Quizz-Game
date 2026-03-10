import React, { useMemo, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Vibration,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, globalStyles } from "../../styles/globalStyles";
import ProgressBar from "../ProgressBar";
import QuizOption from "../QuizOption";
import { saveProgress, clearProgress } from "../../services/database";

export default function QuestionScreen({ questions, onFinish, initialData }) {
  const [currentIndex, setCurrentIndex] = useState(
    initialData?.current_index || 0,
  );
  const [correctAnswers, setCorrectAnswers] = useState(
    initialData?.correct_count || 0,
  );
  const [lives, setLives] = useState(initialData?.lives ?? 3);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [timer, setTimer] = useState(15);

  const currentQuestion =
    questions && questions.length > 0 ? questions[currentIndex] : null;

  useEffect(() => {
    if (answered || lives <= 0 || !currentQuestion) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          handleTimeOut();
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentIndex, answered, lives, currentQuestion]);

  function handleTimeOut() {
    Vibration.vibrate(500);
    const newLives = lives - 1;
    setLives(newLives);
    setAnswered(true);

    if (newLives <= 0) {
      setTimeout(() => handleNextQuestion(newLives), 1000);
    }
  }

  const optionsData = useMemo(() => {
    if (!currentQuestion) return [];
    return [
      { label: currentQuestion.resposta1, number: 1 },
      { label: currentQuestion.resposta2, number: 2 },
    ];
  }, [currentIndex, currentQuestion]);

  async function handleOptionPress(optionNumber) {
    if (answered || lives <= 0) return;
    setSelectedAnswer(optionNumber);
    setAnswered(true);

    if (optionNumber === currentQuestion.correta) {
      setCorrectAnswers((prev) => prev + 1);
    } else {
      const newLives = lives - 1;
      setLives(newLives);
      Vibration.vibrate(500);
    }
  }

  async function handleNextQuestion(currentLives = lives) {
    const isLast = currentIndex + 1 >= questions.length;
    const outOfLives = currentLives <= 0;

    if (isLast || outOfLives) {
      await clearProgress();
      onFinish(correctAnswers, questions.length, outOfLives);
      return;
    } else {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setSelectedAnswer(null);
      setAnswered(false);
      setTimer(15);
      await saveProgress(nextIndex, correctAnswers, currentLives);
    }
  }

  if (!currentQuestion) {
    return (
      <SafeAreaView style={globalStyles.container}>
        <View style={globalStyles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={{ color: "#fff", marginTop: 10 }}>
            Carregando questão...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={styles.content}>
        <ProgressBar current={currentIndex + 1} total={questions.length} />

        <View style={styles.statusRow}>
          <Text style={styles.livesText}>
            {lives > 0 ? "❤️ ".repeat(lives) : "💀"}
          </Text>
          <View
            style={[
              styles.timerCircle,
              { borderColor: timer < 5 ? colors.danger : colors.primary },
            ]}
          >
            <Text
              style={[
                styles.timerText,
                { color: timer < 5 ? colors.danger : "#fff" },
              ]}
            >
              {timer}
            </Text>
          </View>
        </View>

        <View style={styles.questionCard}>
          <Text style={styles.questionText}>{currentQuestion.pergunta}</Text>
        </View>

        <View style={styles.optionsList}>
          {optionsData.map((option) => (
            <QuizOption
              key={option.number}
              text={option.label}
              onPress={() => handleOptionPress(option.number)}
              selected={selectedAnswer === option.number}
              isCorrect={
                answered ? option.number === currentQuestion.correta : undefined
              }
            />
          ))}
        </View>

        {answered && (
          <TouchableOpacity
            style={globalStyles.button}
            onPress={() => handleNextQuestion()}
          >
            <Text style={globalStyles.buttonText}>
              {currentIndex + 1 >= questions.length || lives <= 0
                ? "VER RESULTADOS"
                : "PRÓXIMA ➔"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, padding: 20 },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  livesText: { fontSize: 18 },
  timerCircle: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  timerText: { fontWeight: "bold", fontSize: 18 },
  questionCard: {
    backgroundColor: colors.cardBg,
    padding: 25,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20,
  },
  questionText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  optionsList: { flex: 1, justifyContent: "center" },
});
