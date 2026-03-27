import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Clock, Star, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { CATEGORIES, type Category, QUESTIONS } from "../data/questions";

interface Props {
  category: Category;
  onFinish: (score: number) => void;
  onBack: () => void;
}

const ANSWER_LABELS = ["A", "B", "C", "D"];
const TIME_PER_QUESTION = 15;

export default function QuizGame({ category, onFinish, onBack }: Props) {
  const questions = QUESTIONS[category];
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [transitioning, setTransitioning] = useState(false);

  const catInfo = CATEGORIES.find((c) => c.id === category)!;
  const question = questions[currentQ];

  const timerColor =
    timeLeft > 8 ? "timer-green" : timeLeft > 4 ? "timer-yellow" : "timer-red";
  const timerBarColor =
    timeLeft > 8
      ? "timer-bar-green"
      : timeLeft > 4
        ? "timer-bar-yellow"
        : "timer-bar-red";

  const goNext = useCallback(
    (answeredCorrectly: boolean) => {
      if (transitioning) return;
      setTransitioning(true);
      const newScore = score + (answeredCorrectly ? 1 : 0);

      setTimeout(() => {
        if (currentQ + 1 >= questions.length) {
          onFinish(newScore);
        } else {
          setCurrentQ((q) => q + 1);
          setSelected(null);
          setTimeLeft(TIME_PER_QUESTION);
          setTransitioning(false);
        }
      }, 1200);

      if (answeredCorrectly) setScore(newScore);
    },
    [currentQ, questions.length, score, onFinish, transitioning],
  );

  useEffect(() => {
    if (selected !== null || transitioning) return;
    if (timeLeft <= 0) {
      setSelected(-1);
      goNext(false);
      return;
    }
    const t = setTimeout(() => setTimeLeft((n) => n - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, selected, transitioning, goNext]);

  const handleAnswer = (idx: number) => {
    if (selected !== null || transitioning) return;
    setSelected(idx);
    goNext(idx === question.correctIndex);
  };

  const getAnswerStyle = (idx: number) => {
    if (selected === null) {
      return "bg-white border-2 border-border text-foreground hover:border-edu-teal hover:bg-edu-teal/5 hover:shadow-md";
    }
    if (idx === question.correctIndex) {
      return "bg-edu-green border-2 border-edu-green text-white shadow-lg";
    }
    if (idx === selected && selected !== question.correctIndex) {
      return "bg-destructive border-2 border-destructive text-white";
    }
    return "bg-white border-2 border-border text-muted-foreground opacity-50";
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <div className="bg-white shadow-sm border-b border-border">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="quiz.back.button"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="flex items-center gap-2 font-black text-lg">
            <span>{catInfo.emoji}</span>
            <span className="text-foreground">{category}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-edu-yellow/20 px-3 py-1.5 rounded-full">
            <Star className="w-4 h-4 text-edu-yellow fill-edu-yellow" />
            <span
              className="font-black text-edu-orange"
              data-ocid="quiz.score.panel"
            >
              {score}
            </span>
            <span className="text-xs text-muted-foreground">pts</span>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-8">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm font-bold mb-2">
            <span className="text-muted-foreground">
              Question {currentQ + 1} / {questions.length}
            </span>
            <span className="text-muted-foreground">
              {Math.round((currentQ / questions.length) * 100)}% complete
            </span>
          </div>
          <Progress
            value={(currentQ / questions.length) * 100}
            className="h-3 rounded-full"
          />
        </div>

        {/* Timer */}
        <div
          className="bg-white rounded-2xl p-4 mb-6 shadow-card flex items-center gap-4"
          data-ocid="quiz.timer.panel"
        >
          <Clock className={`w-6 h-6 ${timerColor} flex-shrink-0`} />
          <div className="flex-1">
            <div className="flex justify-between mb-1">
              <span className="text-xs font-bold text-muted-foreground">
                Time Remaining
              </span>
              <span className={`text-sm font-black ${timerColor}`}>
                {timeLeft}s
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
              <div
                className={`h-3 rounded-full transition-all duration-1000 ${timerBarColor}`}
                style={{ width: `${(timeLeft / TIME_PER_QUESTION) * 100}%` }}
              />
            </div>
          </div>
          {timeLeft <= 5 && (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.6 }}
            >
              <Zap className="w-5 h-5 text-destructive" />
            </motion.div>
          )}
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="bg-white rounded-3xl p-8 shadow-card mb-6"
              data-ocid="quiz.question.card"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${catInfo.color} flex-shrink-0 flex items-center justify-center text-xl`}
                >
                  {catInfo.emoji}
                </div>
                <h2 className="text-xl font-black text-foreground leading-snug">
                  {question.question}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {question.options.map((option, idx) => (
                <motion.button
                  key={`q${currentQ}-${option}`}
                  type="button"
                  onClick={() => handleAnswer(idx)}
                  disabled={selected !== null}
                  className={`rounded-2xl p-4 text-left transition-all duration-200 flex items-center gap-3 font-semibold cursor-pointer ${getAnswerStyle(idx)}`}
                  whileHover={selected === null ? { scale: 1.02 } : {}}
                  whileTap={selected === null ? { scale: 0.98 } : {}}
                  data-ocid={`quiz.answer.button.${idx + 1}`}
                >
                  <span className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center text-sm font-black flex-shrink-0">
                    {ANSWER_LABELS[idx]}
                  </span>
                  {option}
                  {selected !== null && idx === question.correctIndex && (
                    <span className="ml-auto text-lg">✅</span>
                  )}
                  {selected === idx && idx !== question.correctIndex && (
                    <span className="ml-auto text-lg">❌</span>
                  )}
                </motion.button>
              ))}
            </div>

            {selected !== null && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-6 p-4 rounded-2xl font-bold text-center text-lg ${
                  selected === question.correctIndex
                    ? "bg-edu-green/10 text-edu-green border-2 border-edu-green/30"
                    : "bg-destructive/10 text-destructive border-2 border-destructive/30"
                }`}
                data-ocid="quiz.feedback.panel"
              >
                {selected === question.correctIndex
                  ? "🎉 Correct! Well done!"
                  : `❌ Oops! The answer was: ${question.options[question.correctIndex]}`}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
