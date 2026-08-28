"use client";
import useSWR from 'swr';
import { useState } from 'react';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function ProfilePage() {
  const { data: user, mutate, isLoading } = useSWR('http://localhost:8000/users/me', fetcher);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    
    try {
      await fetch('http://localhost:8000/users/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
      mutate();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto pb-12 animate-fade-in-up">
         <div className="h-[200px] flex items-center justify-center">
            <div className="animate-spin w-8 h-8 border-4 border-[#26A69A] border-t-transparent rounded-full"></div>
         </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto pb-12 animate-fade-in-up">
      <header className="mb-10">
        <h1 className="text-[32px] font-bold text-[#1D1D1F] tracking-tight mb-2">Profile Settings</h1>
        <p className="text-[#1D1D1F]/60 font-medium text-[16px]">Manage your personal information and preferences.</p>
      </header>

      {/* Account Settings */}
      <section className="mb-12">
        <h3 className="text-[20px] font-bold text-[#1D1D1F] tracking-tight mb-6">Account Details</h3>
        <div className="bg-white rounded-3xl p-8 shadow-apple-sm border border-gray-100">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-[14px] font-semibold text-[#1D1D1F]">Full Name</label>
              <input 
                type="text" 
                id="name" 
                name="name"
                defaultValue={user?.name || ""}
                className="w-full px-4 py-3 rounded-xl bg-[#F5F5F7] border border-transparent focus:bg-white focus:border-[#5C6BC0] focus:ring-2 focus:ring-[#5C6BC0]/20 transition-all text-[#1D1D1F] text-[15px] outline-none"
                placeholder="Student Name"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-[14px] font-semibold text-[#1D1D1F]">Email Address</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                defaultValue={user?.email || ""}
                className="w-full px-4 py-3 rounded-xl bg-[#F5F5F7] border border-transparent focus:bg-white focus:border-[#5C6BC0] focus:ring-2 focus:ring-[#5C6BC0]/20 transition-all text-[#1D1D1F] text-[15px] outline-none"
                placeholder="student@university.edu"
              />
            </div>

            <div className="pt-2">
              <button disabled={isSaving} type="submit" className="bg-[#1D1D1F] hover:bg-black text-white px-6 py-3 rounded-xl font-medium text-[15px] transition-colors shadow-apple-sm disabled:opacity-50 flex items-center gap-2">
                {isSaving ? (
                  <><div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div> Saving...</>
                ) : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Preferences */}
      <section className="mb-12">
        <h3 className="text-[20px] font-bold text-[#1D1D1F] tracking-tight mb-6">Preferences</h3>
        <div className="bg-white rounded-3xl p-8 shadow-apple-sm border border-gray-100 flex flex-col gap-6">
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-[15px] font-semibold text-[#1D1D1F] mb-1">Study Reminders</h4>
              <p className="text-[14px] text-[#1D1D1F]/60">Receive email reminders for upcoming review sessions.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#26A69A]"></div>
            </label>
          </div>
          
          <hr className="border-gray-100" />

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-[15px] font-semibold text-[#1D1D1F] mb-1">Weekly Analytics</h4>
              <p className="text-[14px] text-[#1D1D1F]/60">Receive a weekly summary of your study hours.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#26A69A]"></div>
            </label>
          </div>

        </div>
      </section>

      {/* Danger Zone */}
      <section>
        <h3 className="text-[20px] font-bold text-[#1D1D1F] tracking-tight mb-6">Danger Zone</h3>
        <div className="bg-[#FFF5F5] rounded-3xl p-8 border border-[#FFE5E5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h4 className="text-[15px] font-semibold text-[#D32F2F] mb-1">Delete Account</h4>
            <p className="text-[14px] text-[#D32F2F]/80">Permanently delete your account and all study data.</p>
          </div>
          <button className="bg-white hover:bg-[#D32F2F] text-[#D32F2F] hover:text-white border border-[#D32F2F]/20 px-6 py-3 rounded-xl font-medium text-[15px] transition-colors whitespace-nowrap shadow-apple-sm">
            Delete Account
          </button>
        </div>
      </section>

    </div>
  );
}
