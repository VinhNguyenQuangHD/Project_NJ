const express = require('express');
const controller = require('..//controller/chude_controller');
const routes = express.Router();
const axios = require('axios');


routes.get('/adminpage/topics', (req,res) =>{
    axios.get('http://localhost:8080/api/topic').then(function(response){
        console.log(response);
        res.render('admin_chude', { topic: response.data});
    }).catch(err =>{
        res.send(err);
    })
    
});

routes.get('/adminpage/topics/createnewtopic', (req,res) =>{
    res.render("admin_chude_create");
});

routes.get('/adminpage/topics/updatetopic', (req,res) =>{
    axios.get('http://localhost:8080/api/topic', {params: {id: req.query.id}}).then(function(topicdata){
        res.render("admin_chude_update", {topic: topicdata.data});
    }).catch(err =>{
        res.send(err);
    })
})

routes.post('/api/topic', controller.topic_create );
routes.get('/api/topic', controller.topic_read );
routes.put('/api/topic/:id', controller.topic_update );
routes.delete('/api/topic/:id', controller.topic_delete );

module.exports = routes;



