const express = require('express');
const controller = require('..//controller/controller');
const routes = express.Router();
const axios = require('axios');

routes.get('/adminpage', (req,res) =>{
    axios.get('http://localhost:8080').then(function(response){
        console.log(response);
        res.render('admin',{user:response.data});
    }).catch(err => {
        res.send(err);
    })

});

routes.get('/adminpage/create', (req,res) =>{
    res.render("create");
});

routes.get('/adminpage/update', (req,res) =>{
    axios.get('http://localhost:8080', {params: {id: req.query.id}}).then(function(userdata){
        res.render('update',{user:userdata.data});
    }).catch(err => {
        res.send(err);
    })
});

routes.post('/adminpage/create', controller.create );
routes.get('/adminpage', controller.read );
routes.put('/adminpage/update/:id', controller.update );
routes.post('/adminpage/update/:id', controller.delete );

module.exports = routes;
