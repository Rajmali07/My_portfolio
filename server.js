// Import required core modules
const http = require("http");       // For creating the HTTP server
const fs = require("fs");           // For reading files from the file system
const path = require("path");       // For handling and transforming file paths

const port = 3001;                  // Define the port the server will listen on

// Create the HTTP server
const server = http.createServer((req, res) => {
    // Resolve the requested file path
    // If root URL is requested, serve 'index.html'
const decodedUrl = decodeURIComponent(req.url === '/' ? '/' : req.url).slice(1);
  let filePath;
  if (decodedUrl.startsWith('../')) {
    // Serve from root
    filePath = path.normalize(path.join(__dirname, '..', decodedUrl.slice(3)));
  } else if (decodedUrl.startsWith('reports/')) {
    // Always serve reports from root reports/
    filePath = path.join(__dirname, '..', decodedUrl);
  } else {
    filePath = path.join(__dirname, decodedUrl);
  }
  // Security check
  if (path.relative(__dirname, filePath).startsWith('..') || filePath.indexOf('\\..\\') !== -1) {
    filePath = path.join(__dirname, 'index.html');
  }
  console.log(`Request: ${req.url} -> ${filePath}`);

    // Get the file extension (e.g., .html, .css)
    const extName = String(path.extname(filePath)).toLowerCase();

    // Define MIME types for supported file extensions
    const mimeTypes = {
  // Core web files
  '.html': 'text/html',
  '.htm': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',

  // Images
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',

  // Fonts
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.eot': 'application/vnd.ms-fontobject',

  // Video & animation
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.ogg': 'video/ogg',

  // Audio (if needed)
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',

  // Documents (optional)
  '.pdf': 'application/pdf',
  '.txt': 'text/plain'
};


    // Set the appropriate content type or fallback to 'application/octet-stream'
    const contentType = mimeTypes[extName] || 'application/octet-stream';

    // Check if the file exists and get stats
    fs.stat(filePath, (err, stats) => {
        if (err) {
            // Handle file not found error
            if (err.code === "ENOENT") {
                res.writeHead(404, { "Content-Type": "text/html" });
                res.end(`<h1>404: File not found</h1><p>Requested: ${path.relative(__dirname, filePath)}</p><p>Actual CWD: ${__dirname}</p>`);
            } else {
                // Handle other server errors
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
            return;
        }

        // If the file is a video, use streaming with range requests for better performance
        if (extName === '.mp4' || extName === '.webm' || extName === '.ogg') {
            const range = req.headers.range;
            if (!range) {
                // 416 Wrong range - range header is required for videos
                res.writeHead(416, {
                    'Content-Range': `bytes */${stats.size}`
                });
                return res.end();
            }

            const positions = range.replace(/bytes=/, "").split("-");
            const start = parseInt(positions[0], 10);
            const end = positions[1] ? parseInt(positions[1], 10) : stats.size - 1;
            const chunksize = (end - start) + 1;

            res.writeHead(206, {
                'Content-Range': `bytes ${start}-${end}/${stats.size}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': contentType
            });

            const stream = fs.createReadStream(filePath, { start, end })
                .on('open', () => {
                    stream.pipe(res);
                })
                .on('error', (streamErr) => {
                    res.end(streamErr);
                });
        } else {
            // For non-video files, read and serve normally
            fs.readFile(filePath, (error, content) => {
                if (error) {
                    res.writeHead(500);
                    res.end(`Server Error: ${error.code}`);
                } else {
                    const headers = { "Content-Type": contentType };
  if (extName === '.pdf') {
    headers['Content-Disposition'] = 'inline';
  }
  res.writeHead(200, headers);
                    res.end(content, 'utf-8');
                }
            });
        }
    });
});

// Start the server and listen on the defined port
server.listen(port, () => {
    console.log(`🚀 Server is listening on port ${port}`);
});
