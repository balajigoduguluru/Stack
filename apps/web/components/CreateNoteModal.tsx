"use client";

import { useState } from "react";
import { useSWRConfig } from "swr";

export function CreateNoteModal({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate } = useSWRConfig();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;
    setIsSubmitting(true);
    
    try {
      await fetch("http://localhost:8000/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      // Mutate global notes cache
      mutate("http://localhost:8000/notes");
      onClose();
    } catch (e) {
      console.error(e);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-lg rounded-[32px] p-8 shadow-apple-lg animate-fade-in-up border border-gray-100">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-[24px] font-bold text-[#1D1D1F] tracking-tight">Create Note</h2>
            <p className="text-[14px] text-[#1D1D1F]/60 mt-1">Our AI will automatically generate a summary and active-recall flashcards from your note.</p>
          </div>
          <button onClick={onClose} className="text-[#1D1D1F]/40 hover:text-[#1D1D1F] transition-colors bg-[#F5F5F7] hover:bg-gray-200 rounded-full p-2">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[14px] font-semibold text-[#1D1D1F] mb-1.5">Note Title</label>
            <input 
              type="text" 
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Psychology Chapter 4"
              className="w-full px-4 py-3 rounded-xl bg-[#F5F5F7] border border-transparent focus:bg-white focus:border-[#5C6BC0] focus:ring-2 focus:ring-[#5C6BC0]/20 transition-all text-[15px] outline-none text-[#1D1D1F]"
              required
            />
          </div>
          <div>
            <label className="block text-[14px] font-semibold text-[#1D1D1F] mb-1.5">Note Content</label>
            <textarea 
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Paste your study material here..."
              rows={6}
              className="w-full px-4 py-3 rounded-xl bg-[#F5F5F7] border border-transparent focus:bg-white focus:border-[#5C6BC0] focus:ring-2 focus:ring-[#5C6BC0]/20 transition-all text-[15px] outline-none text-[#1D1D1F] resize-none"
              required
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-[#1D1D1F] text-white py-3.5 rounded-xl font-medium text-[15px] hover:bg-black transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-apple-sm"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing Note...
              </>
            ) : (
              "Save Note & Generate Flashcards"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
