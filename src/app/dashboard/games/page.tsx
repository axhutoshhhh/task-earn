'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface GameQuest {
  id: string;
  title: string;
  genre: string;
  rewardPoints: number;
  milestone: string;
  icon: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const FEATURED_GAMES: GameQuest[] = [
  {
    id: 'game-1',
    title: 'Neon Reflex Runner',
    genre: 'Arcade / Reflex',
    rewardPoints: 50,
    milestone: 'Survive 30 seconds & dodge obstacles',
    icon: '⚡',
    difficulty: 'Medium',
  },
  {
    id: 'game-2',
    title: 'Cyber Sudoku Master',
    genre: 'Logic / Puzzle',
    rewardPoints: 40,
    milestone: 'Complete 1 standard 9x9 grid under 5 mins',
    icon: '🧩',
    difficulty: 'Easy',
  },
  {
    id: 'game-3',
    title: 'Galaxy Commander Odyssey',
    genre: 'Strategy / RPG',
    rewardPoints: 120,
    milestone: 'Reach Base Level 10 & defeat Sector Boss',
    icon: '🚀',
    difficulty: 'Hard',
  },
  {
    id: 'game-4',
    title: 'Match-3 Royal Kingdom',
    genre: 'Casual Match-3',
    rewardPoints: 60,
    milestone: 'Clear Stage 20 & unlock Golden Chest',
    icon: '👑',
    difficulty: 'Easy',
  },
];

export default function GamesPage() {
  // Built-in interactive mini reflex game
  const [isPlayingMiniGame, setIsPlayingMiniGame] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [targetPosition, setTargetPosition] = useState({ top: 40, left: 50 });
  const [gameOver, setGameOver] = useState(false);
  const [claimedReward, setClaimedReward] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Timer loop for the mini-game
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlayingMiniGame) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsPlayingMiniGame(false);
            setGameOver(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlayingMiniGame]);

  const startMiniGame = () => {
    setIsPlayingMiniGame(true);
    setGameScore(0);
    setTimeLeft(15);
    setGameOver(false);
    setClaimedReward(false);
    moveTarget();
  };

  const moveTarget = () => {
    const top = Math.floor(Math.random() * 70) + 10;
    const left = Math.floor(Math.random() * 75) + 10;
    setTargetPosition({ top, left });
  };

  const handleTargetClick = () => {
    if (!isPlayingMiniGame) return;
    setGameScore((prev) => prev + 1);
    moveTarget();
  };

  const claimMiniGamePoints = () => {
    if (gameScore >= 5 && !claimedReward) {
      setClaimedReward(true);
      const points = gameScore * 5;
      setToast(`+${points} Points claimed from mini-game reflex challenge!`);
      setTimeout(() => setToast(null), 4000);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f4fd] py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-[#793FFF] transition"
          >
            ← Back to Dashboard
          </Link>
          <span className="self-start sm:self-auto rounded-full bg-emerald-50 border border-emerald-200 px-3.5 py-1 text-xs font-bold text-emerald-700 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Play & Earn Rewards
          </span>
        </div>

        {/* Page Title */}
        <div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-950">
            Play Games to Earn Rewards
          </h1>
          <p className="mt-2 text-sm text-slate-600 max-w-2xl">
            Test exciting arcade, puzzle, and strategy titles. Complete in-game target milestones to unlock verified reward points.
          </p>
        </div>

        {/* Interactive Instant Mini-Game Hub */}
        <div className="rounded-3xl bg-slate-950 p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <span className="rounded-lg bg-[#793FFF]/20 px-3 py-1 text-xs font-black text-[#793FFF]">
                Instant Browser Challenge
              </span>
              <h2 className="mt-2 text-xl font-bold">Speed Target Clicker</h2>
              <p className="text-xs text-slate-400 mt-1">
                Hit at least 5 targets in 15 seconds to claim instant points (5 points per hit).
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-xs text-slate-400 uppercase font-bold">Timer</span>
                <p className="text-2xl font-black text-rose-400">{timeLeft}s</p>
              </div>
              <div className="text-right border-l border-slate-800 pl-4">
                <span className="text-xs text-slate-400 uppercase font-bold">Score</span>
                <p className="text-2xl font-black text-[#793FFF]">{gameScore}</p>
              </div>
            </div>
          </div>

          {/* Game Arena Canvas */}
          <div className="my-6 relative h-64 sm:h-72 w-full rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden select-none">
            {!isPlayingMiniGame && !gameOver && (
              <div className="text-center space-y-4">
                <p className="text-sm text-slate-300">Click start to test your reaction speed!</p>
                <button
                  onClick={startMiniGame}
                  className="rounded-full bg-[#793FFF] px-8 py-3 text-sm font-bold text-white hover:bg-[#682FF8] transition shadow-lg shadow-[#793FFF]/30 active:scale-95"
                >
                  Start Game Challenge →
                </button>
              </div>
            )}

            {isPlayingMiniGame && (
              <button
                type="button"
                onClick={handleTargetClick}
                style={{
                  top: `${targetPosition.top}%`,
                  left: `${targetPosition.left}%`,
                }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 h-14 w-14 rounded-full bg-gradient-to-tr from-[#793FFF] to-[#06B6D4] text-white flex items-center justify-center font-black text-xl shadow-lg shadow-[#793FFF]/50 active:scale-90 transition-transform"
              >
                🎯
              </button>
            )}

            {gameOver && (
              <div className="text-center space-y-4 p-4">
                <span className="text-3xl">🏁</span>
                <h3 className="text-xl font-bold">Challenge Completed!</h3>
                <p className="text-sm text-slate-300">
                  You scored <strong className="text-white">{gameScore} hits</strong> in 15 seconds!
                </p>
                <div className="flex justify-center gap-3">
                  {gameScore >= 5 ? (
                    claimedReward ? (
                      <span className="rounded-full bg-emerald-900/60 text-emerald-400 border border-emerald-500/30 px-6 py-2.5 text-xs font-bold">
                        ✓ +{gameScore * 5} Points Credited
                      </span>
                    ) : (
                      <button
                        onClick={claimMiniGamePoints}
                        className="rounded-full bg-emerald-500 text-white px-6 py-2.5 text-xs font-bold hover:bg-emerald-600 transition shadow-md"
                      >
                        Claim +{gameScore * 5} Points Now
                      </button>
                    )
                  ) : (
                    <span className="text-xs text-rose-400">Score 5 or more to qualify for points.</span>
                  )}
                  <button
                    onClick={startMiniGame}
                    className="rounded-full bg-slate-800 px-6 py-2.5 text-xs font-bold text-slate-200 hover:bg-slate-700 transition"
                  >
                    Play Again
                  </button>
                </div>
              </div>
            )}
          </div>

          {toast && (
            <div className="rounded-2xl bg-emerald-500/20 border border-emerald-500/40 p-3 text-center text-xs font-bold text-emerald-300">
              🎉 {toast}
            </div>
          )}
        </div>

        {/* Featured Partner Games Catalog */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Featured Partner Games</h2>
            <span className="text-xs text-slate-500">{FEATURED_GAMES.length} Active Quests</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FEATURED_GAMES.map((game) => (
              <div
                key={game.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{game.icon}</span>
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          game.difficulty === 'Easy'
                            ? 'bg-emerald-100 text-emerald-800'
                            : game.difficulty === 'Medium'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {game.difficulty}
                      </span>
                      <span className="rounded-full bg-[#793FFF]/10 border border-[#793FFF]/20 px-3 py-1 text-xs font-black text-[#793FFF]">
                        +{game.rewardPoints} Pts
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">{game.title}</h3>
                  <span className="text-xs font-semibold text-[#793FFF]">{game.genre}</span>

                  <div className="mt-4 rounded-2xl bg-slate-50 p-4 border border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Required Quest Milestone
                    </span>
                    <p className="mt-1 text-xs font-semibold text-slate-800">{game.milestone}</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">Cross-Platform Sync</span>
                  <button
                    onClick={() => alert(`Starting quest for "${game.title}". Complete the milestone to earn +${game.rewardPoints} points!`)}
                    className="rounded-full bg-[#793FFF] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#682FF8] transition shadow-md shadow-[#793FFF]/20 active:scale-95"
                  >
                    Start Game Quest →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
