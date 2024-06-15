import express from 'express'
import Character from '../models/character.js'

const router = express.Router()

router.get('/characters', async function characterIndex(req, res, next) {
    try {
      const characters = await Character.find();
      return res.status(200).json(characters);
    } catch (err) {
      console.log(err)
    }
  })


export default router