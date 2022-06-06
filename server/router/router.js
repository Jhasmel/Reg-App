const express = require('express')
const router = express.Router()
const Reg = require ('../models/schema')


router.post('/patients', async (req, res) => {
     const Register = new Reg({
        name: req.body.name,
        age: req.body.age
    })
    await Register.save()
    .then(data => {
        res.send(data)
    }).catch(error =>{
        res.send(error)
    })
})

router.get('/patients', async (req, res) => {
    try {
        let { page, size} = req.query;
        if (!page) {
            page = parseInt(req.query.page);
        }
        if(!size) {
            size = parseInt(req.query.limit);
        }

        const limit = parseInt(size);
        const skip = (page -1 ) * size;
        const total =  await Reg.countDocuments()

        const patients = await Reg.find().limit(limit).skip(skip)
        res.send(patients)

    } catch (error) {
        res.sendStatus(500).send(error.message)

    }
}) 

router.put("/patients/:id", async (req, res) => {
    const { name, age} = req.body;
    const newReg = {name, age};
    await Reg.findByIdAndUpdate(req.params.id, newReg)
    .then(data => {
        res.send(data)
    }).catch(error => {
        res.send(error)
    })
    console.log(req.params.id)
    })

router.delete("/patients/:id", async (req, res) => {
    await Reg.findByIdAndRemove(req.params.id)
    res.json({status: 'Patient Deleted'})
})

module.exports = router


// router.get('/patients', async (req,res) => {
//     try {
//         let query = Reg.find();
//             const page = parseInt(req.query.page) ;
//             const pageSize = parseInt(req.query.limit);
//             const skip = (page - 1) * pageSize;
//             const total =  await Reg.countDocuments()

//             const pages = Math.ceil(total / pageSize)

//             query = query.skip(skip).limit(pageSize);
//             const result =  await query;

//             res.status(200).json({
//                 status: 'sucess',
//                 count: result.length,
//                 page,
//                 pages,
//                 data: result

//             })

//     } catch (error) {
//         res.sendStatus(500).send(error.message)

//     }

// })