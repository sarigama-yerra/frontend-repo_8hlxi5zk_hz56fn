import { Link, useNavigate } from 'react-router-dom'
import { Menu, ShieldCheck, User, LogOut } from 'lucide-react'

export default function Navbar() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }
  return (
    <header className="fixed top-0 left-0 right-0 z-20 border-b border-white/20 backdrop-blur bg-white/50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="font-bold text-gray-900">Autopilot</Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link to="/privacy" className="text-gray-600 hover:text-gray-900 flex items-center gap-1"><ShieldCheck size={16}/> Privacy</Link>
          {token ? (
            <>
              <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link>
              <button onClick={logout} className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-900"><LogOut size={16}/> Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-gray-900">Log in</Link>
              <Link to="/register" className="px-3 py-1.5 rounded-md bg-gray-900 text-white">Sign up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
