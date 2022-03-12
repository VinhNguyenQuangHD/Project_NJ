var loai_sp_db = require('../models/Loai_sp');

exports.create_new_produce_type = (req,res) =>{
    if(!req.body){
        res.status(404).send({message : "Form khong duoc de trong"});
    }else{
        const new_type_product = new loai_sp_db({
            Ma_Loai: req.body.maloai,
            Ten_loai: req.body.tenloai,
        });

        new_type_product.save(new_type_product).then(data =>{
            res.redirect('/adminpage/protype');
        }).catch(err =>{
            res.status(500).send({message: err.message || "Khong the them moi laoi san pham"});
        });
    }
}

exports.read_new_produce_type = (req,res) => {
    if(req.query.id){
        const id = req.query.id;
        loai_sp_db.findById(req.query.id).then(data =>{
            if(!data){
                res.status(404).send({message: "Khong the doc du lieu"});
            }else{
                res.send(data);
            }
        })
    }else{
        loai_sp_db.find().then(protype =>{
            res.send(protype);
        }).catch(err => {
            res.status(500).send({message: err.message || "Khong tim thay du lieu de xem"});
        });
    }
    
}

exports.update_new_produce_type = (req,res) =>{
    if(!req.body){
        res.status(404).send({
            message: "Khong the de form trong"
        });
    }else{
        const id = req.params.id;
        loai_sp_db.findByIdAndUpdate(id,req.body, {useFindAndModify: false}).then(data =>{
            if(!data){
                res.status(404).send({message: "Form phai duoc lap day"});
            }else{
                res.send(data);
                res.redirect('/adminpage/producttype');
            }
        }).catch(err =>{
            res.status(500).send({message: err.message || "Da co loi xay ra, khong the cap nhat"});
        });
    }
}

exports.delete_new_produce_type = (req,res) =>{
        const id = req.params.id;
        loai_sp_db.findByIdAndDelete(id).then(data =>{
            if(!data){
                res.status(404).send({message: "Form phai duoc lap day"});
            }else{
                res.send(data);
                res.redirect('/adminpage/producttype');
            }
        }).catch(err =>{
            res.status(500).send({message: err.message || "Da co loi xay ra, khong the xoa"});
        });
}