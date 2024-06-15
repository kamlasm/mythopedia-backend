import express from 'express'
import bcrypt from 'bcrypt'
import User from '../models/user.js'
import validator from 'email-validator'
import jwt from 'jsonwebtoken'
import { secret } from '../config/environment.js'

const router = express.Router()

router.post('/sign-up', async (req, res, next) => {
    try {
        if (!validator.validate(req.body.email)) {
            throw new Error('Email not valid')
        }
        
        const usernameinDb = await User.findOne({ username: req.body.username })
        const emailinDb = await User.findOne({ email: req.body.email })
        if (usernameinDb || emailinDb) {
            throw new Error('Email or username already taken')
        }

        if (req.body.password !== req.body.passwordConfirmation) {
            throw new Error('Passwords do not match')
        }

        // const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

        // if (!passwordRegex.test(req.body.password)) {
        //     throw new PasswordNotValid()
        // }

        const passwordHash = bcrypt.hashSync(req.body.password, 10)
        req.body.password = passwordHash

        const user = await User.create(req.body)
        
        return res.status(201).json({
            message: `Welcome ${user.username}`
        })

    } catch (err) {
        res.send(err.message)
    }    
})

router.post('/login', async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        
        if (!user) {
            throw new Error('Unauthorised')
        }

        const passwordsMatch = await bcrypt.compare(
            req.body.password,
            user.password
        )
        if (!passwordsMatch) {
            throw new Error('Unauthorised')
        }

        const token = jwt.sign(
            {
                username: user.username,
                userId: user._id,
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
        res.send(err.message)
    }   
})

export default router