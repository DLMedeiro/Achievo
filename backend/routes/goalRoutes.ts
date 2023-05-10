import * as express from "express";
// was not able to add const express... b/c already called on server.ts, this import method works and clears error

const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json({message: 'Get goals'})
})
router.post('/', (req, res) => {
    res.status(200).json({message: 'Set goals'})
})
router.put('/:id', (req, res) => {
    res.status(200).json({message: `Update goal: ${req.params.id}`})
})
router.delete('/:id', (req, res) => {
    res.status(200).json({message: `Delete goal: ${req.params.id}`})
})

module.exports = router