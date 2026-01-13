import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../queries'

export default function Navigation(){
  const { data } = useCart()
  const count = Array.isArray(data) ? data.reduce((s, i) => s + (i.quantity || 0), 0) : 0

  return (
    <nav className="nav">
      <div className="brand"><Link to="/">ShopHub</Link></div>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart ({count})</Link>
      </div>
    </nav>
  )
}
