const Task = require('../../../databases/models/Task')
const { body, param ,validationResult  } = require('express-validator');

module.exports = (app, prefix) => {

    const messageErrorNoNumericIdParam = (value, res) => {
        return res.status(400).json(
            {
                "errors": [
                    {
                        "value": value,
                        "msg": "El id la tarea tiene que se numerico",
                        "param": "id",
                        "location": "param"
                    }
                ]
            }
        )
    }

    const attributesS = [
        'id', 
        'name', 
        'description'
    ];

    const validatorId = ()=>{
        return param('id')
        .notEmpty().withMessage("Es requerido el id de la tarea")
        .isString().withMessage("Se envia envia id como string pero que tenga la posibilidad de aplicar inferencia de string a int")
    }

    const validatorName = ()=>{
        return body('name')
        .notEmpty().withMessage("Es requerido el nombre de la tarea")
        .isString().withMessage("El nombre de la tarea tiene que ser tipo texto")
    }
    
    const validatorDescription = ()=>{
        return body('description')
        .isString().withMessage("La descripcion de la tarea tiene que ser tipo texto")
    }

    app.get(`/${prefix}`,(req, res)=>{
        Task.findAll({
            attributes: attributesS
        }).then((tasks)=>{
            res.json(tasks)
        })
        
    })

    app.get(`/${prefix}/:id`, validatorId(),
        (req, res)=>{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { id } = req.params

            if(id.match(/^[0-9.]+$/) === null){
                return messageErrorNoNumericIdParam(id, res)
            }
            
            Task.findOne({
                attributes: attributesS,
                where: {
                    id:id
                }
            }).then((task)=>{
                res.json(task)
            })
        }
    )

    app.put(`/${prefix}/:id`,
        validatorId(),
        validatorName(),
        validatorDescription(),
        (req, res)=>{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { id } = req.params
            if(id.match(/^[0-9.]+$/) === null){
                return messageErrorNoNumericIdParam(id, res)
            }
            const {name, description} = req.body

            Task.update({
                name,
                description
            },{
                where: {
                    id:id
                }
            }).then((updatedRows)=>{
                res.json({
                    updatedRows: updatedRows
                })
            })
        }
    )

    app.delete(`/${prefix}/:id`,
        validatorId(),
        (req, res)=>{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { id } = req.params
            
            if(id.match(/^[0-9.]+$/) === null){
                return messageErrorNoNumericIdParam(id, res)
            }

            Task.destroy({
                where: {
                    id:id
                }
            }).then((deletedRows)=>{
                res.json({
                    deletedRows: deletedRows
                })
            })
        }
    )

    app.post(`/${prefix}`, 
        validatorName(),
        validatorDescription(),
        (req, res)=>{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const {name, description} = req.body
            Task.create({
                "name": name,
                "description": description
            }).then(task => {
                res.status(201).json(task)
            })
        }
    )
}
