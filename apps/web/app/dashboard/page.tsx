import Link from "next/link";

export default function DashboardOverview() {
  // Mock Dynamic Data
  const today = new Date();
  const dateString = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  
  const upcomingAssignments = [
    { id: 1, title: "Calculus III Midterm", course: "MATH 231", dueDate: "Tomorrow, 10:00 AM", type: "Exam" },
    { id: 2, title: "Psychology Essay", course: "PSYC 101", dueDate: "In 3 days", type: "Paper" },
    { id: 3, title: "Physics Lab Report", course: "PHYS 202", dueDate: "Next week", type: "Homework" },
  ];

  const recentNotes = [
    { id: 1, title: "Derivatives & Integrals", course: "MATH 231", time: "2 hours ago" },
    { id: 2, title: "Cognitive Development", course: "PSYC 101", time: "Yesterday" },
  ];

  return (
    <div className="space-y-6 animate-fade-in-up [animation-delay:100ms] opacity-0 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Overview</h1>
          <p className="text-gray-500 font-medium mt-1">{dateString}</p>
        </div>
        <button className="bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm active:scale-95 duration-200">
          + New Note
        </button>
      </div>
      
      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Main Stats - Span 8 cols */}
        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Study Hours Card */}
          <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 col-span-1 sm:col-span-2 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors"></div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-1">Weekly Goal</h3>
              <div className="flex items-end gap-3 mb-6">
                <span className="text-4xl font-bold text-gray-900 tracking-tight">12.5<span className="text-lg text-gray-400 font-medium ml-1">/ 20 hrs</span></span>
              </div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 mb-2 overflow-hidden">
              <div className="bg-black h-3 rounded-full transition-all duration-1000 ease-out" style={{ width: '62%' }}></div>
            </div>
            <p className="text-xs text-gray-500 font-medium text-right">62% Completed</p>
          </div>

          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-[24px] shadow-sm text-white flex flex-col justify-between">
            <h3 className="text-sm font-medium text-white/80 mb-2">Current GPA</h3>
            <p className="text-4xl font-bold tracking-tight">3.84</p>
            <p className="text-xs text-white/70 mt-4">+0.02 from last semester</p>
          </div>

          <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm flex flex-col justify-between">
            <h3 className="text-sm font-semibold text-gray-500 mb-2">Total Notes</h3>
            <p className="text-4xl font-bold text-gray-900 tracking-tight">24</p>
            <Link href="#" className="text-xs text-blue-600 font-medium hover:underline mt-4 inline-block">View all notes &rarr;</Link>
          </div>
        </div>

        {/* Side Panel - Span 4 cols */}
        <div className="md:col-span-4 space-y-6">
          {/* Upcoming Assignments */}
          <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm h-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900 tracking-tight">Upcoming</h3>
              <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-md">{upcomingAssignments.length}</span>
            </div>
            
            <div className="space-y-4">
              {upcomingAssignments.map((assignment) => (
                <div key={assignment.id} className="group p-3 -mx-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">{assignment.title}</p>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500 font-medium">{assignment.course}</span>
                    <span className={`font-medium ${assignment.dueDate.includes('Tomorrow') ? 'text-orange-500' : 'text-gray-400'}`}>
                      {assignment.dueDate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 py-2 border-2 border-dashed border-gray-200 rounded-xl text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 transition-colors">
              + Add Assignment
            </button>
          </div>
        </div>
      </div>
      
      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 tracking-tight mb-6">Recent Notes</h2>
          <div className="space-y-3">
            {recentNotes.map((note) => (
              <div key={note.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:border-gray-300 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 group-hover:text-blue-500" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{note.title}</p>
                    <p className="text-xs text-gray-500 font-medium">{note.course}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400 font-medium">{note.time}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-gray-900 rounded-[24px] shadow-sm p-6 text-white relative overflow-hidden flex flex-col justify-center items-start">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-500/20 blur-3xl rounded-full pointer-events-none"></div>
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-blue-500/20 blur-3xl rounded-full pointer-events-none"></div>
          <h2 className="text-2xl font-bold tracking-tight mb-2 relative z-10">Upload Syllabus</h2>
          <p className="text-gray-400 font-medium text-sm mb-6 max-w-sm relative z-10">Drop your PDF syllabus here. Our AI will automatically extract all your deadlines and populate your calendar.</p>
          <button className="bg-white text-gray-900 px-6 py-2.5 rounded-full text-sm font-bold shadow-sm hover:bg-gray-100 transition-colors relative z-10">
            Browse Files
          </button>
        </div>
      </div>
    </div>
  );
}
