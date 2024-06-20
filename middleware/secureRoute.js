import { secret } from "../config/environment.js"
import jwt from "jsonwebtoken"
import User from "../models/user.js"
import { Unauthorised } from "../lib/errors.js"

export default async function secureRoute(req, res, next) {
    try {
        const rawToken = req.headers.authorization
        
        if (!rawToken || rawToken === 'Bearer null') throw new Unauthorised()

        const token = rawToken.replace('Bearer ', '')

        const payload = jwt.verify(token, secret)

        const user = await User.findById(payload.userId)

        if (!user) throw new Unauthorised()
        
        res.locals.currentUser = user

        next()
    } catch (err) {
        next(err)
    }
}