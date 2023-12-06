import express from "express";

const router = express.Router()

router.get('/', () => {console.log("Rota home") })

export default router