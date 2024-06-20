import express from 'express'
import Monster from '../models/monster.js'
import secureRoute from '../middleware/secureRoute.js'
import { NotFound, AlreadyExists, Unauthorised, FieldsMissing } from '../lib/errors.js'

const router = express.Router()

router.get('/monsters', async function monstersIndex(req, res, next) {
  try {
    const monsters = await Monster.find();
    if (!monsters) throw new NotFound()
    return res.status(200).json(monsters);
  } catch (err) {
      next(err)
  }
})

router.get('/monsters/:monsterName', secureRoute, async function monstersShow(req, res, next) {
  try {
    const monster = await Monster.findOne({name: req.params.monsterName});
    if (!monster) throw new NotFound()
    return res.status(200).json(monster);
  } catch (err) {
    next(err)
  }
})

router.post('/monsters', secureRoute, async function monsterNew(req, res, next) {
  try {
    if (res.locals.currentUser.isAdmin) {
      if (req.body.name === '' || req.body.description === '' || req.body.type === '' || req.body.images === '') throw new FieldsMissing()
      const existingMonster = await Monster.findOne({ name: req.body.name });
      if (existingMonster) throw new AlreadyExists()
      const newMonster = await Monster.create(req.body);
      return res.status(201).json(newMonster);

    } else {
      throw new Unauthorised()
    }
  } catch (err) {
    next(err)
  }
})

router.put('/monsters/:monsterName', secureRoute, async function monsterEdit(req, res, next) {
  try {
    if (res.locals.currentUser.isAdmin) {
      if (req.body.name === '' || req.body.description === '' || req.body.type === '' || req.body.images === '') throw new FieldsMissing()
      const monsterToUpdate = await Monster.findOne({name: req.params.monsterName});
      if (!monsterToUpdate) throw new NotFound()
      Object.assign(monsterToUpdate, req.body);
      await monsterToUpdate.save();
      return res.status(202).json(monsterToUpdate);

    } else {
      throw new Unauthorised()
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/monsters/:monsterName', secureRoute, async function monsterDelete(req, res, next) {
  try {
    if (res.locals.currentUser.isAdmin) {
      const monsterToDelete = await Monster.findOne({name: req.params.monsterName});
      if (!monsterToDelete) throw new NotFound()
      await monsterToDelete.deleteOne();
      return res.sendStatus(204);

    } else {
      throw new Unauthorised()
    }
  } catch (err) {
    next(err)
  }
})

export default router