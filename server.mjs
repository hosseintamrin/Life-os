import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join, normalize, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(fileURLToPath(new URL('.', import.meta.url)), 'dist')
const port = Number(process.env.PORT || 3000)

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
}

function safePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0])
  const candidate = normalize(join(root, decoded === '/' ? 'index.html' : decoded))
  return candidate.startsWith(root + sep) || candidate === join(root, 'index.html') ? candidate : null
}

async function sendFile(res, filePath) {
  const extension = extname(filePath)
  const data = await readFile(filePath)
  res.writeHead(200, {
    'Content-Type': contentTypes[extension] || 'application/octet-stream',
    'Cache-Control': extension === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable',
  })
  res.end(data)
}

const server = createServer(async (req, res) => {
  try {
    const pathname = new URL(req.url || '/', 'http://localhost').pathname
    if (pathname === '/_app/health') {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' })
      res.end(JSON.stringify({ ok: true, service: 'lifeos' }))
      return
    }

    const requested = safePath(req.url || '/')
    if (!requested) {
      res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' })
      res.end('Bad request')
      return
    }

    try {
      const fileInfo = await stat(requested)
      if (fileInfo.isFile()) {
        await sendFile(res, requested)
        return
      }
    } catch {
      // SPA routes fall back to index.html below.
    }

    await sendFile(res, join(root, 'index.html'))
  } catch {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('Internal server error')
  }
})

server.listen(port, '0.0.0.0', () => {
  console.log(`Life OS listening on ${port}`)
})
