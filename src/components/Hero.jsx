import Spline from '@splinetool/react-spline'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Hero(){
  return (
    <section className="relative min-h-[80vh] flex items-center">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-24">
        <div className="max-w-xl bg-white/70 backdrop-blur rounded-2xl p-8 shadow-xl">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">AI Personal Finance Autopilot</h1>
          <p className="mt-4 text-gray-700">See every subscription and bill. Cancel or negotiate with one click. No bank login required — works globally via manual input and uploads.</p>
          <div className="mt-6 flex items-center gap-3">
            <Link to="/register" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-black transition">
              Get started <ArrowRight size={16}/>
            </Link>
            <Link to="/privacy" className="text-gray-800 hover:underline">Privacy</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
