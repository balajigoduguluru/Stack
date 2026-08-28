"use client";

import { useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function FlashcardModal({ noteId, noteTitle, onClose }: { noteId: string, noteTitle: string, onClose: () => void }) {
  const { data: flashcards = [], isLoading } = useSWR(`http://localhost:8000/notes/${noteId}/flashcards`, fetcher);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setIsFlipped(false);
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setCurrentIndex(prev => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-2xl bg-[#F5F5F7] rounded-[32px] p-8 shadow-apple-lg border border-gray-100 animate-fade-in-up flex flex-col h-[500px]">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-[24px] font-bold text-[#1D1D1F] tracking-tight">{noteTitle}</h2>
            <p className="text-[14px] font-medium text-[#26A69A]">Active Recall Session</p>
          </div>
          <button onClick={onClose} className="text-[#1D1D1F]/40 hover:text-[#1D1D1F] bg-white border border-gray-200 rounded-full w-10 h-10 flex items-center justify-center shadow-apple-sm transition-colors">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="animate-spin w-8 h-8 border-4 border-[#26A69A] border-t-transparent rounded-full"></div>
          </div>
        ) : flashcards.length === 0 ? (
          <div className="flex-1 flex items-center justify-center flex-col text-gray-500">
            <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-4" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
            <p>No flashcards found for this note.</p>
          </div>
        ) : (
          <>
            {/* Flashcard Area */}
            <div className="flex-1 relative perspective-1000">
              <div 
                onClick={() => setIsFlipped(!isFlipped)}
                className={`w-full h-full absolute inset-0 cursor-pointer transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-x-180' : ''}`}
              >
                {/* Front */}
                <div className="absolute inset-0 bg-white rounded-[28px] shadow-md border border-gray-100 flex flex-col items-center justify-center p-10 backface-hidden">
                  <span className="absolute top-6 left-6 text-xs font-bold text-gray-400 tracking-widest uppercase">Question</span>
                  <p className="text-2xl font-medium text-center text-gray-800 leading-snug">{flashcards[currentIndex].front}</p>
                  <p className="absolute bottom-6 text-sm text-gray-400 font-medium">Click to reveal answer</p>
                </div>
                
                {/* Back */}
                <div className="absolute inset-0 bg-[#5C6BC0] text-white rounded-[28px] shadow-lg flex flex-col items-center justify-center p-10 backface-hidden rotate-x-180">
                   <span className="absolute top-6 left-6 text-xs font-bold text-white/60 tracking-widest uppercase">Answer</span>
                  <p className="text-xl font-medium text-center leading-snug">{flashcards[currentIndex].back}</p>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-8 flex items-center justify-between">
              <button 
                onClick={handlePrev} 
                disabled={currentIndex === 0}
                className="w-12 h-12 flex items-center justify-center bg-white border border-gray-200 rounded-2xl text-gray-600 disabled:opacity-50 hover:bg-gray-50 transition-colors shadow-sm"
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
              </button>
              
              <div className="flex items-center gap-2">
                {flashcards.map((_: any, i: number) => (
                  <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === currentIndex ? 'bg-[#26A69A]' : 'bg-gray-300'}`} />
                ))}
              </div>

              <button 
                onClick={handleNext} 
                disabled={currentIndex === flashcards.length - 1}
                className="w-12 h-12 flex items-center justify-center bg-white border border-gray-200 rounded-2xl text-gray-600 disabled:opacity-50 hover:bg-gray-50 transition-colors shadow-sm"
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
