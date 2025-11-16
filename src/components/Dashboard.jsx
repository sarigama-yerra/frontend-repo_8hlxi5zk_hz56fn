import { useEffect, useMemo, useState } from 'react'
import { Plus, Trash2, Edit3, Mail, Upload } from 'lucide-react'

const API = import.meta.env.VITE_BACKEND_URL || ''

function useAuthHeader(){
  return useMemo(()=>({
    Authorization: `Bearer ${localStorage.getItem('token')||''}`,
    'Content-Type':'application/json'
  }),[])
}

export default function Dashboard(){
  const [items,setItems] = useState([])
  const [loading,setLoading] = useState(true)
  const [form, setForm] = useState({merchant_name:'', plan_name:'', amount:'', currency:'USD', billing_frequency:'monthly', next_billing_date:'', category:'', status:'active'})
  const [editingId, setEditingId] = useState(null)
  const [emailModal, setEmailModal] = useState(null)
  const headers = useAuthHeader()

  const fetchData = async ()=>{
    setLoading(true)
    const res = await fetch(API+'/api/subscriptions',{headers})
    const data = await res.json()
    setItems(Array.isArray(data)? data: [])
    setLoading(false)
  }

  useEffect(()=>{fetchData()},[])

  const submit = async (e)=>{
    e.preventDefault()
    const payload = {...form, amount: parseFloat(form.amount||'0')}
    const url = editingId? API+`/api/subscriptions/${editingId}`: API+'/api/subscriptions'
    const method = editingId? 'PUT':'POST'
    const res = await fetch(url,{method, headers, body: JSON.stringify(payload)})
    if(res.ok){
      setForm({merchant_name:'', plan_name:'', amount:'', currency:'USD', billing_frequency:'monthly', next_billing_date:'', category:'', status:'active'})
      setEditingId(null)
      fetchData()
    }
  }

  const del = async (id)=>{
    if(!confirm('Delete subscription?')) return
    const res = await fetch(API+`/api/subscriptions/${id}`,{method:'DELETE', headers})
    if(res.ok) fetchData()
  }

  const edit = (it)=>{
    setEditingId(it.id)
    setForm({...it, amount: it.amount})
  }

  const generateEmail = async (id, type)=>{
    const res = await fetch(API+`/api/actions/generate`,{method:'POST', headers, body: JSON.stringify({subscription_id:id, type})})
    const data = await res.json()
    setEmailModal(data)
  }

  const uploadFile = async (e)=>{
    const file = e.target.files?.[0]
    if(!file) return
    const type = file.type.includes('csv')? 'csv': (file.type.includes('pdf')? 'pdf':'screenshot')
    const formData = new FormData()
    formData.append('file', file)
    formData.append('file_type', type)
    const res = await fetch(API+`/api/uploads`,{method:'POST', headers: {Authorization: headers.Authorization}, body: formData})
    await res.json()
    fetchData()
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Your subscriptions</h2>
        <label className="inline-flex items-center gap-2 px-3 py-2 bg-white border rounded-md cursor-pointer"><Upload size={16}/> Upload CSV/PDF/Screenshot
          <input type="file" className="hidden" onChange={uploadFile}/>
        </label>
      </div>

      <form onSubmit={submit} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 bg-white border rounded-xl p-4 mb-6">
        <input className="border rounded-md px-3 py-2" placeholder="Merchant" value={form.merchant_name} onChange={e=>setForm({...form, merchant_name:e.target.value})}/>
        <input className="border rounded-md px-3 py-2" placeholder="Plan name" value={form.plan_name} onChange={e=>setForm({...form, plan_name:e.target.value})}/>
        <input className="border rounded-md px-3 py-2" placeholder="Amount" value={form.amount} onChange={e=>setForm({...form, amount:e.target.value})}/>
        <select className="border rounded-md px-3 py-2" value={form.currency} onChange={e=>setForm({...form, currency:e.target.value})}>
          {['USD','EUR','GBP','JPY','AUD','CAD','INR'].map(c=> <option key={c}>{c}</option>)}
        </select>
        <select className="border rounded-md px-3 py-2" value={form.billing_frequency} onChange={e=>setForm({...form, billing_frequency:e.target.value})}>
          {['weekly','monthly','quarterly','yearly','one_time'].map(f=> <option key={f}>{f}</option>)}
        </select>
        <input type="date" className="border rounded-md px-3 py-2" value={form.next_billing_date||''} onChange={e=>setForm({...form, next_billing_date:e.target.value})}/>
        <input className="border rounded-md px-3 py-2" placeholder="Category" value={form.category} onChange={e=>setForm({...form, category:e.target.value})}/>
        <select className="border rounded-md px-3 py-2" value={form.status} onChange={e=>setForm({...form, status:e.target.value})}>
          {['active','paused','canceled'].map(s=> <option key={s}>{s}</option>)}
        </select>
        <button className="px-3 py-2 rounded-md bg-gray-900 text-white flex items-center justify-center gap-2"><Plus size={16}/>{editingId? 'Update':'Add'}</button>
      </form>

      <div className="overflow-x-auto bg-white border rounded-xl">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="text-left p-3">Merchant</th>
              <th className="text-left p-3">Plan</th>
              <th className="text-left p-3">Amount</th>
              <th className="text-left p-3">Frequency</th>
              <th className="text-left p-3">Next bill</th>
              <th className="text-left p-3">Category</th>
              <th className="text-left p-3">Status</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading? (
              <tr><td className="p-4" colSpan={8}>Loading...</td></tr>
            ) : items.length===0? (
              <tr><td className="p-4" colSpan={8}>No subscriptions yet.</td></tr>
            ) : (
              items.map(it=> (
                <tr key={it.id} className="border-t">
                  <td className="p-3">{it.merchant_name}</td>
                  <td className="p-3">{it.plan_name||'-'}</td>
                  <td className="p-3">{it.amount} {it.currency}</td>
                  <td className="p-3">{it.billing_frequency}</td>
                  <td className="p-3">{it.next_billing_date||'-'}</td>
                  <td className="p-3">{it.category||'-'}</td>
                  <td className="p-3">{it.status}</td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="px-2 py-1 rounded border" onClick={()=>edit(it)}><Edit3 size={14}/></button>
                      <button className="px-2 py-1 rounded border" onClick={()=>del(it.id)}><Trash2 size={14}/></button>
                      <button className="px-2 py-1 rounded border" onClick={()=>generateEmail(it.id,'cancel')}>Cancel</button>
                      <button className="px-2 py-1 rounded border" onClick={()=>generateEmail(it.id,'negotiate')}>Negotiate</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <TextAnalyzer onAnalyzed={fetchData} headers={headers} />

      {emailModal && (
        <div className="fixed inset-0 bg-black/50 grid place-items-center p-4" onClick={()=>setEmailModal(null)}>
          <div className="bg-white rounded-xl max-w-lg w-full p-6" onClick={e=>e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-2">{emailModal.email_subject}</h3>
            <pre className="whitespace-pre-wrap text-sm text-gray-800 border rounded-md p-3 bg-gray-50 max-h-80 overflow-auto">{emailModal.email_body}</pre>
            <div className="mt-4 flex items-center justify-end gap-2">
              <button className="px-3 py-2 rounded-md" onClick={()=>setEmailModal(null)}>Close</button>
              <button className="px-3 py-2 rounded-md bg-gray-900 text-white" onClick={()=>{navigator.clipboard.writeText(emailModal.email_body)}}>Copy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function TextAnalyzer({onAnalyzed, headers}){
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  const analyze = async ()=>{
    setLoading(true)
    const res = await fetch(API+'/api/analyze/text',{method:'POST', headers, body: JSON.stringify({raw_text: text})})
    await res.json()
    setLoading(false)
    setText('')
    onAnalyzed()
  }

  return (
    <div className="mt-8 bg-white border rounded-xl p-4">
      <h3 className="font-medium mb-2">Paste bill/receipt/email text</h3>
      <textarea value={text} onChange={e=>setText(e.target.value)} rows={5} className="w-full border rounded-md p-2" placeholder="Paste any text…"/>
      <div className="mt-2 flex items-center justify-end">
        <button disabled={loading} onClick={analyze} className="px-3 py-2 rounded-md bg-gray-900 text-white">{loading? 'Analyzing…':'Analyze'}</button>
      </div>
    </div>
  )
}
