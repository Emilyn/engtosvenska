const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()
const PORT = process.env.PORT || 3000
const DIST = path.join(__dirname, 'dist')

// SW - no-cache headers
app.get('/sw.js', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
  res.setHeader('Service-Worker-Allowed', '/')
  res.sendFile(path.join(DIST, 'sw.js'))
})

// Workbox file - no cache
app.use((req, res, next) => {
  if (/^\/workbox-.+\.js$/.test(req.path)) {
    res.setHeader('Cache-Control', 'no-cache')
    const file = path.join(DIST, req.path.slice(1))
    if (fs.existsSync(file)) return res.sendFile(file)
  }
  next()
})

// Hashed assets - immutable
app.use('/assets', express.static(path.join(DIST, 'assets'), {
  maxAge: '1y', immutable: true,
}))

// Static files
app.use(express.static(DIST, { maxAge: '1h' }))

// SPA fallback - all unmatched routes → index.html
app.use((req, res) => {
  res.sendFile(path.join(DIST, 'index.html'))
})

app.listen(PORT, () => console.log(`Svenska PWA on port ${PORT}`))
