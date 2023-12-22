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
  const query = `
    SELECT videos.*, users.username AS uploader_name, users.id AS uploader_id 
    FROM videos
    INNER JOIN users ON videos.userID = users.id
    WHERE videos.userID = ${Number(id)}
       OR videos.userID IN (SELECT followed FROM followers WHERE follower = ${Number(
         id
       )})
    ORDER BY videos.created_at DESC;
  `

  database.query(query, [id], (err, result) => {
    if (err) {
      console.error(err)
      res.status(500).json({ message: `Error looking for videos ${result}` })
      return
    }

    res.json(result)
  })
})

// get user videos
video.get('/user/:userId', (req, res) => {
  const userId = parseInt(req.params.userId)
  const query = 'SELECT * FROM videos WHERE userID = ?'

  database.query(query, userId, (err, result) => {
    if (err) {
      console.error(err)
      res.status(500).send({ message: 'Error while looking for user videos' })
      return
    }

    res.json(result)
  })
})

// get my videos
video.post('/my-videos', (req, res) => {
  const { id } = req.body
  const query = 'SELECT * FROM videos WHERE userID = ?'

  database.query(query, [id], (err, result) => {
    if (err) {
      console.error(err)
      res
        .status(500)
        .send({ message: 'Error while looking for my videos. ' + err })
      return
    }

    res.json(result)
  })
})

export default video
