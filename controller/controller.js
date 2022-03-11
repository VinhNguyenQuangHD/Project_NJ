var Infor_db = require('../models/Infor');

//Tao mot user moi
exports.create = (req,res) =>{
    if(!req.body ){
        res.status(400).send({message: "Form khong duoc de trong"}); 
        return;
    }

    //Tao moi thong tin

    const new_infor = new Infor_db({
        email: req.body.email,
        Code_name: req.body.codename,
        ages: req.body.ages,
        Gender: req.body.gender,
        Social_link: req.body.social_link,
    });

    //Luu thong tin vao database
    new_infor.save(new_infor).then(data => {
        res.redirect('/adminpage/create');
    }).catch(err =>{
        res.status(500).send({
            message: err.message || "Cannot create new infor"
        });
    });
}

exports.read = (req,res) =>{
    if(req.query.id)
    {
        const id = req.query.id;
        Infor_db.findById(id).then(data =>{
            if(!data){
                res.status(404).send({message: "Khong the load du lieu"});
            }else{
                res.send(data);
            }
        });
    }else{
        //Tim kiem thong tin
        Infor_db.find().then(user => {
            res.send(user)
        }).catch(err =>{
            res.status(500).send({message: err.message || "Da co loi xay ra"})
        })
    }
    
}

exports.update = (req,res) =>{
    //Neu form cap nhat bi trong
    if(!req.body ){
        return res.status(400).send({message: "Form cap nhat khong duoc de trong"}); 
    }

    //Neu khong thi thuc hien cap nhat
    const id = req.params.id;
    Infor_db.findByIdAndUpdate(id, req.body, {useFindAndModify: false}).then(data =>{
        console.log(req.body)
        if(!data){
            res.status(400).send({message: `Khong the cap nhat thong tin cua ${id}`}); 
        }else{
            res.send(data);
        }
    }).catch(err =>{
        res.status(500).send({message: err.message || "Khong the cap nhat user nay"})
    })
}

exports.delete = (req,res) =>{
    const id = req.params.id;

    Infor_db.findByIdAndDelete(id).then(data =>{
        if(!data){
            res.status(400).send({message: `Khong the xoa thong tin cua ${id}`}); 
        }else{
            res.send({
                message: "Thong tin cua user nay da bi xoa"
            })
        }
    }).catch(err =>{
        res.status(500).send({message: err.message || "Khong the Xoa user nay"})
    })
}