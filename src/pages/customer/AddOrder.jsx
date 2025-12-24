import { useState } from 'react'

export default function AddOrder({ setOrders }) {
  const [data, setData] = useState({})

  function save() {
    setOrders(prev => [...prev, data])
  }

  return (
    <div className="card">
      <input placeholder="Yuk turi" onChange={e => data.type = e.target.value} />
      <input placeholder="Og‘irligi (kg)" onChange={e => data.weight = e.target.value} />
      <input placeholder="Qayerdan" onChange={e => data.from = e.target.value} />
      <input placeholder="Qayerga" onChange={e => data.to = e.target.value} />
      <button onClick={save}>Saqlash</button>
    </div>
  )
}
