import express from 'express'
import User from '../models/user.js'
import secureRoute from '../middleware/secureRoute.js'
import Monster from '../models/monster.js'
import { NotFound } from '../lib/errors.js'

const router = express.Router()
let user

router.get('/your-team', secureRoute, async function getTeam(req, res, next) {
    try {
        user = await User.findById(res.locals.currentUser).populate({
            path: 'gameplay',
            populate: { path: 'team' }
        })
        if (!user) throw new NotFound()
        return res.status(200).json(user);  
    } catch (err) {
        next(err)
    }
})

router.put('/your-team', secureRoute, async function editTeam(req, res, next) {
    try {
        const user = res.locals.currentUser
        if (!user) throw new NotFound()
        const gameplay = user.gameplay

        gameplay.money= req.body.newMoney,
        gameplay.totalStrength= req.body.newStrength,
        gameplay.totalIntelligence= req.body.newIntelligence,
        gameplay.team= req.body.newTeam,
        gameplay.level= req.body.newLevel,

        await user.save()    
        return res.status(200)
    } catch (err) {
        next(err)
    }
})

router.get('/monster', secureRoute, async function getMonster(req, res, next) {
    try {
        const monster = await Monster.findOne({level: user.gameplay.level})
        if (!monster) throw new NotFound()
        return res.status(200).json( monster);  
    } catch (err) {
        next(err)
    }
})

router.put('/game', secureRoute, async function editTeam(req, res, next) {
    try {
        const user = res.locals.currentUser
        if (!user) throw new NotFound()
        const gameplay = user.gameplay

        gameplay.money= req.body.newMoney,
        gameplay.level= req.body.newLevel,

        await user.save()
        return res.status(200)

    } catch (err) {
        next(err)
    }
})

export default router