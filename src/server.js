/**
 * Created by Infuse on 21/07/17.
 */

'use strict';
const dotenv = require('dotenv').config();
const Hapi = require('hapi');
const routes = require('./routes');

// Create a server with a host and port
const server = new Hapi.Server();
var port = process.env.PORT || 3000;

server.connection({
    routes: {cors: true},
    port: port
});


// Add pagination
const options = {
    query: {
        limit: {
            default: 10
        }
    },

    routes: {
        include: ["/weapons", "/armors", "/accessories", "/bracelets", "/feathers", "/manastones", "/wings"]
    }
};
server.register({register: require('hapi-pagination'), options: options},
    function (err) {
        if (err)
            throw err;
    }
);

server.route(routes);

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});