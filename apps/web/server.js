const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const zlib = require('zlib');
const { join } = require('path');
const { processHTMLFile } = require('@workspace/critters');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const hostname = process.env.HOSTNAME || '0.0.0.0';
const app = next({ dev, port, hostname });
const handle = app.getRequestHandler();
const DIR = '/tmp/critters';
const processedRoutes = new Set();
const routes = {};
const cachingTime = 5 * 60 * 1000;

try {
  console.time('Critters: runtime prepare');

  fs.rmSync(DIR, { recursive: true, force: true });

  fs.cpSync('pages', DIR, {
    recursive: true,
    filter: function (source) {
      if (source.includes('.')) {
        return false;
      }
      return true;
    },
  });

  const processedHTMLFiles = fs.readFileSync(join(process.cwd(), 'processedRoutes.json'), 'utf-8');

  JSON.parse(processedHTMLFiles).forEach((file) => processedRoutes.add(file));

  console.timeEnd('Critters: runtime prepare');
} catch (error) {
  console.error('Critters preparation error:', error);
}

async function saveStylesToFile(html, path) {
  try {
    const folder = DIR + path;
    const styles = await processHTMLFile(path, html, 'SSR');

    fs.mkdirSync(folder, { recursive: true });

    const filePath = join(folder, 'styles.css');

    await fs.promises.writeFile(filePath, styles);
    console.log('styles saved to file:', filePath);
    console.timeEnd('Critters: runtime');
  } catch (error) {
    console.error('Error in saveStylesToFile:', error);
  }
}

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const pathname = parsedUrl.pathname;

    if (!processedRoutes.has(pathname) || Date.now() - routes[pathname] > cachingTime) {
      const originalWrite = res.write;
      const chunks = [];

      res.write = function (chunk) {
        if (res.statusCode === 200 && res.getHeader('content-type')?.includes('text/html')) {
          chunks.push(chunk);
        }
        originalWrite.apply(res, arguments);
        return true;
      };

      res.on('finish', () => {
        if (res.statusCode === 200 && res.getHeader('content-type')?.includes('text/html')) {
          processedRoutes.add(pathname);

          setTimeout(() => {
            console.time('Critters: runtime');

            const html = Buffer.concat(chunks);

            zlib.unzip(html, (err, decompressedData) => {
              if (err) {
                console.error('Error decompressing data:', err);
                return;
              }

              saveStylesToFile(decompressedData.toString(), pathname);
              routes[pathname] = Date.now();
            });
          }, 0);
        }
      });
    }

    handle(req, res, parsedUrl);
  }).listen(port, hostname, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
