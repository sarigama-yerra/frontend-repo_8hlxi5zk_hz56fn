import Navbar from '../components/Navbar'

export default function Privacy(){
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar/>
      <div className="max-w-3xl mx-auto px-4 py-24 space-y-4">
        <h1 className="text-3xl font-bold">Privacy</h1>
        <p>We never ask for bank logins. The app works globally via manual input and uploads. If we add email integration later, it will be optional and read-only. You can delete all your data at any time.</p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>No bank credentials. Ever.</li>
          <li>Manual input and universal uploads: CSV, PDFs, screenshots.</li>
          <li>Your data belongs to you. Delete it anytime.</li>
          <li>We only use AI to assist you — not to profile you.</li>
        </ul>
      </div>
    </div>
  )
}
