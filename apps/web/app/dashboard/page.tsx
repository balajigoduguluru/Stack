"use client";

import useSWR from 'swr';
import { useState } from 'react';
import { FlashcardModal } from '../../components/FlashcardModal';

const fetcher = (url: string) => fetch(url).then(res => res.json());
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function DashboardOverview() {
  const [selectedNote, setSelectedNote] = useState<{ id: string, title: string } | null>(null);
  
  const { data: user } = useSWR(`${API_URL}/users/me`, fetcher, {
    fallbackData: { name: 'Student User', email: 'user@university.edu' }
  });
  const { data: tasks = [], mutate: mutateTasks } = useSWR(`${API_URL}/tasks`, fetcher);
  const { data: notes = [] } = useSWR(`${API_URL}/notes`, fetcher);

  const upcomingAssignments = Array.isArray(tasks) && tasks.length > 0 ? tasks : [
    { id: 't-1', title: "Read 2 chapter books", isCompleted: true },
    { id: 't-2', title: "Complete Algorithms Assignment", isCompleted: false },
    { id: 't-3', title: "Physics Lab Report", isCompleted: false },
    { id: 't-4', title: "Psychology Essay Draft", isCompleted: false },
  ];

  const recentNotes = Array.isArray(notes) && notes.length > 0 ? notes : [
    { id: 'n-1', title: "Derivatives & Integrals", summary: "Calculus notes on differential equations" },
    { id: 'n-2', title: "Cognitive Development", summary: "Psychology notes on stages of learning" },
  ];

  const totalNotes = Array.isArray(notes) ? notes.length : 24;
  const totalTasks = Array.isArray(tasks) ? tasks.length : 12;
  const inProgressTasks = Array.isArray(tasks) ? tasks.filter((t: any) => !t.isCompleted).length : 3;
  const completedTasks = Array.isArray(tasks) ? tasks.filter((t: any) => t.isCompleted).length : 9;

  const handleToggleTask = async (id: string | number, currentStatus: boolean) => {
    mutateTasks(
      Array.isArray(tasks)
        ? tasks.map((t: any) => t.id === id ? { ...t, isCompleted: !currentStatus } : t)
        : [],
      false
    );
    
    try {
      await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isCompleted: !currentStatus }),
      });
      mutateTasks();
    } catch (e) {
      console.error("Failed to toggle task", e);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto animate-fade-in-up [animation-delay:100ms] opacity-0 pb-12">
      {/* Header Banner */}
      <div className="mb-8">
        <h1 className="text-[32px] font-bold text-[#1D1D1F] tracking-tight">
          Welcome back, <span className="text-[#5C6BC0]">{user?.name || "Student"}</span> 👋
        </h1>
        <p className="text-[#1D1D1F]/60 text-[15px] font-medium">
          Here is your dynamic study overview & academic progress.
        </p>
      </div>
      
      {/* Top Row: Main Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        
        {/* Card 1: Study Stats */}
        <div className="bg-[#5C6BC0] text-white rounded-[32px] p-7 shadow-lg shadow-[#5C6BC0]/20 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-8">
            <h3 className="text-[17px] font-semibold text-white/90">Study Statistics</h3>
            <span className="text-xs bg-white/20 px-2.5 py-1 rounded-full text-white font-medium">Live</span>
          </div>
          
          <div className="flex items-end gap-6 mb-8">
            <div>
              <p className="text-[52px] font-medium leading-none tracking-tight">{totalNotes}</p>
              <p className="text-[13px] text-white/70 mt-1 max-w-[80px] leading-tight">Total Notes</p>
            </div>
            <div>
              <p className="text-[52px] font-medium leading-none tracking-tight">{inProgressTasks}</p>
              <p className="text-[13px] text-white/70 mt-1 max-w-[80px] leading-tight">Pending Tasks</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/10 rounded-2xl p-4 flex flex-col items-center justify-center gap-2">
              <div className="w-5 h-5 rounded-full border-[3px] border-white/80 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white/80 rounded-full"></div>
              </div>
              <div className="text-center">
                <p className="text-[17px] font-semibold leading-none">{totalTasks}</p>
                <p className="text-[10px] text-white/70 mt-1">Assignments</p>
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl p-4 flex flex-col items-center justify-center gap-2">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white/80" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-center">
                <p className="text-[17px] font-semibold leading-none">{inProgressTasks}</p>
                <p className="text-[10px] text-white/70 mt-1">In Progress</p>
              </div>
            </div>
            <div className="bg-white text-[#5C6BC0] rounded-2xl p-4 flex flex-col items-center justify-center gap-2 shadow-sm">
              <svg width="20" height="20" fill="currentColor" className="text-[#5C6BC0]" viewBox="0 0 24 24">
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1.177-7.86l-2.765-2.764-1.414 1.414 4.179 4.179 5.836-5.836-1.414-1.414-4.422 4.422z"/>
              </svg>
              <div className="text-center">
                <p className="text-[17px] font-semibold leading-none">{completedTasks}</p>
                <p className="text-[10px] text-[#5C6BC0]/80 mt-1">Completed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Weekly Progress */}
        <div className="bg-white rounded-[32px] p-7 shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-[17px] font-semibold text-gray-900">Weekly Goal</h3>
              <div className="flex gap-4 mt-2">
                <span className="text-[13px] font-medium text-gray-600 flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-[#26A69A] rounded-full"></span> Hours</span>
                <span className="text-[13px] font-medium text-gray-400 flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-gray-200 rounded-full"></span> Focus</span>
              </div>
            </div>
            <div className="bg-[#26A69A]/10 text-[#26A69A] text-[10px] font-bold px-2.5 py-1.5 rounded-lg">+24%</div>
          </div>
          
          <div className="flex-1 flex items-center justify-center relative w-full h-[120px]">
            <svg width="100%" height="100%" viewBox="0 0 300 120" preserveAspectRatio="none">
              <path d="M0,100 C40,80 60,110 100,70 C140,30 160,80 200,60 C240,40 260,20 300,40" fill="none" stroke="#E5E5E5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M0,80 C40,90 60,70 100,50 C140,30 160,90 200,40 C240,-10 260,20 300,10" fill="none" stroke="#26A69A" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          
          <div className="flex justify-between items-center text-[11px] font-bold text-gray-500 mt-4 px-2">
            <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span>
            <span className="bg-[#26A69A] text-white w-5 h-5 flex items-center justify-center rounded-full shadow-sm shadow-[#26A69A]/30">S</span>
            <span>S</span>
          </div>
        </div>

        {/* Card 3: GPA Progress */}
        <div className="bg-white rounded-[32px] p-7 shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-[17px] font-semibold text-gray-900">Current GPA</h3>
              <p className="text-[12px] font-semibold text-gray-900 mt-1"><span className="text-[#FF7043] font-bold">+0.02</span> target growth</p>
            </div>
            <button className="text-gray-400 hover:text-[#FF7043] transition-colors">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
            </button>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#FF7043] rounded-full"></span>
                <span className="text-[13px] font-medium text-gray-600">Major</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                <span className="text-[13px] font-medium text-gray-600">Electives</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gray-200 rounded-full"></span>
                <span className="text-[13px] font-medium text-gray-600">Gen Ed</span>
              </div>
            </div>
            
            <div className="relative w-[110px] h-[110px]">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#F3F3F3" strokeWidth="8" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#FF7043" strokeWidth="8" strokeLinecap="round" strokeDasharray="251" strokeDashoffset="40" />
                <circle cx="50" cy="50" r="32" fill="none" stroke="#E5E5E5" strokeWidth="1.5" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-[22px] font-bold text-gray-900 tracking-tight">3.84</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex-1 h-11 rounded-full border border-[#FF7043]/30 text-[#FF7043] bg-[#FF7043]/5 hover:bg-[#FF7043]/10 text-[13px] font-bold flex items-center justify-center gap-2 transition-colors">
              Calculate Academic CGPA
            </button>
          </div>
        </div>

      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        
        {/* Checklist Card */}
        <div className="lg:col-span-4 bg-white rounded-[32px] p-7 shadow-sm border border-gray-100 min-h-[280px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[17px] font-semibold text-gray-900">Task Checklist:</h3>
            <span className="text-[11px] font-bold text-[#26A69A] bg-[#26A69A]/10 rounded-full py-1 px-3">
              {completedTasks}/{totalTasks}
            </span>
          </div>
          
          <div className="space-y-4">
            {upcomingAssignments.slice(0, 4).map((task: any) => (
              <div key={task.id} className="flex items-center gap-3">
                <button 
                  onClick={() => handleToggleTask(task.id, !!task.isCompleted)}
                  className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-colors ${task.isCompleted ? 'bg-[#26A69A] text-white shadow-sm shadow-[#26A69A]/20' : 'border-[2px] border-gray-200 hover:border-[#26A69A]/50'}`}>
                  {task.isCompleted && <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
                </button>
                <span className={`text-[14px] font-medium transition-colors ${task.isCompleted ? 'text-gray-900 line-through decoration-gray-300' : 'text-gray-900'}`}>{task.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Task In Process Grid */}
        <div className="lg:col-span-8 flex flex-col">
          <div className="flex justify-between items-center mb-4 px-1">
            <h3 className="text-[17px] font-semibold text-gray-900">Active Study Notes</h3>
          </div>
          
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {recentNotes.slice(0, 2).map((note: any, idx: number) => {
              const isTeal = idx % 2 === 1;
              return (
                <div key={note.id} className={`bg-white rounded-[28px] p-6 shadow-sm border border-gray-100 flex flex-col justify-between relative group hover:shadow-md transition-all ${isTeal ? 'hover:border-[#26A69A]/20' : 'hover:border-[#5C6BC0]/20'}`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform ${isTeal ? 'bg-[#26A69A]/10 text-[#26A69A]' : 'bg-[#5C6BC0]/10 text-[#5C6BC0]'}`}>
                      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                    </div>
                  </div>
                  <p className="text-[16px] font-semibold text-gray-900 leading-tight mb-2">
                    {note.title}
                  </p>
                  <p className="text-[12px] text-gray-500 line-clamp-2 mb-4">{note.summary || note.content}</p>
                  <div className="flex justify-between items-center mt-2">
                    <button 
                      onClick={() => setSelectedNote({ id: note.id, title: note.title })}
                      className={`w-full h-9 rounded-xl flex items-center justify-center font-bold text-[13px] transition-all shadow-sm ${isTeal ? 'bg-[#26A69A] text-white hover:bg-[#1f877d]' : 'bg-[#5C6BC0] text-white hover:bg-[#4A59A7]'}`}>
                      Study Active Recall →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {selectedNote && (
        <FlashcardModal 
          noteId={selectedNote.id} 
          noteTitle={selectedNote.title} 
          onClose={() => setSelectedNote(null)} 
        />
      )}
    </div>
  );
}
