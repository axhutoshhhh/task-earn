'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import DashboardNav from '@/components/DashboardNav';

interface POVBounty {
  id: string;
  title: string;
  description: string;
  duration: string;
  rewardPoints: number;
  category: string;
}

const BOUNTIES: POVBounty[] = [
  {
    id: 'bounty-1',
    title: 'Workspace & Desk Setup POV Walkthrough',
    description: 'Record a first-person 45-60s POV sweep of your desk setup, keyboard, and monitors.',
    duration: '45-60s',
    rewardPoints: 150,
    category: 'Interior / Workspace',
  },
  {
    id: 'bounty-2',
    title: 'Daily Meal Prep & Cooking POV',
    description: 'Capture first-person kitchen perspective chopping ingredients or preparing a quick dish.',
    duration: '60-90s',
    rewardPoints: 200,
    category: 'Culinary / Hands-on',
  },
  {
    id: 'bounty-3',
    title: 'Urban Street Walk / Transit POV',
    description: 'Film a continuous 60s walking perspective down an outdoor street, crosswalk, or path.',
    duration: '60s',
    rewardPoints: 180,
    category: 'Outdoor / Navigation',
  },
  {
    id: 'bounty-4',
    title: 'Grocery Aisles & Product Shelf POV',
    description: 'Capture steady first-person camera pan across retail grocery or department store shelves.',
    duration: '60-90s',
    rewardPoints: 220,
    category: 'Retail / Spatial',
  },
];

export default function POVVideosPage() {
  const [selectedBounty, setSelectedBounty] = useState<POVBounty>(BOUNTIES[0]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBounties, setSubmittedBounties] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleUploadSubmit = () => {
    if (!uploadedFile) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedBounties((prev) => [...prev, selectedBounty.id]);
      setToastMessage(
        `Video submitted successfully! +${selectedBounty.rewardPoints} Points credited upon spatial AI verification.`
      );
      setUploadedFile(null);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#f7f4fd]">
      <DashboardNav />
      <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-8">
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-[#793FFF] transition"
          >
            ← Back to Dashboard
          </Link>
          <span className="self-start sm:self-auto rounded-full bg-[#793FFF]/10 border border-[#793FFF]/20 px-3.5 py-1 text-xs font-bold text-[#793FFF] flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#793FFF] animate-pulse" />
            Spatial AI Bounties Active
          </span>
        </div>

        {/* Title */}
        <div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-950">
            Get Paid for POV Videos
          </h1>
          <p className="mt-2 text-sm text-slate-600 max-w-2xl">
            Upload short, genuine first-person perspective clips to help train next-gen computer vision and spatial AI models. Earn premium point bounties for approved submissions.
          </p>
        </div>

        {/* Submission Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Uploader & Guidelines (2 Cols) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#793FFF]">
                    Active Bounty Target
                  </span>
                  <h2 className="text-lg font-bold text-slate-900">{selectedBounty.title}</h2>
                  <p className="text-xs text-slate-500">{selectedBounty.category} • Required Length: {selectedBounty.duration}</p>
                </div>
                <span className="rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-black text-emerald-800 self-start sm:self-auto">
                  +{selectedBounty.rewardPoints} Points
                </span>
              </div>

              {/* Upload Dropzone */}
              <div className="rounded-2xl border-2 border-dashed border-[#793FFF]/30 bg-[#793FFF]/5 p-8 text-center transition hover:border-[#793FFF]">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#793FFF]/10 text-[#793FFF]">
                  <svg className="h-7 w-7 text-[#793FFF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M23 7l-7 5 7 5V7z" />
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                  </svg>
                </div>
                <h3 className="mt-3 text-sm font-bold text-slate-900">
                  {uploadedFile ? uploadedFile.name : 'Upload Your POV Video File'}
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  MP4, MOV, or WEBM up to 250MB • Minimum 1080p 30fps
                </p>

                <div className="mt-5">
                  <label className="cursor-pointer inline-flex items-center gap-2 rounded-full bg-[#793FFF] px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-[#793FFF]/25 hover:bg-[#682FF8] transition">
                    <span>{uploadedFile ? 'Change Video' : 'Browse Video File'}</span>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Quality Standards & Guidelines */}
              <div className="rounded-2xl bg-slate-50 p-5 border border-slate-200/80 space-y-2 text-xs text-slate-700">
                <span className="font-bold text-slate-900 block">POV Dataset Guidelines:</span>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li>Natural first-person viewpoint (chest mount, sunglasses, or steady hand-held).</li>
                  <li>Good lighting with steady, fluid motion (avoid aggressive jerky shaking).</li>
                  <li>Do NOT record private documents, credit cards, or passwords.</li>
                </ul>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-500">
                  {uploadedFile ? 'File verified and ready for upload' : 'Select a video clip to submit'}
                </span>

                <button
                  disabled={!uploadedFile || isSubmitting}
                  onClick={handleUploadSubmit}
                  className={`rounded-full px-8 py-3 text-xs sm:text-sm font-bold transition shadow-md ${
                    uploadedFile && !isSubmitting
                      ? 'bg-[#793FFF] text-white hover:bg-[#682FF8] shadow-[#793FFF]/25 active:scale-95'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? 'Uploading to Spatial AI...' : `Submit & Claim +${selectedBounty.rewardPoints} Pts`}
                </button>
              </div>

              {toastMessage && (
                <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-center text-xs font-bold text-emerald-800 flex items-center justify-center gap-2">
                  <svg className="h-4 w-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  <span>{toastMessage}</span>
                </div>
              )}
            </div>
          </div>

          {/* Available Bounties List (1 Col) */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">Current POV Bounties</h3>

            <div className="space-y-3">
              {BOUNTIES.map((bounty) => {
                const isSelected = selectedBounty.id === bounty.id;
                const isSubmitted = submittedBounties.includes(bounty.id);

                return (
                  <div
                    key={bounty.id}
                    onClick={() => {
                      setSelectedBounty(bounty);
                      setToastMessage(null);
                    }}
                    className={`cursor-pointer rounded-2xl p-5 border transition-all ${
                      isSelected
                        ? 'bg-white border-[#793FFF] ring-2 ring-[#793FFF]/20 shadow-md'
                        : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#793FFF]">
                        {bounty.category}
                      </span>
                      <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-black text-emerald-800">
                        +{bounty.rewardPoints} Pts
                      </span>
                    </div>

                    <h4 className="mt-2 text-sm font-bold text-slate-900">{bounty.title}</h4>
                    <p className="mt-1 text-xs text-slate-600 line-clamp-2">{bounty.description}</p>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-500">Duration: {bounty.duration}</span>
                      {isSubmitted ? (
                        <span className="text-emerald-600 font-bold inline-flex items-center gap-1">
                          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                          Submitted
                        </span>
                      ) : (
                        <span className="text-[#793FFF] font-semibold">Select Bounty →</span>
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
  </div>
  );
}
