const router = require('express').Router()

const{getReposNumber} =require('../app/controllers/reposController')

const{repoInfoExists} =require('../app/middlewares/reposMiddleware')

// Cach Middleware
router.use('/:username',repoInfoExists)

router.get('/:username',getReposNumber)

module.exports = router