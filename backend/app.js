import express from 'express'
import cors from 'cors'

import user from './routes/user.js'
import video from './routes/video.js'

const app = express()
const port = 3000

app.use(cors())
app.use(express.json()) 

app.use('/api/user', user)
app.use('/api/video', video)

app.listen(port, () => {
    console.log(`app listening to port ${port}`)
})