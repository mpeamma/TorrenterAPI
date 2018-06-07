const pbRoutes = require('./pb_routes');
module.exports = function(app) {
    pbRoutes(app);
    // Other route groups could go here, in the future
};