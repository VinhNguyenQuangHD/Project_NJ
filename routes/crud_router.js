const express = require('express');
const routes = express.Router();

routes.get('/adminpage', (req,res) =>{
    res.render("admin");
});

routes.get('/adminpage/create', (req,res) =>{
    res.render("create");
});

module.exports = routes;
