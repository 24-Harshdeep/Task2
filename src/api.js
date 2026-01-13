import axios from 'axios'

const client = axios.create({
  baseURL: 'https://backendapi-cwp7.onrender.com/api',
  headers: { 'Content-Type': 'application/json' },
})

export const getProducts = async () => {
  const r = await client.get('/products/')
  const data = r.data
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.products)) return data.products
  if (Array.isArray(data?.results)) return data.results
  if (Array.isArray(data?.data)) return data.data
  // attempt to find first array value in object
  if (data && typeof data === 'object') {
    for (const key of Object.keys(data)) {
      if (Array.isArray(data[key])) return data[key]
    }
  }
  return []
}
export const getProductById = (id) => client.get(`/products/${id}/`).then(r => r.data)
export const getCartItems = () => client.get('/cart/').then(r => r.data)
export const addToCart = (payload) => client.post('/cart/', payload).then(r => r.data)
export const updateCartItem = (id, payload) => client.put(`/cart/${id}/`, payload).then(r => r.data)
export const deleteCartItem = (id) => client.delete(`/cart/${id}/`).then(r => r.data)
export const checkout = (order) => client.post('/orders/', order).then(r => r.data)
