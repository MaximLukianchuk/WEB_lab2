const http = require('http');
const url = require('url');

const { mainRoute } = require('./routes/main');
const { loginRoute } = require('./routes/login');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    const { pathname } = url.parse(req.url);
    
    switch (pathname) {
        case '/api/login':
            return loginRoute(req, res);
        default:
            return mainRoute(req, res);
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
