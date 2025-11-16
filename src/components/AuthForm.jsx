import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function AuthForm({mode='login'}){
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [name,setName] = useState('')
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState('')
  const navigate = useNavigate()

  const onSubmit = async (e)=>{
    e.preventDefault()
    setLoading(true)
    setError('')
    try{
      const url = mode==='login'? '/api/auth/login':'/api/auth/register'
      const body = mode==='login'? {email,password}:{email,password,name}
      const res = await fetch(API+url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})
      const data = await res.json()
      if(!res.ok) throw new Error(data.detail||'Error')
      localStorage.setItem('token', data.token)
      navigate('/dashboard')
    }catch(err){
      setError(err.message)
    }finally{setLoading(false)}
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 max-w-sm mx-auto">
      {mode==='register' && (
        <div>
          <label className="block text-sm text-gray-700">Name</label>
          <input value={name} onChange={e=>setName(e.target.value)} className="w-full mt-1 rounded-md border px-3 py-2" placeholder="Jane Doe"/>
        </div>
      )}
      <div>
        <label className="block text-sm text-gray-700">Email</label>
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full mt-1 rounded-md border px-3 py-2" placeholder="you@example.com"/>
      </div>
      <div>
        <label className="block text-sm text-gray-700">Password</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full mt-1 rounded-md border px-3 py-2" placeholder="••••••••"/>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button disabled={loading} className="w-full rounded-md bg-gray-900 text-white py-2">{loading? 'Please wait...': (mode==='login'? 'Log in':'Create account')}</button>
    </form>
  )
}
