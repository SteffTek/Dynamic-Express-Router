"use strict";

/**
 * @author SteffTek
 * @file dynamicRouter.js
 * @copyright SteffTek, 2021
 * @license Apache-2.0
 */

/**
 * Core Imports
 */
let fs = require("fs");
let path = require("path");

/**
 * Routes storage
 */
const routes = {
    /* API NAME: API FILE */
}

/**
 * Start route caching
 */
getRoutes();

/**
 * Router
 * @param {express app} app 
 */
module.exports = function(app){

    // SET UP ENDPOINT
    app.get('/api/:endpoint/:method', async (req, res) => {

        // GET ROUTE FROM ROUTES TABLE
        const route = routes[`/api/${req.params.endpoint}/${req.params.method}`]

        // EXECUTE ROUTE
        route(req, res);
    });
}

/**
 * Get routes and store them
 */
function getRoutes() {

    // CONSTRUCT PATH
    const folderPath = path.join(__dirname, "./routes/")

    // GET ALL FILES IN FOLDER
    let files = fs.readdirSync(folderPath);

    // GET ALL JS FILES
    let jsFiles = files.filter((f) => f.split(".").pop() === "js");
    
    // IF NO FILES => SKIP
    if (jsFiles.length <= 0) {
        return;
    }
    
    // LOOP TROUGH JS FILES
    jsFiles.forEach((f, i) => {

        // GET FILE NAME
        let name = f.split(".")[0];

        // PULL FILE
        let pull = require(path.join(folderPath, name));

        // GET FILE ROUTE
        let route = pull.path;
        routes[route] = pull.router;
    });

    console.log(routes)
}
