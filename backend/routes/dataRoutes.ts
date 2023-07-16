import * as express from "express";
// was not able to add const express... b/c already called on server.ts, this import method works and clears error

const router = express.Router()

import dC from '../controllers/dataController.ts'


router.get('/', dC.ping)


// module.exports = router
export default router