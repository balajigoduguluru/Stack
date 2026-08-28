"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button, Card, Badge } from "@stack/ui";

const sampleCards = [
  {
    front: "What is the time complexity of Binary Search on a sorted array?",
    back: "O(log n) because the search space is halved at each step.",
  },
  {
    front: "Define ACID properties in Database Management Systems.",
    back: "Atomicity, Consistency, Isolation, and Durability.",
  },
  {
    front: "What is the difference between BFS and DFS in graph traversal?",
    back: "BFS uses a Queue and explores level-by-level. DFS uses a Stack (or recursion) and explores deep down a path first.",
  },
  {
    front: "Explain the concept of an Eigenvector.",
    back: "A non-zero vector whose direction does not change when a linear transformation is applied to it.",
  },
];

export default function FlashcardPlayerPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [score, setScore] = useState({ correct: 0, review: 0 });

  const currentCard = sampleCards[currentIndex];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = (known: boolean) => {
    setIsFlipped(false);
    if (known) {
      setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      setScore((prev) => ({ ...prev, review: prev.review + 1 }));
    }

    if (currentIndex < sampleCards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const resetDeck = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setScore({ correct: 0, review: 0 });
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <div className="w-full flex items-center justify-between mb-8">
          <Link href="/flashcards" className="text-[14px] font-medium text-[#5C6BC0] hover:underline">
            ← Back to Decks
          </Link>
          <Badge variant="primary">
            Card {currentIndex + 1} of {sampleCards.length}
          </Badge>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-2 rounded-full mb-8 overflow-hidden">
          <div
            className="bg-[#5C6BC0] h-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / sampleCards.length) * 100}%` }}
          />
        </div>

        {/* 3D Interactive Card Container */}
        <div
          onClick={handleFlip}
          className="w-full aspect-[7/4] max-w-xl cursor-pointer perspective-1000 group mb-8"
        >
          <div
            className={`relative w-full h-full rounded-[36px] shadow-apple-lg border border-gray-100 transition-transform duration-500 transform-style-3d ${
              isFlipped ? "rotate-x-180 bg-white" : "bg-white"
            }`}
          >
            {/* Front Side */}
            <div className="absolute inset-0 backface-hidden p-10 flex flex-col justify-between items-center text-center">
              <span className="text-[12px] font-bold text-[#5C6BC0] tracking-widest uppercase">QUESTION</span>
              <p className="text-[22px] md:text-[26px] font-bold text-[#1D1D1F] tracking-tight leading-snug">
                {currentCard.front}
              </p>
              <span className="text-[13px] font-medium text-[#1D1D1F]/40">Click or tap to flip card ⚡</span>
            </div>

            {/* Back Side */}
            <div className="absolute inset-0 backface-hidden rotate-x-180 p-10 flex flex-col justify-between items-center text-center bg-[#5C6BC0]/5 rounded-[36px]">
              <span className="text-[12px] font-bold text-[#26A69A] tracking-widest uppercase">ANSWER</span>
              <p className="text-[20px] md:text-[24px] font-semibold text-[#1D1D1F] tracking-tight leading-relaxed">
                {currentCard.back}
              </p>
              <span className="text-[13px] font-medium text-[#1D1D1F]/40">Rate your recall below ↓</span>
            </div>
          </div>
        </div>

        {/* Review Controls */}
        <div className="flex gap-4">
          <Button
            variant="secondary"
            onClick={() => handleNext(false)}
            className="border-red-200 text-[#FF7043]"
          >
            Need Review ❌
          </Button>
          <Button variant="primary" onClick={() => handleNext(true)}>
            Got It Right ✓
          </Button>
          <Button variant="outline" onClick={resetDeck}>
            Reset Deck 🔄
          </Button>
        </div>

        {/* Score Summary */}
        <div className="mt-8 flex gap-6 text-[14px] font-semibold text-[#1D1D1F]/60">
          <span>Mastered: <strong className="text-[#26A69A]">{score.correct}</strong></span>
          <span>Needs Review: <strong className="text-[#FF7043]">{score.review}</strong></span>
        </div>
      </div>
    </div>
  );
}
