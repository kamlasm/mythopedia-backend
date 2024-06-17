import express from 'express'
import Character from '../models/character.js'
import secureRoute from '../middleware/secureRoute.js'

const router = express.Router()

router.get('/characters', async function characterIndex(req, res, next) {
  try {
    const characters = await Character.find();
    return res.status(200).json(characters);
  } catch (err) {
    console.log(err)
  }
})

router.get('/characters/:characterId', async function characterShow(req, res, next) {
  try {
    const character = await Character.findById(req.params.characterId);
    return res.status(200).json(character);
  } catch (err) {
    console.log(err)
  }
})

router.post('/characters', secureRoute, async function characterNew(req, res, next) {
  try {
    if (res.locals.currentUser.isAdmin) {
      const existingCharacter = await Character.findOne({ name: req.body.name });
      if (existingCharacter) throw new Error('Already exists');
      const newCharacter = await Character.create(req.body);
      return res.status(201).json(newCharacter);
      
    } else {
      throw new Error('Unauthorised');
    }
  } catch (err) {
    console.log(err)
    next(err)
  }
})

router.put('/characters/:characterId', secureRoute, async function characterEdit(req, res, next) {
  try {
    if (res.locals.currentUser.isAdmin) {
      const characterToUpdate = await Character.findById(req.params.characterId);
      Object.assign(characterToUpdate, req.body);
      await characterToUpdate.save();
      return res.status(202).json(characterToUpdate);

    } else {
      throw new Error('Unauthorised')
    }
  } catch (err) {
    console.log(err)
    next(err)
  }
})

router.delete('/characters/:characterId', secureRoute, async function characterDelete(req, res, next) {
  try {
    if (res.locals.currentUser.isAdmin) {
      const characterToDelete = await Character.findById(req.params.characterId);
      await characterToDelete.deleteOne();
      return res.sendStatus(204);
    
    } else {
      throw new Error('Unauthorised');
    }
  } catch (err) {
    console.log(err)
    next(err)
  }
})

export default router