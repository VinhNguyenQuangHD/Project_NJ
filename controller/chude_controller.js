var chude_db = require('../models/Chu_de');

exports.topic_create = (req,res) =>{
    if(!req.body){
        res.status(400).send({message: "Form khong duoc de trong"}); 
        return;
    }else{
        const new_topic = new chude_db({
            id_chude: req.body.idchude,
            Chu_de: req.body.tenchude,
        });

        new_topic.save(new_topic).then(data =>{
            res.redirect('/adminpage/topics');
        }).catch(err =>{
            res.status(500).send({
                message: err.message || "Cannot create new topic"
            });
            
        });
    }
}

exports.topic_read = (req,res) =>{
    if(req.query.id){
        const id = req.query.id;
        chude_db.findById(id).then(data =>{
            if(!data){
                res.status(404).send({message: "Khong the load danh sach"});
            }else{
                res.send(data);
            }
        });

    }else{
        chude_db.find().then(topic =>{
            res.send(topic)
        }).catch(err => {
            res.status(500).send({message: err.message || "Khong tim thay bat cu chu de nao"});
        });
    }
    
}

exports.topic_update = (req,res) =>{
    if(!req.body){
        res.status(400).send({message: "Form khong duoc de trong"}); 
        return;
    }else{
        const id = req.param.id;
        chude_db.findByIdAndUpdate(id, req.body, {useFindAndModify: false}).then(data =>{
            if(!data){
                res.status(404).send({message: `Khong the cap nhat chu de cua id ${id}`});
            }else{
                res.send(data);
                res.redirect('/adminpage/topics');
            }
        }).catch(err =>{
            res.status(500).send({message : err.message || "Co loi xay ra"});
        });}
}

exports.topic_delete = (req,res) =>{
        const id = req.param.id;
        chude_db.findByIdAndDelete(id).then(data =>{
            if(!data){
                res.status(404).send({message: `Khong the xoa chu de cua id ${id}`});
            }else{
                res.send({message: "Chu de da bi xoa"});
            }
        }).catch(err =>{
            res.status(500).send({message : err.message || "Co loi xay ra"});
        });
}