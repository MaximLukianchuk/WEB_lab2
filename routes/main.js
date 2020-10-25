const path = require('path');
const url = require('url');
const https = require('https');
const fs = require('fs');

const { profilePage } = require('../pages/profile');

const mainRoute = (req, res) => {
    const { query: { code } } = url.parse(req.url, true);
    
    if (code) {
        renderProfilePage(res, code);
    } else {
        renderMainPage(res);
    }
};

const renderProfilePage = (res, code) => {
    const host = 'https://oauth.vk.com/access_token';
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const redirectUri = 'http://127.0.0.1:3000/';
    
    https.get(url.format({
        pathname: host,
        query: {
            code,
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: redirectUri,
        }
    }), (resp) => {
        let body = '';
        
        resp.setEncoding('utf8');
        resp.on('data', data => {
            body += data;
        });
        resp.on('end', () => {
            const { access_token, user_id } = JSON.parse(body);
            const pathName = 'https://api.vk.com/method/users.get';
            const version = '5.124';
    
            https.get(url.format({
                pathname: pathName,
                query: {
                    user_ids: user_id,
                    access_token,
                    v: version
                }
            }), (resp) => {
                let body = '';
        
                resp.setEncoding('utf8');
                resp.on('data', data => {
                    body += data;
                });
                resp.on('end', () => {
                    const data = JSON.parse(body);
                    
                    if (data.error) {
                        console.error(data.error);
                        renderMainPage(res);
                    } else {
                        const { response: [{ first_name, last_name }] } = data;
                        
                        res.writeHead(200, {
                            'Content-Type': 'text/html'
                        });
                        res.end(profilePage(first_name, last_name));
                    }
                });
            }).on('error', (e) => {
                console.error(e);
                renderMainPage(res);
            });
        });
    }).on('error', (e) => {
        console.error(e);
        renderMainPage(res);
    });
};

const renderMainPage = (res) => {
    const filePath = path.join(__dirname, '..', 'public', 'index.html');
    
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500);
            res.end('Internal Server Error');
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.end(data);
        }
    })
};

module.exports = {
    mainRoute
};
