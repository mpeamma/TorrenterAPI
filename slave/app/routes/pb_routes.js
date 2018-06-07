const PirateBay = require("thepiratebay");
const WebTorrent = require('webtorrent');
const axios = require('axios');

module.exports = function(app) {

    app.post('/download', (req, res) => {
        let results;

        PirateBay.search(req.body.name, {
            category: 'all'
        }).then(response => {
            results = response;
            let toDownload  = results[0];
            for(let tor in results) {
                if(tor.seeders > toDownload.seeders) {
                    toDownload = tor;
                }
            }

            let client = new WebTorrent();
            let opts = {
                path: "C:/Users/mpeam/testing"
            };
            client.add(toDownload.magnetLink, opts, function (torrent) {
                console.log('Client is downloading:', torrent.infoHash);
                torrent.files.forEach(function (file) {
                    //console.log(Object.keys(file));
                });
            });

            //axios.get("https://michaeleamma.com").then(response => console.log(response));

            res.send(toDownload);
        });
    });
};