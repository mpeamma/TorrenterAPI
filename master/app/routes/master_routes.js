const PirateBay = require("thepiratebay");
const WebTorrent = require('webtorrent');
const axios = require('axios');

module.exports = function(app) {

    app.post('/register', (req, res) => {
            res.send("Registered");
        });
    }
};