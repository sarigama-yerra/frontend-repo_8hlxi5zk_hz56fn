import Navbar from '../components/Navbar'
import Hero from '../components/Hero'

export default function Home(){
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar/>
      <Hero/>
    </div>
  )
}
