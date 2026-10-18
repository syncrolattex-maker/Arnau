import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'aules-proxy',
      configureServer(server) {
        server.middlewares.use('/api/aules-proxy', async (req, res) => {
          try {
            const urlObj = new URL(req.url || '', 'http://localhost:5173');
            const targetUrl = urlObj.searchParams.get('url');
            if (!targetUrl) {
              res.statusCode = 400;
              res.end('Missing url query parameter');
              return;
            }

            const cleanUrl = targetUrl.replace(/^webcal:\/\//i, 'https://');
            const response = await fetch(cleanUrl, {
              headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
              },
            });

            if (!response.ok) {
              res.statusCode = response.status;
              res.end(`Aules server responded with HTTP ${response.status}`);
              return;
            }

            const text = await response.text();
            res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
            res.end(text);
          } catch (err: unknown) {
            res.statusCode = 500;
            const message = err instanceof Error ? err.message : String(err);
            res.end(`Proxy error: ${message}`);
          }
        });
      },
    },
  ],
  server: {
    fs: {
      strict: false,
    },
  },
})
