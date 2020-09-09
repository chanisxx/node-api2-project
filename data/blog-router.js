const express = require('express');
const Blogs = require('./db.js');

const router = express.Router();


router.get('/', (req, res) => {
    Blogs.find(req.query)
    .then(blog => {
      res.status(200).json(blog);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({ error: "The posts information could not be retrieved." });
    });
});

router.post('/', (req, res) => {
    Blogs.insert(req.body)
    .then(blog => {
        if(req.body.title && req.body.contents) {
            res.status(201).json(blog);
        } else {
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        }
    })
    .catch(error => {
        console.error(error);
        res.status(500).json({ error: "There was an error while saving the post to the database." });
    });
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    Blogs.update(id, changes)
    .then(blog => {
        if(blog) {
            if(changes.title && changes.contents){
                res.status(200).json(changes);
            } else {
                res.status(400).json({errorMessage: "Please provide title and contents for the post." });
            }
        } else {
            res.status(404).json({message: "The post with the specified ID does not exist."});
        }
    })
    .catch(error =>{
        console.error(error);
        res.status(500).json({ error: "The post information could not be modified." });
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;

    Blogs.findById(id)
    .then(blog => {
        if(blog.length) {
            res.status(200).json(blog);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
    })
    .catch(error => {
        console.error(error);
        res.status(500).json({ error: "The post information could not be retrieved." });
    })
})

router.get('/:id/comments', (req, res) => {
    const id = req.params.id;
    Blogs.findPostComments(id)
    .then(blog => {
        if(blog.length) {
            res.status(200).json(blog);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
    })
    .catch(error => {
        console.error(error);
        res.status(500).json({ error: "The comments information could not be retrieved." });
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    // const obj = req.body;

    const post = 
        Blogs.findById(id)
        .then(post => res.status(200).json(post))
        .catch(error => res.status(500).json(error)
    );

    Blogs.remove(id)
    .then(blog => {
        if(blog) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
    })
    .catch(error => {
        console.error(error);
        res.status(500).json({ error: "The post could not be removed" });
    })
})

router.post('/:id/comments', (req, res) => {
    var comment = req.body;
    comment.post_id = req.params.id;

    Blogs.insertComment(comment)
    .then(blog => {
        if(blog) {
            if(comment.text){
                res.status(201).json(comment);
            } else {
                res.status(400).json({ errorMessage: "Please provide text for the comment." })
            }
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
    })
    .catch(error => {
        console.error(error);
        res.status(500).json({ error: "There was an error while saving the comment to the database" });
    });
});






module.exports = router;