// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");
// Routes
// =============================================================
module.exports = function (app) {
  app.get("/", function (req, res) {
    res.redirect("/burgers");
  });

  app.get("/burgers", function (req, res) {
    db.Burger.findAll({}).then(function (data) {
      // Wrapping the array of returned burgers in a object so it can be referenced inside our handlebars
      var hbsObject = { burgers: data };
      res.render("index", hbsObject);
    });
  });

  app.post("/burgers/create", function (req, res) {
    db.Burger.findOrCreate({ where: { burger_name: req.body.burger_name }, defaults: { devoured: false } })
      .spread(function (Burger, created) {
        res.redirect("/");
      });
  });

  app.post("/burgers/update", function (req, res) {
    console.log("\nLog");
    console.log(req);
    db.Burger.update({devoured: true}, {where: { id: req.body.id}}).then(function() {res.redirect("/")});
  });
};
