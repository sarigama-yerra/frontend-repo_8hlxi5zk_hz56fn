import Navbar from '../components/Navbar'
import AuthForm from '../components/AuthForm'

export default function Auth({mode}){
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar/>
      <div className="max-w-6xl mx-auto px-4 py-24">
        <h2 className="text-2xl font-semibold mb-6">{mode==='login'?'Log in':'Create your account'}</h2>
        <AuthForm mode={mode}/>
      </div>
    </div>
  )
}
