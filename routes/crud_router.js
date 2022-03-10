const express = require('express');
const controller = require('..//controller/controller');
const routes = express.Router();
const axios = require('axios');

routes.get('/adminpage', (req,res) =>{
    axios.get('http://localhost:8080/api/users').then(function(response){
        console.log(response);
        res.render('admin',{users:response.data});
    }).catch(err => {
        res.send(err);
    })

});

routes.get('/adminpage/create', (req,res) =>{
    res.render("create");
});

routes.get('/adminpage/update', (req,res) =>{
    axios.get('http://localhost:8080/api/users', { params: {id: req.query.id}}).then(function(userdata){
        res.render('update',{users: userdata.data});
    }).catch(err => {
        res.send(err);
    })
});

routes.post('/api/users', controller.create );
routes.get('/api/users', controller.read );
routes.put('/api/users/:id', controller.update );
routes.delete('/api/users/:id', controller.delete );

module.exports = routes;
