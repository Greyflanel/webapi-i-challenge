const express = require('express');
const db = require('./data/db');

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    db.find()
    .then(user => {
        res.status(200).json(user)
    })
    .catch(error => {
        res.status(500).json({ success: false, error})
    })
})

server.get('/:id', (req, res) => {
    const { id } = req.params
    db.findById(id)
    .then(userId => {
        res.status(200).json(userId)
    })
    .catch(error => {
        res.status(500).json({ success: false, error })
    })
}) 

server.post('/', (req, res) => {
    const newUser = req.body
    db.insert(newUser)
    .then(newUser => {
        res.status(201).json(newUser)
    })
    .catch(error => {
        res.status(500).json({ success: false, error })
    })
})

server.delete('/:id', (req, res) => {
    const { id } = req.params
    db.remove(id)
    .then(removedUser => {
        res.status(200).json(removedUser)
    })
    .catch(error => {
        res.status(500).json({ success: false, error })
    })
})

server.put('/:id', (req, res) => {
    const { id } = req.params
    const changes = req.body
    db.update(id, changes) 
    .then(updatedUser => {
        res.status(201).json(updatedUser)
    })
    .catch(error => {
        res.status(500).json({ success: false, error})
    })
})

const port = 4000;
server.listen(port, () => {
console.log(`Server listening on Port ${port}`);
})