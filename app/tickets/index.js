const express = require('express')
const router = express.Router()

const TICKETS = [
  { matchId: '1', match: 'France vs Bresil', date: '28 Juin 2026', stadium: 'MetLife Stadium · New York', categories: [{ name: 'Tribune', price: 150, available: 240 }, { name: 'VIP', price: 500, available: 45 }, { name: 'Loge', price: 1200, available: 8 }] },
  { matchId: '2', match: 'Argentine vs Allemagne', date: '29 Juin 2026', stadium: 'Rose Bowl · Los Angeles', categories: [{ name: 'Tribune', price: 120, available: 580 }, { name: 'VIP', price: 450, available: 60 }, { name: 'Loge', price: 1000, available: 12 }] },
  { matchId: '3', match: 'Maroc vs Portugal', date: '30 Juin 2026', stadium: 'AT&T Stadium · Dallas', categories: [{ name: 'Tribune', price: 180, available: 120 }, { name: 'VIP', price: 600, available: 20 }, { name: 'Loge', price: 1500, available: 4 }] },
]

let orders = []

router.get('/', (req, res) => {
  res.json({ success: true, tickets: TICKETS })
})

router.get('/:matchId', (req, res) => {
  const ticket = TICKETS.find(t => t.matchId === req.params.matchId)
  if (!ticket) return res.status(404).json({ message: 'Match non trouve' })
  res.json({ success: true, ticket })
})

router.post('/buy', (req, res) => {
  const { matchId, category, quantity, userId } = req.body
  const ticket = TICKETS.find(t => t.matchId === matchId)
  if (!ticket) return res.status(404).json({ message: 'Match non trouve' })
  const cat = ticket.categories.find(c => c.name === category)
  if (!cat) return res.status(404).json({ message: 'Categorie non trouvee' })
  if (cat.available < quantity) return res.status(400).json({ message: 'Plus de places disponibles' })
  cat.available -= quantity
  const order = { id: 'TK-' + Date.now(), matchId, match: ticket.match, category, quantity, price: cat.price * quantity, userId: userId || 'anonymous', date: ticket.date, stadium: ticket.stadium, createdAt: new Date() }
  orders.push(order)
  res.json({ success: true, order })
})

module.exports = router