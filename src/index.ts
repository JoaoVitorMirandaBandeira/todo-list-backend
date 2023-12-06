import express from 'express'
import 'dotenv/config'
import router from './router/router'
import connection from './configs/connection'
import { AddressInfo } from 'net'

const app = express()

app.use(express.json())
app.use(router)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running port ${PORT}`)
})