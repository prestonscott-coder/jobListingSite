import express from 'express';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));

// Import json-server
const jsonServer = require('json-server');

const app = express();
const PORT = process.env.PORT || 8000;

// Serve static files from the React build
app.use(express.static(join(__dirname, 'dist')));

// Set up the JSON Server API
const apiServer = jsonServer.create();
const router = jsonServer.router(join(__dirname, 'src/jobs.json'));
const middlewares = jsonServer.defaults();

apiServer.use(middlewares);
app.use('/api', apiServer);
app.use('/api', router);

// All other GET requests not handled before will return the React app
app.get('*', (req, res) => {
    res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
});