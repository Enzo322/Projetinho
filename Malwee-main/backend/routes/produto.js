const Joi = require('joi');
const knl = require('../knl');

knl.post('product', async(req, resp) => {
    const schema = Joi.object({
        descricao : Joi.string().min(1).max(200).required(),
        preco : Joi.number().min(0.01).required(),
        fkSubGrupo : Joi.number().integer().required(),
        fkGrupo : Joi.number().integer().required(),
        fkColecao : Joi.number().integer().required()
    })

    knl.validate(req.body, schema);

    const result = await knl.sequelize().models.Produto.findAll({
        where : {
            descricao : req.body.descricao
        }
    });

    knl.createException('0006', '', !knl.objects.isEmptyArray(result));

    const user = knl.sequelize().models.Produto.build({
        descricao : req.body.descricao,
        preco : req.body.preco,
        fkSubGrupo : req.body.fkSubGrupo,
        fkGrupo : req.body.fkGrupo,
        fkColecao : req.body.fkColecao
    });

    await user.save();
    resp.end();
});

knl.get('product', async(req, resp) => {
    const user = await knl.sequelize().models.Produto.findAll();
    resp.send(user);
    resp.end();
});


knl.delete('product', async(req, resp) => {

    knl.sequelize().models.Produto.destroy({
        where : {
            idProduto : req.body.idProduto
        }
    });
    resp.end();
});


knl.put('product', async(req,resp)=>{
    const result = await knl.sequelize().models.Produto.update({
        descricao  : req.body.descricao,
        preco : req.body.preco,
        fkSubGrupo : req.body.fkSubGrupo,
        fkGrupo : req.body.fkGrupo,
        fkColecao : req.body.fkColecao
    },{
        where : {
            idProduto : req.body.idProduto
        }
    })
    resp.send(result);
    resp.end();
});
        
knl.patch('product', async(req, resp) => {
    const result = await knl.sequelize().models.Produto.update({
    descricao  : req.body.descricao
    },{
         where : {
            idProduto : req.body.idProduto,
            
        }
    });
    resp.send(result);
    resp.end();
});
    
