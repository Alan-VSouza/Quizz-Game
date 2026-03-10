# 🧠 Quiz Master - React Native

A high-performance, modern Quiz Application built with **React Native** and **Expo**. This project goes beyond basic requirements by implementing a robust local database system, allowing players to resume games and manage "lives" during their sessions.


## ✨ Features

* **Persistent Progress:** Uses `expo-sqlite` to save your current question, score, and lives. Stop anytime and resume where you left off.
* **Life System:** You start with 3 lives (❤️). Lose them all or run out of time, and it's Game Over!
* **Real-time Timer:** 15-second countdown per question to increase difficulty.
* **Modern UI/UX:** Dark Mode design with "Glassmorphism" effects, haptic feedback (vibration) on errors, and smooth transitions.
* **Smart Randomization:** Questions are shuffled using the Fisher-Yates algorithm for a unique experience every time.

## 🛠️ Tech Stack

* **Framework:** React Native (Expo SDK 54+)
* **Database:** SQLite (via `expo-sqlite`)
* **Navigation:** State-based conditional rendering
* **Icons/UI:** Lucide-ish style with Emojis and Custom CSS-in-JS

## 🚀 How to Run

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Alan-VSouza/Quizz-Game.git](https://github.com/Alan-VSouza/Quizz-Game.git)
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the project:**
    ```bash
    npx expo start
    ```
4.  **Open on your device:**
    Scan the QR Code using the **Expo Go** app (Android) or Camera (iOS).

## 📊 Database Schema

The app manages two main tables:
1.  `questions`: Stores all 30 quiz questions (inserted on first run).
2.  `progress`: A single-row table that tracks the user's current state (`current_index`, `lives`, `correct_count`).

---
## By:
- Alan Souza
- Ana Livia Turazzi
*Developed for academic purposes with a focus on mobile performance and local data persistence.*