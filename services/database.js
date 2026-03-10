import * as SQLite from "expo-sqlite";

const getDb = async () => {
  return await SQLite.openDatabaseAsync("quizgame.db");
};

export const initializeDatabase = async () => {
  console.log("🛠️ Inicializando Banco de Dados...");
  const db = await getDb();

  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    
    CREATE TABLE IF NOT EXISTS questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pergunta TEXT,
      resposta1 TEXT,
      resposta2 TEXT,
      correta INTEGER
    );

    CREATE TABLE IF NOT EXISTS progress (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      current_index INTEGER,
      correct_count INTEGER,
      lives INTEGER
    );
  `);
  console.log("Tabelas prontas.");
};

export const getAllQuestions = async () => {
  const db = await getDb();
  const rows = await db.getAllAsync("SELECT * FROM questions");
  return rows;
};

export const insertQuestions = async (questions) => {
  const db = await getDb();
  const existing = await db.getFirstAsync(
    "SELECT COUNT(*) as count FROM questions",
  );

  if (existing.count === 0) {
    console.log("Populando banco pela primeira vez...");
    for (const q of questions) {
      await db.runAsync(
        "INSERT INTO questions (pergunta, resposta1, resposta2, correta) VALUES (?, ?, ?, ?)",
        [q[0], q[1], q[2], q[3]],
      );
    }
  }
};

export const saveProgress = async (index, correct, lives) => {
  try {
    const db = await getDb();
    await db.runAsync(
      "INSERT OR REPLACE INTO progress (id, current_index, correct_count, lives) VALUES (1, ?, ?, ?)",
      [index, correct, lives],
    );
    console.log(`Progresso salvo: Pergunta ${index + 1}`);
  } catch (error) {
    console.error("Erro ao salvar progresso:", error);
  }
};

export const getProgress = async () => {
  const db = await getDb();
  const progress = await db.getFirstAsync(
    "SELECT * FROM progress WHERE id = 1",
  );
  return progress;
};

export const clearProgress = async () => {
  const db = await getDb();
  await db.runAsync("DELETE FROM progress WHERE id = 1");
  console.log("Progresso reiniciado.");
};

export const resetDatabase = async () => {
  const db = await getDb();
  await db.execAsync(
    "DROP TABLE IF EXISTS questions; DROP TABLE IF EXISTS progress;",
  );
  console.log("BANCO RESETADO!");
};
