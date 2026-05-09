const express = require('express')
const router = express.Router()

const ARTICLES = [
  { id: '1', title: 'Analyse tactique · France vs Bresil', category: 'Analyse', author: 'Cup of World IA', views: 48000, image: '⚽', date: new Date(), premium: false },
  { id: '2', title: 'Maroc · Le miracle continue', category: 'Report', author: 'Youssef M.', views: 92000, image: '🇲🇦', date: new Date(), premium: false },
  { id: '3', title: 'Top 10 buts de la semaine', category: 'Highlights', author: 'Cup of World IA', views: 130000, image: '🔥', date: new Date(), premium: true },
  { id: '4', title: 'Interview exclusive · Mbappe', category: 'Interview', author: 'Redaction', views: 210000, image: '🌟', date: new Date(), premium: true },
  { id: '5', title: 'Stats · Les chiffres fous du Mondial', category: 'Stats', author: 'Cup of World IA', views: 76000, image: '📊', date: new Date(), premium: false },
]

router.get('/', (req, res) => {
  const { category, premium } = req.query
  let result = [...ARTICLES]
  if (category) result = result.filter(a => a.category === category)
  if (premium === 'false') result = result.filter(a => !a.premium)
  res.json({ success: true, articles: result, total: result.length })
})

router.get('/:id', (req, res) => {
  const article = ARTICLES.find(a => a.id === req.params.id)
  if (!article) return res.status(404).json({ message: 'Article non trouve' })
  res.json({ success: true, article })
})

module.exports = router