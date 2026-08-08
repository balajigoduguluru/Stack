import Link from "next/link";

const Logo = () => (
  <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="55" width="35" height="35" rx="12" fill="#FF8A65" />
    <rect x="32" y="32" width="36" height="36" rx="12" fill="#26A69A" />
    <rect x="55" y="10" width="35" height="35" rx="12" fill="#5C6BC0" />
  </svg>
);

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <header className="w-full bg-white border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-[1920px] mx-auto px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Logo />
            <span className="text-2xl font-bold text-gray-900 tracking-tighter">Stack.</span>
            <span className="text-lg font-medium text-gray-400 ml-2 border-l border-gray-200 pl-4">Docs</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="bg-black hover:bg-gray-800 text-white px-5 py-2 rounded-full text-[13px] font-medium transition-transform active:scale-95 duration-200">
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-[1920px] mx-auto px-8 py-12 flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0 md:sticky md:top-24 h-max">
          <nav className="space-y-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 tracking-tight">Getting Started</h4>
              <ul className="space-y-2 text-sm text-gray-500 font-medium">
                <li><Link href="#introduction" className="hover:text-blue-600 transition-colors">Introduction</Link></li>
                <li><Link href="#quickstart" className="hover:text-blue-600 transition-colors">Quickstart</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 tracking-tight">Features</h4>
              <ul className="space-y-2 text-sm text-gray-500 font-medium">
                <li><Link href="#smart-notes" className="hover:text-blue-600 transition-colors">Smart Notes</Link></li>
                <li><Link href="#schedule" className="hover:text-blue-600 transition-colors">Schedule</Link></li>
                <li><Link href="#analytics" className="hover:text-blue-600 transition-colors">Analytics</Link></li>
                <li><Link href="#ai-pdf" className="hover:text-blue-600 transition-colors">AI PDF Reader</Link></li>
                <li><Link href="#pomodoro" className="hover:text-blue-600 transition-colors">Pomodoro Timer</Link></li>
                <li><Link href="#gpa" className="hover:text-blue-600 transition-colors">GPA Calculator</Link></li>
              </ul>
            </div>
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 max-w-4xl prose prose-gray">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4" id="introduction">Documentation</h1>
          <p className="text-xl text-gray-500 font-medium mb-12">Learn how to use every feature in Stack without any mistakes.</p>

          <hr className="border-gray-100 my-12" />

          <section id="smart-notes" className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Smart Notes</h2>
            <p className="text-gray-600 mb-4">Smart Notes allows you to take distraction-free notes with automatic AI summaries.</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <li><strong>How to use:</strong> Navigate to the Notes tab in your dashboard and click "New Note".</li>
              <li><strong>AI Summary:</strong> After typing more than 200 words, click the sparkle icon to instantly generate a bulleted summary.</li>
              <li><strong>Mistake to avoid:</strong> Do not close the window while the "Saving..." indicator is spinning, or you may lose your last few keystrokes.</li>
            </ul>
          </section>

          <section id="schedule" className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Schedule</h2>
            <p className="text-gray-600 mb-4">The visual calendar keeps all your classes and deadlines in one place.</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <li><strong>How to use:</strong> Click on any empty slot in the calendar to add a new class block or deadline.</li>
              <li><strong>Syllabus Import:</strong> You can drag and drop your course syllabus PDF into the schedule to auto-populate deadlines.</li>
            </ul>
          </section>

          <section id="analytics" className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Analytics</h2>
            <p className="text-gray-600 mb-4">Track your performance over time with beautiful visual charts.</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <li><strong>How to use:</strong> Go to the Analytics tab. It automatically aggregates data from your Pomodoro timer and grades.</li>
              <li><strong>Mistake to avoid:</strong> Ensure your Pomodoro sessions are categorized by Subject, otherwise the Analytics pie chart will show them as "Uncategorized".</li>
            </ul>
          </section>

          <section id="ai-pdf" className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. AI PDF Reader</h2>
            <p className="text-gray-600 mb-4">Upload lectures and let the AI generate flashcards and quizzes.</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <li><strong>How to use:</strong> Drag a PDF (up to 50MB) into the PDF Reader zone.</li>
              <li><strong>Generate Quiz:</strong> Click the "Test Me" button after processing to generate a 10-question multiple-choice quiz based on the document's contents.</li>
            </ul>
          </section>

          <section id="pomodoro" className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Pomodoro Timer</h2>
            <p className="text-gray-600 mb-4">Stay focused with built-in study sessions and white noise.</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <li><strong>How to use:</strong> Select a task, set your focus duration (default 25m), and click Start.</li>
              <li><strong>White Noise:</strong> Click the headphone icon to toggle rain, cafe, or lo-fi beats during your session.</li>
            </ul>
          </section>

          <section id="gpa" className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. GPA Calculator</h2>
            <p className="text-gray-600 mb-4">Project your semester grades accurately.</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <li><strong>How to use:</strong> Input your current courses, their credit hours, and your current grade.</li>
              <li><strong>Final Exam Target:</strong> Click "What do I need?" and input your syllabus weights to find out exactly what score you need on the final to maintain an A.</li>
            </ul>
          </section>

        </main>
      </div>
    </div>
  );
}
