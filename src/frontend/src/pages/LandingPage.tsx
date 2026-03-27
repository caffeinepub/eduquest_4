import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, Globe, Star, Trophy } from "lucide-react";
import { motion } from "motion/react";
import { CATEGORIES, type Category } from "../data/questions";
import { useLeaderboard } from "../hooks/useQueries";

interface Props {
  onStartQuiz: (category: Category) => void;
  onGoLeaderboard: () => void;
}

const SDG_TOPICS = [
  {
    title: "Quality Educators",
    description:
      "Trained teachers are the foundation of quality learning worldwide.",
    color: "from-edu-teal to-edu-blue",
    emoji: "👩‍🏫",
  },
  {
    title: "Global Goals",
    description:
      "SDG 4 ensures inclusive and equitable quality education for all.",
    color: "from-edu-purple to-edu-blue",
    emoji: "🌐",
  },
  {
    title: "Lifelong Learning",
    description:
      "Learning opportunities must be available throughout every stage of life.",
    color: "from-edu-orange to-edu-yellow",
    emoji: "♾️",
  },
];

export default function LandingPage({ onStartQuiz, onGoLeaderboard }: Props) {
  const { data: leaderboard } = useLeaderboard();

  const topScores = leaderboard
    ? [...leaderboard]
        .sort((a, b) => Number(b.score) - Number(a.score))
        .slice(0, 5)
    : [];

  const rankEmoji = (i: number) =>
    ["🥇", "🥈", "🥉", "4️⃣", "5️⃣"][i] ?? String(i + 1);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img
              src="/assets/generated/eduquest-logo-transparent.dim_80x80.png"
              alt="EduQuest"
              className="w-10 h-10"
            />
            <span className="text-2xl font-black text-edu-teal tracking-tight">
              EduQuest
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-foreground/70">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hover:text-edu-teal transition-colors"
              data-ocid="nav.home.link"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("categories")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="hover:text-edu-teal transition-colors"
              data-ocid="nav.categories.link"
            >
              Quiz Categories
            </button>
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("sdg4")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="hover:text-edu-teal transition-colors"
              data-ocid="nav.sdg4.link"
            >
              About SDG4
            </button>
            <button
              type="button"
              onClick={onGoLeaderboard}
              className="hover:text-edu-teal transition-colors"
              data-ocid="nav.leaderboard.link"
            >
              Leaderboard
            </button>
          </nav>
          <button
            type="button"
            onClick={() => onStartQuiz("Math")}
            className="gradient-cta text-white font-bold px-5 py-2 rounded-full text-sm shadow-md hover:opacity-90 transition-all"
            data-ocid="header.play_now.button"
          >
            PLAY NOW 🎮
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="bg-gradient-to-br from-edu-teal/10 via-background to-edu-blue/10 pt-12 pb-0">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <motion.div
                className="flex-1 text-center lg:text-left"
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 bg-edu-yellow/20 text-edu-orange font-bold text-sm px-4 py-1.5 rounded-full mb-4">
                  <Star className="w-4 h-4 fill-edu-yellow text-edu-yellow" />
                  SDG4 — Quality Education for All
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-foreground leading-tight mb-4">
                  EduQuest:
                  <br />
                  <span className="text-edu-teal">Learn.</span>{" "}
                  <span className="text-edu-orange">Quiz.</span>{" "}
                  <span className="text-edu-purple">Shine!</span>
                </h1>
                <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                  Challenge yourself with fun quizzes across Math, Science,
                  Literacy and Global Education. Climb the leaderboard and help
                  promote quality education!
                </p>
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                  <button
                    type="button"
                    onClick={() => onStartQuiz("Global Education")}
                    className="gradient-cta text-white font-bold px-8 py-3.5 rounded-full text-base shadow-hero hover:opacity-90 transition-all flex items-center gap-2"
                    data-ocid="hero.start_quiz.button"
                  >
                    Start Playing <ChevronRight className="w-5 h-5" />
                  </button>
                  <Button
                    variant="outline"
                    onClick={onGoLeaderboard}
                    className="rounded-full px-8 py-3.5 text-base font-bold border-2 border-edu-teal text-edu-teal hover:bg-edu-teal/10"
                    data-ocid="hero.leaderboard.button"
                  >
                    <Trophy className="w-5 h-5 mr-2" /> Leaderboard
                  </Button>
                </div>
                <div className="flex gap-6 mt-8 justify-center lg:justify-start text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-edu-yellow fill-edu-yellow" />{" "}
                    40+ Questions
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4 text-edu-teal" /> 4 Categories
                  </div>
                  <div className="flex items-center gap-1">
                    <Globe className="w-4 h-4 text-edu-purple" /> SDG4 Aligned
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="flex-1 max-w-lg w-full"
                initial={{ opacity: 0, x: 32 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <img
                  src="/assets/generated/hero-illustration.dim_900x400.png"
                  alt="EduQuest Learning Illustration"
                  className="w-full rounded-3xl shadow-hero"
                />
              </motion.div>
            </div>
          </div>
        </div>
        <div
          className="h-10 bg-background"
          style={{ clipPath: "ellipse(55% 100% at 50% 100%)" }}
        />
      </section>

      {/* Category Cards */}
      <section id="categories" className="max-w-6xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">
            Choose Your Learning Path! 🚀
          </h2>
          <p className="text-muted-foreground text-lg">
            Pick a category and start your quiz adventure
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white rounded-3xl p-6 shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1 flex flex-col items-center text-center"
              data-ocid={`categories.item.${i + 1}`}
            >
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-3xl mb-4 shadow-md`}
              >
                {cat.emoji}
              </div>
              <h3 className="font-black text-lg text-foreground mb-2">
                {cat.id}
              </h3>
              <p className="text-sm text-muted-foreground mb-5 flex-1">
                {cat.description}
              </p>
              <button
                type="button"
                onClick={() => onStartQuiz(cat.id)}
                className={`${cat.buttonColor} text-white font-bold px-5 py-2.5 rounded-full text-sm w-full transition-all hover:opacity-90 shadow-sm`}
                data-ocid={`categories.start_quiz.button.${i + 1}`}
              >
                Start Quiz →
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SDG4 Topics */}
      <section
        id="sdg4"
        className="bg-gradient-to-br from-edu-teal/5 to-edu-purple/5 py-16"
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">
              Featured SDG4 Topics 🌍
            </h2>
            <p className="text-muted-foreground text-lg">
              Explore the pillars of quality education worldwide
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {SDG_TOPICS.map((topic, i) => (
              <motion.div
                key={topic.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`bg-gradient-to-br ${topic.color} rounded-3xl p-8 text-white shadow-hero hover:scale-105 transition-transform cursor-pointer`}
                data-ocid={`sdg4.item.${i + 1}`}
              >
                <div className="text-5xl mb-4">{topic.emoji}</div>
                <h3 className="text-2xl font-black mb-3">{topic.title}</h3>
                <p className="text-white/85 leading-relaxed">
                  {topic.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard Preview */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">
            Global Leaderboard 🏆
          </h2>
          <p className="text-muted-foreground text-lg">
            Top players from around the world
          </p>
        </motion.div>
        <div
          className="bg-white rounded-3xl shadow-card overflow-hidden max-w-2xl mx-auto"
          data-ocid="leaderboard.table"
        >
          <div className="bg-gradient-to-r from-edu-teal to-edu-blue p-4 text-white">
            <div className="grid grid-cols-4 gap-2 text-sm font-bold text-white/90">
              <div>Rank</div>
              <div className="col-span-2">Player</div>
              <div className="text-right">Score</div>
            </div>
          </div>
          {topScores.length === 0 ? (
            <div
              className="p-8 text-center"
              data-ocid="leaderboard.empty_state"
            >
              <div className="text-4xl mb-3">🎯</div>
              <p className="text-muted-foreground font-semibold">
                No scores yet — be the first!
              </p>
              <button
                type="button"
                onClick={() => onStartQuiz("Math")}
                className="mt-4 gradient-cta text-white font-bold px-6 py-2.5 rounded-full text-sm"
                data-ocid="leaderboard.play_first.button"
              >
                Play Now!
              </button>
            </div>
          ) : (
            topScores.map((s, i) => (
              <div
                key={`${s.playerName}-${i}`}
                className={`grid grid-cols-4 gap-2 px-4 py-3 text-sm border-b border-border last:border-0 ${i === 0 ? "bg-edu-yellow/10" : ""}`}
                data-ocid={`leaderboard.row.${i + 1}`}
              >
                <div className="font-bold text-lg">{rankEmoji(i)}</div>
                <div className="col-span-2">
                  <div className="font-bold text-foreground">
                    {s.playerName}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {s.category}
                  </div>
                </div>
                <div className="text-right font-black text-edu-teal">
                  {Number(s.score)}/10
                </div>
              </div>
            ))
          )}
        </div>
        <div className="text-center mt-6">
          <button
            type="button"
            onClick={onGoLeaderboard}
            className="text-edu-teal font-bold hover:underline text-sm"
            data-ocid="leaderboard.view_all.button"
          >
            View Full Leaderboard →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-10 mt-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <img
                src="/assets/generated/eduquest-logo-transparent.dim_80x80.png"
                alt="EduQuest"
                className="w-8 h-8"
              />
              <span className="text-xl font-black">EduQuest</span>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-white/70">
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="hover:text-white transition-colors"
              >
                Home
              </button>
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("categories")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="hover:text-white transition-colors"
              >
                Quiz Categories
              </button>
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("sdg4")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="hover:text-white transition-colors"
              >
                About SDG4
              </button>
              <button
                type="button"
                onClick={onGoLeaderboard}
                className="hover:text-white transition-colors"
              >
                Leaderboard
              </button>
            </div>
            <div className="flex items-center gap-2 bg-edu-green/20 text-edu-green border border-edu-green/30 px-3 py-1.5 rounded-full text-xs font-bold">
              🎯 SDG4 Quality Education
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-center text-sm text-white/50">
            © {new Date().getFullYear()}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-edu-teal hover:underline"
            >
              caffeine.ai
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
