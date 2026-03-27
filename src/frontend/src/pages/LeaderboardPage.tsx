import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Loader2, RefreshCw, Trophy } from "lucide-react";
import { motion } from "motion/react";
import type { Score } from "../backend.d";
import { CATEGORIES, type Category } from "../data/questions";
import { useCategoryLeaderboard, useLeaderboard } from "../hooks/useQueries";

interface Props {
  onBack: () => void;
  onStartQuiz: (category: Category) => void;
}

const TABS = [
  "Global",
  "Math",
  "Science",
  "Literacy",
  "Global Education",
] as const;
type Tab = (typeof TABS)[number];

function formatDate(timestamp: bigint): string {
  const ms = Number(timestamp / BigInt(1_000_000));
  if (Number.isNaN(ms) || ms < 1_000_000) return "—";
  return new Date(ms).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function ScoreTable({
  scores,
  loading,
}: { scores?: Score[]; loading: boolean }) {
  const rankEmoji = (i: number) => ["🥇", "🥈", "🥉"][i] ?? `${i + 1}`;

  if (loading) {
    return (
      <div
        className="flex flex-col items-center justify-center py-20 gap-3"
        data-ocid="leaderboard.loading_state"
      >
        <Loader2 className="w-8 h-8 animate-spin text-edu-teal" />
        <p className="text-muted-foreground font-semibold">Loading scores...</p>
      </div>
    );
  }

  if (!scores || scores.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-20 gap-3"
        data-ocid="leaderboard.empty_state"
      >
        <div className="text-5xl">🎯</div>
        <p className="font-black text-lg text-foreground">No scores yet!</p>
        <p className="text-muted-foreground text-sm">
          Be the first to claim the top spot.
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-border" data-ocid="leaderboard.table">
      {scores.slice(0, 10).map((s, i) => (
        <motion.div
          key={`${s.playerName}-${s.timestamp}-${i}`}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          className={`flex items-center gap-4 px-6 py-4 ${
            i === 0
              ? "bg-edu-yellow/10"
              : i === 1
                ? "bg-muted/30"
                : i === 2
                  ? "bg-edu-orange/5"
                  : ""
          }`}
          data-ocid={`leaderboard.row.${i + 1}`}
        >
          <div className="w-10 text-center text-xl font-black">
            {rankEmoji(i)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-black text-foreground truncate">
              {s.playerName}
            </div>
            <div className="text-xs text-muted-foreground">
              {s.category} • {formatDate(s.timestamp)}
            </div>
          </div>
          <div className="text-right">
            <div className="font-black text-lg text-edu-teal">
              {Number(s.score)}/10
            </div>
            <div className="text-xs text-muted-foreground">
              {Math.round((Number(s.score) / 10) * 100)}%
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function CategoryTab({ category }: { category: string }) {
  const { data, isLoading } = useCategoryLeaderboard(category);
  return <ScoreTable scores={data} loading={isLoading} />;
}

export default function LeaderboardPage({ onBack, onStartQuiz }: Props) {
  const {
    data: globalScores,
    isLoading: globalLoading,
    refetch,
  } = useLeaderboard();

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-white shadow-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="leaderboard.back.button"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-edu-yellow" />
            <span className="font-black text-xl text-foreground">
              Leaderboard
            </span>
          </div>
          <button
            type="button"
            onClick={() => refetch()}
            className="p-2 hover:bg-muted rounded-xl transition-colors"
            title="Refresh"
            data-ocid="leaderboard.refresh.button"
          >
            <RefreshCw className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="gradient-hero rounded-3xl p-8 text-white text-center mb-8 shadow-hero"
        >
          <div className="text-5xl mb-3">🏆</div>
          <h1 className="text-3xl font-black mb-2">Global Leaderboard</h1>
          <p className="text-white/80">Top 10 players across all categories</p>
        </motion.div>

        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => onStartQuiz(cat.id)}
              className={`${cat.buttonColor} text-white font-bold px-4 py-2 rounded-full text-sm transition-all hover:opacity-90 flex items-center gap-1.5`}
              data-ocid="leaderboard.play_category.button"
            >
              {cat.emoji} {cat.id}
            </button>
          ))}
        </div>

        <Tabs defaultValue="Global">
          <TabsList className="w-full mb-6 bg-muted/50 rounded-2xl p-1 flex flex-wrap h-auto gap-1">
            {TABS.map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="flex-1 rounded-xl font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm"
                data-ocid={`leaderboard.${tab.toLowerCase().replace(" ", "_")}.tab`}
              >
                {tab === "Global"
                  ? "🌐"
                  : tab === "Math"
                    ? "📐"
                    : tab === "Science"
                      ? "🔬"
                      : tab === "Literacy"
                        ? "📚"
                        : "🌍"}{" "}
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="bg-white rounded-3xl shadow-card overflow-hidden">
            <TabsContent value="Global" className="mt-0">
              <ScoreTable scores={globalScores} loading={globalLoading} />
            </TabsContent>
            {(["Math", "Science", "Literacy", "Global Education"] as Tab[]).map(
              (cat) => (
                <TabsContent key={cat} value={cat} className="mt-0">
                  <CategoryTab category={cat} />
                </TabsContent>
              ),
            )}
          </div>
        </Tabs>
      </div>
    </div>
  );
}
