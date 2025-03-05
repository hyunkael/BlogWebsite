const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Home page route
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.render('index', { posts });
    } catch (err) {
        req.flash('error_msg', 'Error loading posts');
        res.redirect('/');
    }
});

module.exports = router;
