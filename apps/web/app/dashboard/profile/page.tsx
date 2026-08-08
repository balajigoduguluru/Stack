export default function ProfileSettings() {
  return (
    <div className="max-w-4xl space-y-8">
      <div className="animate-fade-in-up [animation-delay:100ms] opacity-0">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Profile Settings</h1>
        <p className="text-gray-500 mt-2">Manage your personal information and preferences.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm divide-y divide-gray-100 animate-fade-in-up [animation-delay:200ms] opacity-0">
        <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Profile Information</h3>
            <p className="text-sm text-gray-500 mt-1">Update your photo and personal details.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xl">
              U
            </div>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg text-sm font-medium transition-colors">
              Change Avatar
            </button>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">First Name</label>
              <input type="text" placeholder="Jane" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Last Name</label>
              <input type="text" placeholder="Doe" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" placeholder="jane@example.com" disabled className="w-full px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed" />
            <p className="text-xs text-gray-500">Your email is managed by your authentication provider.</p>
          </div>
        </div>

        <div className="p-6 md:p-8 bg-gray-50 rounded-b-2xl flex justify-end">
          <button className="px-6 py-2.5 bg-black hover:bg-gray-800 text-white rounded-lg text-sm font-medium transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
