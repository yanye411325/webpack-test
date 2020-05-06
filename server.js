const express = require('express')
const app = express()

app.get('/api/msg', (req, res) => {
  res.json({
    "name": "express => kevin"
  })
})

app.listen(9001)