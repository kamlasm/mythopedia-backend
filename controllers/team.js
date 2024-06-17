import express from 'express'
import User from '../models/user.js'
import secureRoute from '../middleware/secureRoute.js'

const router = express.Router()

router.put('/your-team', secureRoute, async function editTeam(req, res) {
    try {
        const user = res.locals.currentUser
        const gameplay= user.gameplay


        // await User.updateOne({id: user.gameplay._id},
        //     {gameplay:{
        //         money: req.body.money,
        //         totalStrength: req.body.strength,
        //         totalIntelligence: req.body.intelligence, 
        //         team: req.body.team
        //     }}
        // )
        console.log(user);
        gameplay.money= req.body.newMoney,
        gameplay.totalStrength= req.body.newStrength,
        gameplay.totalIntelligence= req.body.newIntelligence,
        gameplay.team= req.body.newTeam,

        console.log("this is the gameplay info", gameplay)

        await user.save()
        console.log(user);
        


    } catch (err) {
        console.log(err)
    }
})

export default router