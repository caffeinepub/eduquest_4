import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export type ScoreValue = bigint;
export type Category = string;
export interface Score {
    score: ScoreValue;
    timestamp: Timestamp;
    playerName: string;
    category: Category;
}
export interface backendInterface {
    getAllScores(): Promise<Array<Score>>;
    getCategoryLeaderboard(category: Category): Promise<Array<Score>>;
    getLeaderboard(): Promise<Array<Score>>;
    submitScore(playerName: string, score: ScoreValue, category: Category): Promise<void>;
}
