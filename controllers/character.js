import express from 'express'
import Character from '../models/character.js'
import secureRoute from '../middleware/secureRoute.js'
import { NotFound, AlreadyExists, Unauthorised, FieldsMissing } from '../lib/errors.js'

const router = express.Router()

router.get('/characters', async function characterIndex(req, res, next) {
  try {
    const characters = await Character.find();
    if (!characters) throw new NotFound()
    return res.status(200).json(characters);
  } catch (err) {
      next(err)
  }
})

router.get('/characters/:characterName', async function characterShow(req, res, next) {
  try {
    const character = await Character.findOne({name: req.params.characterName});
    if (!character) throw new NotFound()
    return res.status(200).json(character);
  } catch (err) {
    next(err)
  }
})

router.post('/characters', secureRoute, async function characterNew(req, res, next) {
  try {
    if (res.locals.currentUser.isAdmin) {
      if (req.body.name === '' || req.body.description === '' || req.body.type === '' || req.body.images === '') throw new FieldsMissing()
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

router.put('/characters/:characterName', secureRoute, async function characterEdit(req, res, next) {
  try {
    if (res.locals.currentUser.isAdmin) {
      if (req.body.name === '' || req.body.description === '' || req.body.type === '' || req.body.images === '') throw new FieldsMissing()
      const characterToUpdate = await Character.findOne({name: req.params.characterName});
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

router.delete('/characters/:characterName', secureRoute, async function characterDelete(req, res, next) {
  try {
    if (res.locals.currentUser.isAdmin) {
      const characterToDelete = await Character.findOne({name: req.params.characterName});
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