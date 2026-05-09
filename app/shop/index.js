const express = require('express')
const router = express.Router()

const PRODUCTS = [
  { id: '1', name: 'Maillot France 2026', price: 89.99, category: 'Maillot', stock: 150, badge: 'Bestseller' },
  { id: '2', name: 'Maillot Maroc 2026', price: 84.99, category: 'Maillot', stock: 200, badge: 'Nouveau' },
  { id: '3', name: 'Ballon FIFA 2026', price: 149.99, category: 'Ballon', stock: 80, badge: 'Officiel' },
  { id: '4', name: 'Casquette USA 2026', price: 34.99, category: 'Accessoire', stock: 300, badge: null },
]

let orders = []

router.get('/', (req, res) => {
  const { category } = req.query
  let result = [...PRODUCTS]
  if (category) result = result.filter(p => p.category === category)
  res.json({ success: true, products: result })
})

router.post('/cart', (req, res) => {
  const { productId, quantity, userId } = req.body
  const product = PRODUCTS.find(p => p.id === productId)
  if (!product) return res.status(404).json({ message: 'Produit non trouve' })
  const item = { id: 'ORDER-' + Date.now(), product, quantity, userId, total: product.price * quantity }
  orders.push(item)
  res.json({ success: true, order: item })
})

module.exports = router