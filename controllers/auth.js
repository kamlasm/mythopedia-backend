import express from 'express'
import bcrypt from 'bcrypt'
import User from '../models/user.js'
import validator from 'email-validator'
import jwt from 'jsonwebtoken'
import { secret } from '../config/environment.js'
import { EmailNotValid, UsernameOrEmailExists, Unauthorised, PasswordsNotMatching, UserInfoMissing } from '../lib/errors.js'

const router = express.Router()

router.post('/sign-up', async (req, res, next) => {
    try {
        if (req.body.password === '' || req.body.username === '') {
            throw new UserInfoMissing()
        }
        
        if (!validator.validate(req.body.email)) {
            throw new EmailNotValid()
        }
        
        const usernameinDb = await User.findOne({ username: req.body.username })
        const emailinDb = await User.findOne({ email: req.body.email })
        if (usernameinDb || emailinDb) {
            throw new UsernameOrEmailExists()
        }

        if (req.body.password !== req.body.passwordConfirmation) {
            throw new PasswordsNotMatching()
        }

        const passwordHash = bcrypt.hashSync(req.body.password, 10)
        req.body.password = passwordHash

        const user = await User.create(req.body)

        const token = jwt.sign(
            {
                username: user.username,
                userId: user._id,
                userIsAdmin: user.isAdmin,
            }, 
            secret, 
            {
                expiresIn: '7 days' 
            }
        )

        return res.status(201).json({
            message: `Welcome ${user.username}`,
            token
        })

    } catch (err) {
        next(err)
    }    
})

router.post('/login', async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        
        if (!user) {
            throw new Unauthorised()
        }

        const passwordsMatch = await bcrypt.compare(
            req.body.password,
            user.password
        )
        if (!passwordsMatch) {
            throw new Unauthorised()
        }

        const token = jwt.sign(
            {
                username: user.username,
                userId: user._id,
                userIsAdmin: user.isAdmin,
            }, 
            secret, 
            {
                expiresIn: '7 days' 
            }
        )

        res.send({
            message: "Welcome back!",
            token,
        })

    } catch (err) {
        next(err)
    }   
})

export default router