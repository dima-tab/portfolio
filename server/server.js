const express = require('express')
// const cors = require('cors')
const app = express()

// app.options('*', cors())
//
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//
//   // authorized headers for preflight requests
//   // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
//   next()
//
//   app.options('*', (req, res) => {
//     // allowed XHR methods
//     res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS')
//     res.send()
//   })
// })

app.get('/', function (req, res) {
  console.log("app.get('/')")
  res.send('Hello, Misha!')
})

app.listen(3000)

// for start server, open terminal and write
// npm run pm2-start
// can check it on http://localhost:3000/
