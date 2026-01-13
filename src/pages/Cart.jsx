import React from 'react'
import { useCart, useUpdateCartItem, useDeleteCartItem, useCheckout } from '../queries'

export default function Cart(){
  const { data, isLoading } = useCart()
  const update = useUpdateCartItem()
  const remove = useDeleteCartItem()
  const checkout = useCheckout()

  if (isLoading) return <div>Loading cart...</div>

  const items = data || []

  if (items.length === 0) return <div className="container"><h2>Your cart is empty</h2></div>

  const subtotal = items.reduce((s, it) => s + (it.price * it.quantity), 0)
  const tax = +(subtotal * 0.1).toFixed(2)
  const total = +(subtotal + tax).toFixed(2)

  return (
    <div className="container">
      <h1>Your Cart</h1>
      <div className="cart-list">
        {items.map(item => (
          <div key={item.id} className="cart-item">
            <div className="cart-main">
              <div>{item.title}</div>
              <div>${item.price}</div>
            </div>
            <div className="cart-controls">
              <button onClick={() => update.mutate({ id: item.id, quantity: item.quantity - 1 })} disabled={item.quantity <= 1}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => update.mutate({ id: item.id, quantity: item.quantity + 1 })}>+</button>
              <button onClick={() => remove.mutate(item.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      <aside className="summary">
        <h3>Order Summary</h3>
        <div>Subtotal: ${subtotal.toFixed(2)}</div>
        <div>Tax (10%): ${tax.toFixed(2)}</div>
        <div><strong>Total: ${total.toFixed(2)}</strong></div>
        <button onClick={() => checkout.mutate({ items })}>Checkout</button>
      </aside>
    </div>
  )
}
