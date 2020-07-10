const express = require("express");
const handlebars = require("express-handlebars");
const fileupload = require("express-fileupload");

module.exports = (app) => {
    app.engine("hbs", handlebars({
        extname: "hbs"
    }));
    app.set("view engine", "hbs");
    app.use(fileupload());
    app.use("/public", express.static("public"));
};