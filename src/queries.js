import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as api from './api'

export const useProducts = () =>
  useQuery({ queryKey: ['products'], queryFn: api.getProducts })

export const useProductById = (id) =>
  useQuery({ queryKey: ['product', id], queryFn: () => api.getProductById(id), enabled: !!id })

export const useCart = () =>
  useQuery({ queryKey: ['cart'], queryFn: api.getCartItems })

export const useAddToCart = () => {
  const qc = useQueryClient()
  return useMutation({ mutationFn: api.addToCart, onSuccess: () => qc.invalidateQueries({ queryKey: ['cart'] }) })
}

export const useUpdateCartItem = () => {
  const qc = useQueryClient()
  return useMutation({ mutationFn: ({ id, quantity }) => api.updateCartItem(id, { quantity }), onSuccess: () => qc.invalidateQueries({ queryKey: ['cart'] }) })
}

export const useDeleteCartItem = () => {
  const qc = useQueryClient()
  return useMutation({ mutationFn: (id) => api.deleteCartItem(id), onSuccess: () => qc.invalidateQueries({ queryKey: ['cart'] }) })
}

export const useCheckout = () => {
  const qc = useQueryClient()
  return useMutation({ mutationFn: api.checkout, onSuccess: () => qc.invalidateQueries({ queryKey: ['cart'] }) })
}
