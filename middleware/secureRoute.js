import { secret } from "../config/environment.js"
import jwt from "jsonwebtoken"
import User from "../models/user.js"

export default async function secureRoute(req, res, next) {
    try {
        const rawToken = req.headers.authorization
        
        if (!rawToken) throw new Error('Unauthorised')

        const token = rawToken.replace('Bearer ', '')

        const payload = jwt.verify(token, secret)

        const user = await User.findById(payload.userId)

        if (!user) throw new Error('Unauthorised')
        
        res.locals.currentUser = user

        next()
    } catch (err) {
        next(err)
    }
}