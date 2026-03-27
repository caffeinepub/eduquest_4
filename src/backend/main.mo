import Map "mo:core/Map";
import Array "mo:core/Array";
import Int "mo:core/Int";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Text "mo:core/Text";

actor {
  type Category = Text;
  type ScoreValue = Nat;
  type Timestamp = Time.Time;

  type Score = {
    playerName : Text;
    score : ScoreValue;
    timestamp : Timestamp;
    category : Category;
  };

  module Score {
    public func compareByTimestamp(score1 : Score, score2 : Score) : Order.Order {
      Int.compare(score1.timestamp, score2.timestamp);
    };
    public func compareByScoreDescending(score1 : Score, score2 : Score) : Order.Order {
      Int.compare(score2.score, score1.score);
    };
  };

  let scores = Map.empty<Text, Score>();

  public shared ({ caller }) func submitScore(playerName : Text, score : ScoreValue, category : Category) : async () {
    let newScore : Score = {
      playerName;
      score;
      timestamp = Time.now();
      category;
    };
    scores.add(playerName # "_" # newScore.timestamp.toText(), newScore);
  };

  func sortAndTrimScores(scoresArr : [Score]) : [Score] {
    let sortedScores = scoresArr.sort(Score.compareByScoreDescending);
    let end = if (sortedScores.size() < 10) { sortedScores.size() } else { 10 };
    Array.tabulate<Score>(end, func(i) { sortedScores[i] });
  };

  public query ({ caller }) func getLeaderboard() : async [Score] {
    let scoresArr = scores.values().toArray();
    sortAndTrimScores(scoresArr);
  };

  public query ({ caller }) func getCategoryLeaderboard(category : Category) : async [Score] {
    let filteredScores = scores.values().toArray().filter(
      func(score) {
        score.category == category;
      }
    );
    sortAndTrimScores(filteredScores);
  };

  public query ({ caller }) func getAllScores() : async [Score] {
    scores.values().toArray().sort(Score.compareByTimestamp);
  };
};
