const url = require('url');

const loginRoute = (req, res) => {
    const pathName = 'https://oauth.vk.com/authorize';
    const clientId = process.env.CLIENT_ID;
    const redirectUri = 'http://127.0.0.1:3000/';
    const displayType = 'page';
    
    res.writeHead(302, {
        'Location': url.format({
            pathname: pathName,
            query: {
                client_id: clientId,
                redirect_uri: redirectUri,
                display: displayType
            }
        })
    });
    res.end();
};

module.exports = {
    loginRoute
};
