const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const MEGA_VIDEO_URL = 'https://mega.nz/embed/F7VWDKrZ#Z8IWA-ATHF-DGgCiorIgWtxez3JzjFJLOa-U9aDgiIc!9000s1a';

// Middleware para fazer proxy para o Mega
app.use('/video', createProxyMiddleware({
    target: MEGA_VIDEO_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/video': '', // Remove o prefixo /video
    },
    onProxyReq(proxyReq, req, res) {
        proxyReq.setHeader('Referer', 'https://mega.nz/');
    }
}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
