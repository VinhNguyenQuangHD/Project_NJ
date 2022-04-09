const express = require('express');
const controller = require('..//controller/controller');
const controller1 = require('..//controller/chude_controller');
const controller2 = require('..//controller/loaisp_controller');
const controller3 = require('../controller/user_controller');
const controller4 = require('../controller/sanpham_controller');
const routes = express.Router();
const axios = require('axios');
const { db } = require('../models/San_pham');
const { route } = require('./user.routes');

//Quan ly thong tin user
routes.get('/adminpage', (req,res) =>{
    axios.get('http://localhost:8080/api/users').then(function(response){
        console.log(response);
        res.render('admin',{users:response.data});
    }).catch(err => {
        res.send(err);
    })

});

routes.delete("/logout", (req, res) => {
    req.logOut();
    res.redirect("/login");
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

//Quan ly chu de 
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

routes.post('/api/topic', controller1.topic_create );
routes.get('/api/topic', controller1.topic_read );
routes.put('/api/topic/:id', controller1.topic_update );
routes.delete('/api/topic/:id', controller1.topic_delete );


//Quan ly loai san pham
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
        res.render('admin_loaisp_update',{ protypes:userdata.data });
    }).catch(err => {
        res.send(err);
    });
});

routes.post('/api/protypes', controller2.create_new_produce_type );
routes.get('/api/protypes', controller2.read_new_produce_type );
routes.put('/api/protypes/:id', controller2.update_new_produce_type );
routes.delete('/api/protypes/:id', controller2.delete_new_produce_type );


//Quan ly thong tin nguoi dung

routes.get('/profile', (req,res) =>{
    res.render("profile");
});

routes.get('/profile/users', (req,res) =>{
    axios.get('http://localhost:8080/api/userss').then(function(response){
        console.log(response);
        res.render('admin_control_center', {protypes: response.data});

    }).catch(err => {
        res.send(err);
    })
})

routes.get('/profile/users-update', (req,res) =>{
    axios.get('http://localhost:8080/api/userss', {params: {id: req.query.id}}).then(function(usersdata){
        res.render('profile_update',{userss:usersdata.data});
    }).catch(err =>{
        res.send(err);
    })
})

/*routes.get('/profile', (req,res) =>{
    axios.get('http://localhost:8080/api/userss').then(function(response){
        console.log(response);
        res.render('profile_manager',{users:response.data});
    }).catch(err => {
        res.send(err);
    })

});*/

routes.get('/api/userss',controller3.user_read);
routes.put('/api/userss/:id', controller3.user_update);
routes.delete('/api/userss/:id', controller3.user_delete);


//Them san pham:

routes.get('/production' , (req,res) =>{
    res.render("production");
})

routes.get('/view-production', (req,res) =>{
    axios.get('http://localhost:8080/api/production', { params: {id: req.query.id}}).then(function(proddata){
        res.render('production_view',{prod: proddata.data});
    }).catch(err => {
        res.send(err);
    })
});

routes.post('/api/production', controller4.create_new_production);
routes.get('/api/production',controller4.read_all_production);
routes.put('/api/production/:id', controller4.update_current_production);
routes.delete('/api/production/:id', controller4.delete_current_production);

module.exports = routes;
