// Set up Controller.  Activity 16
var express = require("express");
var router = express.Router();
var db= require("../models");

// module.exports = function(app) {

router.get("/", function(req, res) {
    db.Burger.findAll({}) 
      .then(function(data) {
          var hbsObject = {
            burgers: data
        };
      console.log(hbsObject);
      res.render("index", hbsObject);
    })
    .catch(function(err) {
        res.json(err)
      });
  });

router.post("/", function(req, res) {
    console.log(req.body);
        db.Burger.create({
          burger_name: req.body.burger_name,
          devoured: req.body.devoured
      })
    .then(function(data) {
        res.redirect("/");;
      })
      .catch(function(err) {
        res.json(err);
      });
    });

router.put("/:id", function(req, res) {
  db.Burger.update({
      devoured: req.body.devoured
    }, {
          where: {
          id: req.params.id
      }
    })
    .then(function(data) {
        res.redirect("/");
      })
    .catch(function(err) {
        res.json(err)
      });
});

router.delete("/:id", function(req, res) {
    db.Burger.destroy({
        where: {
        id: req.params.id
      }
  })
    .then(function(data) {
      res.redirect("/");
  })
    .catch(function(err){
      res.json(err)
    });
});
// }

module.exports = router;