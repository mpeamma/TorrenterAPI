const axios = require('axios');

module.exports = function(app) {

    let agents = [];
    app.post('/register', (req, res) => {

        let agent = {
            address: req.connection.remoteAddress,
            port: req.body.port,
            name: req.body.name
        };

        let unique = true;
        console.log(agents);
        for(let a in agents) {
            console.log(agents[a]);
            if( agents[a].address === agent.address &&
                agents[a].port === agent.port) {
                unique = false;
            }
        }

        if(unique) {
            agents.push(agent);
        }
        res.send(agent);
    });

    app.get('/agents', (req, res) => {
        res.send(agents);
    });

    app.post('/download', (req, res) => {
        let title = req.body.title;
        let hostname = req.body.hostname;
        let agent;
        for(let i in agents) {
            if(agents[i].name === hostname) {
                agent = agents[i];
            }
        }
        if(agent) {
            let url = "http://"+agent.address+":"+agent.port+"/download";
            console.log(url);
            axios.post(url, {
                name: title
            })
            .then(response =>  {
                console.log(response.data);
                res.send(response.data);
            })
            .catch(response =>  {
                console.log("Error: " + response);
                res.sendStatus(500)
            });
            //res.send(agents);
        }
        else {
            res.sendStatus(400);
        }
    });
};
