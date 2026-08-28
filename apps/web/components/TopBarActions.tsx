"use client";

import { useState } from "react";
import { CreateNoteModal } from "./CreateNoteModal";

export function TopBarActions({ initialEmail }: { initialEmail: string }) {
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setIsNoteModalOpen(true)}
          className="bg-[#1A1A1A] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-black transition-colors flex items-center gap-2"
        >
          <span>+ Create</span>
        </button>
        <button className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm">
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        </button>
        <button className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm relative">
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-black rounded-full border border-white"></span>
        </button>
        <div className="w-10 h-10 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center font-bold text-sm ml-2">
          {initialEmail}
        </div>
      </div>

      {isNoteModalOpen && (
        <CreateNoteModal onClose={() => setIsNoteModalOpen(false)} />
      )}
    </>
  );
}
