//создание роутов
const { Router } = require('express')
const router = Router()

const Opinion = require('../models/Opinion')

//префикс /about/sendopinion
router.post('/sendopinion', async (request, result) => {
    const { userName, comment } = request.body
    
    const lastOpinion = await Opinion.find().sort({lastId:-1}).limit(1)
    const lastId = lastOpinion[0].lastId + 1
    const opinion = new Opinion({
        lastId,
        userName,
        comment
    });
    await opinion.save()
    result.status(201).json(opinion)
})

router.get('/', async (request, result) => {
    try {
        const opinions = await Opinion.find()
        result.status(200).json(opinions)
    } catch (err) {
        //ошибка сервера
        response.status(500).json({ message: 'Something do wrong. Try again later' })
    }
})

module.exports = router