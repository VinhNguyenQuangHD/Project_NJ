var production = require('../models/San_pham');


exports.create_new_production = (req,res) =>{
    if(!req.body){
        res.status(404).send({message: "Co loi xay ra !!"});
    }else{
        const new_product = new production({
            id_sanpham: req.body.idsanpham,
            Ma_Loai: req.body.maloai,
            TenSP: req.body.tensp,
            DonGia: req.body.idsanpham,
            Hinh: req.body.hinh,
            NguyenLieu: req.body.nguyenlieu,
            CachLam: req.body.cachlam,
            Luot_theo_doi: req.body.luottheodoi,
            DanhGia: req.body.danhgia,
        });

        new_product.save(new_product).then(data =>{
            res.redirect('/');
        }).catch(err =>{
            res.status(500).send({message: err.message || "Co loi xay ra, khong the them du lieu !!"});
        })
    }
}

exports.read_all_production = (req,res) =>{
    if(req.query.id){
        const prodct_id = req.query.id;
        production.findById(prodct_id).then(data =>{
            if(!data){
                res.status(404).send({message: "Da co loi xay ra"});
            }else{
                res.send(data);
            }
        })
    }else{
        production.find().then(collect_product =>{
            res.send(collect_product);
        }).catch(err =>{
            res.status(500).send({message: err.message|| "Da co loi, khong the tim san pham !!"});
        })
    }
}

exports.update_current_production = (req,res) =>{
    if(!req.body){
        res.status(404).send({message: "Khong the load form !!!"});
    }else{
        const id = req.params.id;
        production.findByIdAndUpdate(id,req.body,{useFindAndModify: false} ).then(data =>{
            if(!data){
                res.status(404).send({message: "Form phai co thuoc tinh thay doi !!!"});
            }else{
                res.send(data);
            }
        }).catch(err =>{
            res.status(500).send({message: err.message || "Khong the cap nhat form"});
        })
    }
}

exports.delete_current_production = (req,res) =>{
    const id = req.params.id;
        production.findByIdAndDelete(id).then(data =>{
            if(!data){
                res.status(404).send({message: "Form bi loi roi !!!"});
            }else{
                res.send(data);
            }
        }).catch(err =>{
            res.status(500).send({message: err.message || "Khong the xoa du lieu"});
        })
}