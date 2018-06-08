const PirateBay = require("thepiratebay");
const WebTorrent = require('webtorrent');
const axios = require('axios');

module.exports = function(app) {

    app.post('/download', (req, res) => {
        let results;


        if(req.body.name) {
            PirateBay.search(req.body.name, {
                category: 'all'
            }).then(response => {
                results = response;
                let toDownload = results[0];
                for (let tor in results) {
                    if (tor.seeders > toDownload.seeders) {
                        toDownload = tor;
                    }
                }

                let client = new WebTorrent();
                let opts = {
                    path: "C:/Users/mpeam/testing"
                };
                client.add(toDownload.magnetLink, opts, function (torrent) {
                    console.log('Client is downloading:', torrent.infoHash);
                });

                console.log(toDownload);
                res.send(toDownload);
            });
        } else {
            res.sendStatus(400);
        }
    });
};