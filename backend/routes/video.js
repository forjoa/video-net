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

// home
video.post('/home', (req, res) => {
  const { id } = req.body
  const query =
    'SELECT * FROM videos WHERE userID = ' +
    Number(id) +
    ' OR userID IN (SELECT followed FROM followers WHERE follower = ' +
    Number(id) +
    ') ORDER BY created_at DESC;'

  database.query(query, [id], (err, result) => {
    if (err) {
      console.error(err)
      res.status(500).json({ message: `Error looking for videos ${result}` })
      return
    }

    res.json(result)
  })
})

export default video
