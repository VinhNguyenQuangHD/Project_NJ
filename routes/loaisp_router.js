const express = require('express');
const controller = require('..//controller/loaisp_controller');
const routes = express.Router();
const axios = require('axios');

routes.get('/adminpage/protype', (req,res) =>{
    axios.get('http://localhost:8080/api/protypes').then(function(response){
        console.log(response);
        res.render('admin_loaisp',{protypes:response.data});
    }).catch(err => {
        res.send(err);
    });

});

routes.get('/adminpage/protype/procreate', (req,res) =>{
    res.render("admin_loaisp_create");
});

routes.get('/adminpage/protype/proupdate', (req,res) =>{
    axios.get('http://localhost:8080/api/protypes', {params: {id: req.query.id}}).then(function(userdata){
        res.render('admin_loaisp_update',{protypes:userdata.data});
    }).catch(err => {
        res.send(err);
    });
});

routes.post('/api/protypes', controller.create_new_produce_type );
routes.get('/api/protypes', controller.read_new_produce_type );
routes.put('/api/protypes/:id', controller.update_new_produce_type );
routes.delete('/api/protypes/:id', controller.delete_new_produce_type );

module.exports = routes;