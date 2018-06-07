const masterRoutes = require('./master_routes');
module.exports = function(app) {
    masterRoutes(app);
    // Other route groups could go here, in the future
};