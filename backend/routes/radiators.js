const express = require('express')
const {
    getRadiators,
    getRadiator,
    createRadiator,
    updateRadiator,
    deleteRadiator,
    checkoutSession
} = require('../controllers/radiatorController')
const upload = require('../middleware/imageMiddleware')

const router = express.Router()

router.get('/', getRadiators)

router.get('/:id', getRadiator)

router.post('/', upload.single('image'), createRadiator)

// router.post('/', createRadiator)

router.post('/checkout-session', checkoutSession)

router.patch('/:id', updateRadiator)

router.delete('/:id', deleteRadiator)

module.exports = router