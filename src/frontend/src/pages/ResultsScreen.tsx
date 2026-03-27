import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Home, Loader2, RefreshCw, Trophy } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Category } from "../data/questions";
import { useSubmitScore } from "../hooks/useQueries";

interface Props {
  score: number;
  category: Category;
  onPlayAgain: () => void;
  onGoHome: () => void;
  onGoLeaderboard: () => void;
}

const getScoreMessage = (
  score: number,
  total: number,
): { emoji: string; title: string; message: string } => {
  const pct = score / total;
  if (pct >= 0.9)
    return {
      emoji: "🏆",
      title: "Outstanding!",
      message: "You're an absolute genius! Keep shining!",
    };
  if (pct >= 0.7)
    return {
      emoji: "🌟",
      title: "Great Job!",
      message: "Excellent performance! You really know your stuff!",
    };
  if (pct >= 0.5)
    return {
      emoji: "👍",
      title: "Well Done!",
      message: "Good effort! Review the topics and try again!",
    };
  return {
    emoji: "💪",
    title: "Keep Going!",
    message: "Learning takes practice. Don't give up — try again!",
  };
};

export default function ResultsScreen({
  score,
  category,
  onPlayAgain,
  onGoHome,
  onGoLeaderboard,
}: Props) {
  const [playerName, setPlayerName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { mutate: submitScore, isPending } = useSubmitScore();

  const total = 10;
  const pct = Math.round((score / total) * 100);
  const { emoji, title, message } = getScoreMessage(score, total);

  const handleSubmit = () => {
    if (!playerName.trim()) {
      toast.error("Please enter your name!");
      return;
    }
    submitScore(
      { playerName: playerName.trim(), score, category },
      {
        onSuccess: () => {
          setSubmitted(true);
          toast.success("Score submitted! 🎉");
        },
        onError: () => toast.error("Failed to submit. Try again!"),
      },
    );
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="bg-white rounded-3xl shadow-hero w-full max-w-lg p-8 text-center"
        data-ocid="results.card"
      >
        {/* Score ring */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-40 h-40 rounded-full mx-auto mb-6 flex flex-col items-center justify-center shadow-lg relative"
          style={{
            background: `conic-gradient(oklch(0.670 0.115 214) ${pct * 3.6}deg, oklch(0.93 0.025 220) 0deg)`,
          }}
        >
          <div className="w-28 h-28 rounded-full bg-white flex flex-col items-center justify-center">
            <span className="text-4xl font-black text-foreground">{score}</span>
            <span className="text-xs font-bold text-muted-foreground">
              out of {total}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-5xl mb-2">{emoji}</div>
          <h2 className="text-3xl font-black text-foreground mb-2">{title}</h2>
          <p className="text-muted-foreground mb-2">{message}</p>
          <div className="inline-flex items-center gap-2 bg-edu-teal/10 text-edu-teal font-bold px-4 py-1.5 rounded-full text-sm mb-6">
            {category} • {pct}% Correct
          </div>
        </motion.div>

        {!submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-muted/40 rounded-2xl p-5 mb-6"
          >
            <h3 className="font-black text-foreground mb-3 flex items-center gap-2 justify-center">
              <Trophy className="w-5 h-5 text-edu-yellow" /> Submit to
              Leaderboard
            </h3>
            <div className="flex gap-3">
              <Input
                placeholder="Enter your name..."
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                className="rounded-xl"
                data-ocid="results.player_name.input"
              />
              <Button
                onClick={handleSubmit}
                disabled={isPending || !playerName.trim()}
                className="gradient-cta border-0 text-white font-bold px-5 rounded-xl whitespace-nowrap"
                data-ocid="results.submit.button"
              >
                {isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Submit!"
                )}
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-edu-green/10 border-2 border-edu-green/30 rounded-2xl p-4 mb-6 text-edu-green font-bold"
            data-ocid="results.submit.success_state"
          >
            🎉 Score submitted! Check the leaderboard!
          </motion.div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={onGoHome}
            className="flex-1 rounded-xl border-2 font-bold"
            data-ocid="results.home.button"
          >
            <Home className="w-4 h-4 mr-2" /> Home
          </Button>
          <Button
            variant="outline"
            onClick={onGoLeaderboard}
            className="flex-1 rounded-xl border-2 font-bold border-edu-teal text-edu-teal hover:bg-edu-teal/10"
            data-ocid="results.leaderboard.button"
          >
            <Trophy className="w-4 h-4 mr-2" /> Leaderboard
          </Button>
          <button
            type="button"
            onClick={onPlayAgain}
            className="flex-1 gradient-cta text-white font-bold py-2 rounded-xl flex items-center justify-center gap-2"
            data-ocid="results.play_again.button"
          >
            <RefreshCw className="w-4 h-4" /> Play Again
          </button>
        </div>
      </motion.div>
    </div>
  );
}
