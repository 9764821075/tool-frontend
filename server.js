const express     = require("express")
const forceHttps  = require("express-force-https")
const proxy       = require("http-proxy-middleware")
const serveStatic = require("serve-static")

const HOST = "0.0.0.0"

const PORT = process.env.APP_PORT
if (!PORT) { throw new Error('Missing APP_PORT environment variable') }

const API_URL = process.env.API_URL
if (!API_URL) { throw new Error('Missing API_URL environment variable') }

const app = express()

app.use(forceHttps)
app.use(serveStatic(__dirname + "/dist", {
  cacheControl: false,
  lastModified: false,
  index: false,
}))

app.use("/api", proxy({ target: API_URL, changeOrigin: true }))
app.use("/attachments", proxy({ target: API_URL, changeOrigin: true }))

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/dist/index.html")
})

const server = app.listen(PORT, HOST, () => {
  console.log("Listening on " + HOST + ":" + PORT)
})

process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server")
  server.close(() => {
    console.log("HTTP server closed")
  })
})
