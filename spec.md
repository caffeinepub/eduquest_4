# EduQuest

## Current State
New project — no existing frontend or backend.

## Requested Changes (Diff)

### Add
- Full educational quiz game with categories: Math, Science, Literacy, Global Education
- Multiple choice questions per category with 3 difficulty levels
- Score tracking, timer per question
- Animated correct/wrong feedback
- Global leaderboard (top scores stored in backend)
- Landing page with hero, category cards, leaderboard preview
- Quiz game screen with progress bar, timer, score
- Results screen with score summary and replay option
- About SDG4 page section

### Modify
- N/A

### Remove
- N/A

## Implementation Plan
1. Backend: store high scores (player name, score, category, timestamp); query top 10 per category and global
2. Frontend landing page matching design preview
3. Quiz game logic: question flow, timer (15s/question), score accumulation
4. Results + leaderboard submit flow
5. Leaderboard display page
