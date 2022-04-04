var User_db = require('../models/User')

exports.user_read = (req,res) =>{
    if(req.res.id){
        const id = req.query.id;
        User_db.findById(id).then(data =>{
            if(!data){
                res.status(404).send({message: "Cannot load the list"});
            }else{
                res.send(data);
            }
        });
    }else{
        User_db.find().then(user =>{
            res.send(user)
        }).catch(err =>{
            res.status(500).send({message: err.message || "Error has occured in the progress !!"});
        })
    }
}

exports.user_update = (req,res) =>{
    if(!req.body){
        res.status(400).send({message: "Form cannot empty !!!"});
        return;
    }else{
        const id = req.param.id;
        User_db.findByIdAndUpdate(id,req.body,{useFindAndModify: false}).then(data =>{
            if(!data){
                res.status(400).send({message: "Cannot load this page!!!"});
            }else{
                res.send(data);
                res.redirect("/profile-update");
            }
        }).catch(err =>{
            res.status(500).send({message: err.message || "Cannot update the information !!!"});
        })
    }
}

exports.user_delete = (req,res) =>{
    const id = req.param.id;
    User_db.findByIdAndDelete(id).then(data =>{
        if(!data){
            res.status(404).send({message: "Cannot load form !!!"});
        }else{
            res.send({message: "Thong tin ve nguoi dung nay da bi xoa !!!"});
        }
    }).catch(err =>{
        res.status(500).send({message: err.message || "Cannot delete !!!! "});
    });
}