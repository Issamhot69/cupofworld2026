const express = require('express')
const router = express.Router()

const VIP_PACKAGES = [
  { id: '1', name: 'Pack VIP Gold', price: 999, perks: ['Acces lounge VIP', 'Repas gastronomique', 'Rencontre joueurs', 'Maillot dedie'], available: 20 },
  { id: '2', name: 'Pack VIP Platinum', price: 2499, perks: ['Tout Gold +', 'Helicopter transfert', 'Hotel 5 etoiles', 'Photo avec trophee'], available: 8 },
  { id: '3', name: 'Pack Creator', price: 499, perks: ['Acces terrain', 'Badge presse', 'Zone media', 'Interview joueurs'], available: 15 },
]

let vipOrders = []

router.get('/', (req, res) => {
  res.json({ success: true, packages: VIP_PACKAGES })
})

router.post('/buy', (req, res) => {
  const { packageId, userId } = req.body
  const pkg = VIP_PACKAGES.find(p => p.id === packageId)
  if (!pkg) return res.status(404).json({ message: 'Package non trouve' })
  if (pkg.available <= 0) return res.status(400).json({ message: 'Package epuise' })
  pkg.available -= 1
  const order = { id: 'VIP-' + Date.now(), package: pkg.name, price: pkg.price, perks: pkg.perks, userId: userId || 'anonymous', createdAt: new Date() }
  vipOrders.push(order)
  res.json({ success: true, order })
})

module.exports = router