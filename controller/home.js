const express = require("express");
const router = express.Router();
const trackip = require("../modal/home.js")

const home = (app) => {
    router.get('/',trackip.getip,trackip.trackip)

    return app.use("/", router)
}
module.exports = home