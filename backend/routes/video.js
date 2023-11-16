import express from 'express'
import database from '../database/database.js'

const video = express.Router()

// upload new video
video.post('/upload-video', (req, res) => {
  const { concept, url, userId } = req.body
  const query = 'INSERT INTO videos(concept, url, userID) values (?,?,?);'

  database.query(query, [concept, url, userId], (err, result) => {
    if (err) {
      console.error(err)
      res.status(500).json({ message: `Error while uploading video ${result}` })
      return
    }

    res.status(200).send({ message: 'New video uploaded correctly' })
  })
})

export default video
