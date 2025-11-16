import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Privacy from './pages/Privacy'
import Auth from './pages/Auth'
import DashboardPage from './pages/DashboardPage'

function RequireAuth({children}){
  const token = localStorage.getItem('token')
  const loc = useLocation()
  if(!token){
    return <Navigate to="/login" state={{from: loc}} replace />
  }
  return children
}

export default function App(){
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/privacy" element={<Privacy/>} />
      <Route path="/login" element={<Auth mode="login"/>} />
      <Route path="/register" element={<Auth mode="register"/>} />
      <Route path="/dashboard" element={<RequireAuth><DashboardPage/></RequireAuth>} />
      <Route path="*" element={<Navigate to="/" replace/>} />
    </Routes>
  )
}
