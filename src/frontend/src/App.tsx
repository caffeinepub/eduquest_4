import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import type { Category } from "./data/questions";
import LandingPage from "./pages/LandingPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import QuizGame from "./pages/QuizGame";
import ResultsScreen from "./pages/ResultsScreen";

const queryClient = new QueryClient();

type View = "landing" | "quiz" | "results" | "leaderboard";

export default function App() {
  const [view, setView] = useState<View>("landing");
  const [selectedCategory, setSelectedCategory] = useState<Category>("Math");
  const [finalScore, setFinalScore] = useState(0);

  const startQuiz = (category: Category) => {
    setSelectedCategory(category);
    setView("quiz");
  };

  const handleFinish = (score: number) => {
    setFinalScore(score);
    setView("results");
  };

  return (
    <QueryClientProvider client={queryClient}>
      {view === "landing" && (
        <LandingPage
          onStartQuiz={startQuiz}
          onGoLeaderboard={() => setView("leaderboard")}
        />
      )}
      {view === "quiz" && (
        <QuizGame
          category={selectedCategory}
          onFinish={handleFinish}
          onBack={() => setView("landing")}
        />
      )}
      {view === "results" && (
        <ResultsScreen
          score={finalScore}
          category={selectedCategory}
          onPlayAgain={() => startQuiz(selectedCategory)}
          onGoHome={() => setView("landing")}
          onGoLeaderboard={() => setView("leaderboard")}
        />
      )}
      {view === "leaderboard" && (
        <LeaderboardPage
          onBack={() => setView("landing")}
          onStartQuiz={startQuiz}
        />
      )}
      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  );
}
