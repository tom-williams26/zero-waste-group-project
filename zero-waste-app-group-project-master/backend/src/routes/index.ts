import * as express from 'express'
const router = express.Router()
import businesses from './businesses'
import locationMarkers from './locationMarkers'
import reviews from './reviews'
import userLogin from './userLogin'
import userSignup from './userSignup'
// Code runs when a client sends a HTTP requests to this server. Related functions are stored in their own file in the 'routes' folder. These modules/files will be required here in this module to use in each request listeners callback function.

// all routes for a business is stored in this routes file
router.use('/businesses', businesses)
router.use('/locationMarkers', locationMarkers)
router.use('/reviews', reviews)
router.use('/signup', userSignup)
router.use('/login', userLogin)

// Safety route in case no other endpoint meets the url requested from the client
router.get('/*', (req, res) => {
    res.statusCode = 404
    res.json('I am sorry but the resource requested was not found.')
})

export default router
