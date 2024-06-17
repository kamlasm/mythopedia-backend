import express from 'express'
import User from '../models/user.js'
import secureRoute from '../middleware/secureRoute.js'

const router = express.Router()

router.put('/your-team', secureRoute, async function editTeam(req, res) {
    try {
        const user = res.locals.currentUser
        console.log(req.body)

    } catch (err) {

    }
})

export default router