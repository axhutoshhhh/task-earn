'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface VideoTask {
  id: string;
  title: string;
  channel: string;
  duration: string;
  points: number;
  youtubeId: string;
  category: string;
}

const VIDEOS: VideoTask[] = [
  {
    id: 'vid-1',
    title: 'The Future of AI & Autonomous Software Agents',
    channel: 'TechPulse Media',
    duration: '3:45',
    points: 25,
    youtubeId: 'dQw4w9WgXcQ', // Standard embed-safe test ID
    category: 'Technology',
  },
  {
    id: 'vid-2',
    title: 'Building Modern Web Apps at 60 FPS in 2026',
    channel: 'DevMastery',
    duration: '4:12',
    points: 30,
    youtubeId: 'M576WGiDBdQ',
    category: 'Coding',
  },
  {
    id: 'vid-3',
    title: 'Next-Gen Spatial Computing & VR Breakthroughs',
    channel: 'FutureVision',
    duration: '2:50',
    points: 20,
    youtubeId: 'kJQP7kiw5Fk',
    category: 'Hardware',
  },
  {
    id: 'vid-4',
    title: 'Top Indie Games of the Year & Speedrun Highlights',
    channel: 'GamerSpotlight',
    duration: '5:10',
    points: 35,
    youtubeId: 'fJ9rUzIMcZQ',
    category: 'Gaming',
  },
];

export default function WatchPage() {
  const [selectedVideo, setSelectedVideo] = useState<VideoTask>(VIDEOS[0]);
  const [watchProgress, setWatchProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [claimedVideos, setClaimedVideos] = useState<string[]>([]);
  const [claimMessage, setClaimMessage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Watch timer tracker for engagement
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && watchProgress < 100) {
      interval = setInterval(() => {
        setWatchProgress((prev) => {
          if (prev >= 98) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 2;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, watchProgress]);

  const handleSelectVideo = (video: VideoTask) => {
    setSelectedVideo(video);
    setWatchProgress(0);
    setIsPlaying(false);
    setClaimMessage(null);
  };

  const handleClaimReward = () => {
    if (watchProgress >= 100 && !claimedVideos.includes(selectedVideo.id)) {
      setClaimedVideos((prev) => [...prev, selectedVideo.id]);
      setClaimMessage(`+${selectedVideo.points} Points credited to your wallet!`);
      setTimeout(() => setClaimMessage(null), 4000);
    }
  };

  const categories = ['All', 'Technology', 'Coding', 'Hardware', 'Gaming'];
  const filteredVideos =
    selectedCategory === 'All'
      ? VIDEOS
      : VIDEOS.filter((v) => v.category === selectedCategory);

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-[#793FFF] transition"
          >
            ← Back to Dashboard
          </Link>
          <span className="self-start sm:self-auto rounded-full bg-rose-50 border border-rose-200 px-3.5 py-1 text-xs font-bold text-rose-600 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
            Watch & Earn Live
          </span>
        </div>

        {/* Page Title */}
        <div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-950">
            Watch YouTube Videos to Earn
          </h1>
          <p className="mt-2 text-sm text-slate-600 max-w-2xl">
            Stream curated creator videos, tech insights, and gaming sessions. Keep watching until the progress bar reaches 100% to claim reward points.
          </p>
        </div>

        {/* Main Video Player & Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Player (2 Cols) */}
          <div className="lg:col-span-2 space-y-5">
            <div className="overflow-hidden rounded-3xl bg-slate-950 border border-slate-900 shadow-xl relative aspect-video flex items-center justify-center">
              {isPlaying ? (
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube-nocookie.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="p-8 text-center text-white space-y-4">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#793FFF] text-white shadow-xl shadow-[#793FFF]/40 transition hover:scale-110 cursor-pointer" onClick={() => setIsPlaying(true)}>
                    <svg className="h-8 w-8 ml-1" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{selectedVideo.title}</h3>
                    <p className="text-xs text-slate-400 mt-1">{selectedVideo.channel} • Earn {selectedVideo.points} Points</p>
                  </div>
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="rounded-full bg-white text-slate-950 px-6 py-2.5 text-xs font-bold hover:bg-slate-100 transition shadow-md"
                  >
                    Click to Start Watching
                  </button>
                </div>
              )}
            </div>

            {/* Video Engagement Bar */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold uppercase text-[#793FFF]">{selectedVideo.category}</span>
                  <h2 className="text-lg font-bold text-slate-900">{selectedVideo.title}</h2>
                  <p className="text-xs text-slate-500 mt-0.5">{selectedVideo.channel}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-black text-emerald-800">
                    +{selectedVideo.points} Points
                  </span>
                </div>
              </div>

              {/* Watch Progress Indicator */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-600">Watch Session Completion</span>
                  <span className="text-[#793FFF] font-bold">{watchProgress}%</span>
                </div>
                <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#793FFF] to-[#06B6D4] transition-all duration-300"
                    style={{ width: `${watchProgress}%` }}
                  />
                </div>
              </div>

              {/* Action Claim Button */}
              <div className="flex items-center justify-between pt-2">
                <p className="text-xs text-slate-500">
                  {watchProgress < 100
                    ? `Watch for ${Math.max(0, Math.ceil((100 - watchProgress) / 4))}s more to unlock reward.`
                    : 'Watch session completed!'}
                </p>

                {claimedVideos.includes(selectedVideo.id) ? (
                  <button
                    disabled
                    className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-6 py-2.5 text-xs font-bold text-emerald-800 cursor-default"
                  >
                    <svg className="h-3.5 w-3.5 text-emerald-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    <span>Reward Claimed (+{selectedVideo.points} Pts)</span>
                  </button>
                ) : (
                  <button
                    disabled={watchProgress < 100}
                    onClick={handleClaimReward}
                    className={`rounded-full px-7 py-2.5 text-xs font-bold transition shadow-md ${
                      watchProgress >= 100
                        ? 'bg-[#793FFF] text-white hover:bg-[#682FF8] shadow-[#793FFF]/30 active:scale-95'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    Claim +{selectedVideo.points} Points
                  </button>
                )}
              </div>

              {claimMessage && (
                <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-3.5 text-center text-xs font-bold text-emerald-800 flex items-center justify-center gap-2">
                  <svg className="h-4 w-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  <span>{claimMessage}</span>
                </div>
              )}
            </div>
          </div>

          {/* Video Playlist Column (1 Col) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Featured Video Feed</h3>
              <span className="text-xs text-slate-500">{filteredVideos.length} Available</span>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                    selectedCategory === cat
                      ? 'bg-[#793FFF] text-white'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Playlist Cards */}
            <div className="space-y-3">
              {filteredVideos.map((video) => {
                const isSelected = selectedVideo.id === video.id;
                const isClaimed = claimedVideos.includes(video.id);

                return (
                  <div
                    key={video.id}
                    onClick={() => handleSelectVideo(video)}
                    className={`cursor-pointer rounded-2xl p-4 border transition-all ${
                      isSelected
                        ? 'bg-white border-[#793FFF] shadow-md shadow-[#793FFF]/10 ring-2 ring-[#793FFF]/20'
                        : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#793FFF]">
                        {video.category}
                      </span>
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                        {video.duration}
                      </span>
                    </div>
                    <h4 className="mt-1 text-sm font-bold text-slate-900 line-clamp-2">
                      {video.title}
                    </h4>
                    <p className="mt-1 text-xs text-slate-500">{video.channel}</p>

                    <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                      <span className="font-bold text-emerald-600">+{video.points} Pts</span>
                      {isClaimed ? (
                        <span className="text-emerald-700 font-semibold text-[11px] inline-flex items-center gap-1">
                          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                          Claimed
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[11px]">Ready to Watch</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
