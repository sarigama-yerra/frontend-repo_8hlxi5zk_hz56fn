import Navbar from '../components/Navbar'
import Dashboard from '../components/Dashboard'

export default function DashboardPage(){
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar/>
      <Dashboard/>
    </div>
  )
}
