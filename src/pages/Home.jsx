import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useProducts, useAddToCart } from '../queries'
import * as api from '../api'
import { useEffect, useState } from 'react'

export default function Home(){
  const { data, isLoading, isError } = useProducts()
  const add = useAddToCart()
  const navigate = useNavigate()
  // fallback debug fetch in case React Query data is empty
  const [fallback, setFallback] = useState(null)
  useEffect(() => {
    let mounted = true
    async function fetchDebug(){
      try{
        const res = await api.getProducts()
        if(mounted) setFallback(res)
      }catch(e){
        if(mounted) setFallback({ error: e.message })
      }
    }
    if (!Array.isArray(data) || data.length === 0) fetchDebug()
    return () => { mounted = false }
  }, [data])

  if (isLoading) return <div>Loading products...</div>
  if (isError) return <div>Failed to load products.</div>

  // debug raw response shape in browser console
  console.debug('useProducts data:', data)
  const products = Array.isArray(data)
    ? data
    : Array.isArray(data?.products)
    ? data.products
    : Array.isArray(data?.results)
    ? data.results
    : []

  return (
    <div className="container">
      <h1>Products</h1>
      <div className="grid">
        {products.map((p) => (
          <div key={p.id} className="card">
            <Link to={`/product/${p.id}`}>
              <img src={p.image || p.image_url || ''} alt={p.title || p.name || 'product'} />
              <h3>{p.title || p.name}</h3>
            </Link>
            <p>{p.description || p.short_description || ''}</p>
            <div className="card-footer">
              <strong>${p.price}</strong>
              <button onClick={() => add.mutate({ title: p.title, quantity: 1, price: p.price }, { onSuccess: () => navigate('/cart') })}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
      {products.length === 0 && (
        <pre style={{whiteSpace:'pre-wrap',marginTop:12,background:'#fff',padding:12,borderRadius:6}}>
          {JSON.stringify(fallback ?? data ?? 'no-data', null, 2)}
        </pre>
      )}
    </div>
  )
}
