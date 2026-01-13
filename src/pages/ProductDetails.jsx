import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useProductById, useAddToCart } from '../queries'

export default function ProductDetails(){
  const { id } = useParams()
  const { data, isLoading, isError } = useProductById(id)
  const add = useAddToCart()
  const navigate = useNavigate()
  const [qty, setQty] = useState(1)

  if (isLoading) return <div>Loading product...</div>
  if (isError || !data) return <div>Product not found.</div>

  return (
    <div className="container">
      <h1>{data.title}</h1>
      <div className="product-detail">
        <img src={data.image || ''} alt={data.title} />
        <div>
          <p>{data.description}</p>
          <p><strong>${data.price}</strong></p>
          <div className="controls">
            <label>Qty:</label>
            <input type="number" min="1" value={qty} onChange={e => setQty(Math.max(1, Number(e.target.value) || 1))} />
            <button onClick={() => add.mutate({ title: data.title, quantity: qty, price: data.price }, { onSuccess: () => navigate('/cart') })}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}
