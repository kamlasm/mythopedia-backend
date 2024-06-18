import express from 'express'
import Character from '../models/character.js'
import secureRoute from '../middleware/secureRoute.js'
import { NotFound, AlreadyExists, Unauthorised } from '../lib/errors.js'

const router = express.Router()

router.get('/characters', async function characterIndex(req, res, next) {
  try {
    // throw new NotFound()
    const characters = await Character.find();
    
    if (!characters) throw new NotFound()
    return res.status(200).json(characters);
  } catch (err) {
      next(err)
  }
})

router.get('/characters/:characterId', async function characterShow(req, res, next) {
  try {
    const character = await Character.findById(req.params.characterId);
    if (!character) throw new NotFound()
    return res.status(200).json(character);
  } catch (err) {
    next(err)
  }
})

router.post('/characters', secureRoute, async function characterNew(req, res, next) {
  try {
    if (res.locals.currentUser.isAdmin) {
      const existingCharacter = await Character.findOne({ name: req.body.name });
      if (existingCharacter) throw new AlreadyExists()
      const newCharacter = await Character.create(req.body);
      return res.status(201).json(newCharacter);

    } else {
      throw new Unauthorised()
    }
  } catch (err) {
    next(err)
  }
})

router.put('/characters/:characterId', secureRoute, async function characterEdit(req, res, next) {
  try {
    if (res.locals.currentUser.isAdmin) {
      const characterToUpdate = await Character.findById(req.params.characterId);
      if (!characterToUpdate) throw new NotFound()
      Object.assign(characterToUpdate, req.body);
      await characterToUpdate.save();
      return res.status(202).json(characterToUpdate);

    } else {
      throw new Unauthorised()
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/characters/:characterId', secureRoute, async function characterDelete(req, res, next) {
  try {
    if (res.locals.currentUser.isAdmin) {
      const characterToDelete = await Character.findById(req.params.characterId);
      if (!characterToDelete) throw new NotFound()
      await characterToDelete.deleteOne();
      return res.sendStatus(204);

    } else {
      throw new Unauthorised()
    }
  } catch (err) {
    next(err)
  }
})

export default router