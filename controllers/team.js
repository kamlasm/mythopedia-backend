import express from 'express'
import User from '../models/user.js'
import secureRoute from '../middleware/secureRoute.js'

const router = express.Router()

router.get('/your-team', secureRoute, async function getTeam(req, res) {
    try {
        const user = await User.findById(res.locals.currentUser).populate({
            path: 'gameplay',
            populate: { path: 'team' }
        })
        return res.status(200).json(user);  
    } catch (err) {
        console.log(err)
    }
})

router.put('/your-team', secureRoute, async function editTeam(req, res) {
    try {
        const user = res.locals.currentUser
        const gameplay = user.gameplay

        gameplay.money= req.body.newMoney,
        gameplay.totalStrength= req.body.newStrength,
        gameplay.totalIntelligence= req.body.newIntelligence,
        gameplay.team= req.body.newTeam,

        await user.save()    

    } catch (err) {
        console.log(err)
    }
})

export default router