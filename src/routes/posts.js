const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Post = require('../models/Post');

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: './src/public/images/',
    filename: function(req, file, cb) {
        cb(null, 'post-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single('image');

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.render('posts/index', { posts });
    } catch (err) {
        req.flash('error_msg', 'Error loading posts');
        res.redirect('/');
    }
});

// Show create post form
router.get('/new', (req, res) => {
    res.render('posts/new');
});

// Create new post
router.post('/', async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            req.flash('error_msg', err);
            return res.redirect('/posts/new');
        }

        try {
            const newPost = new Post({
                title: req.body.title,
                content: req.body.content,
                imageUrl: req.file ? `/images/${req.file.filename}` : null
            });

            await newPost.save();
            req.flash('success_msg', 'Post created successfully');
            res.redirect('/');
        } catch (err) {
            req.flash('error_msg', 'Error creating post');
            res.redirect('/posts/new');
        }
    });
});

// Show single post
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            req.flash('error_msg', 'Post not found');
            return res.redirect('/');
        }
        res.render('posts/show', { post });
    } catch (err) {
        req.flash('error_msg', 'Error loading post');
        res.redirect('/');
    }
});

// Show edit form
router.get('/:id/edit', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            req.flash('error_msg', 'Post not found');
            return res.redirect('/');
        }
        res.render('posts/edit', { post });
    } catch (err) {
        req.flash('error_msg', 'Error loading post');
        res.redirect('/');
    }
});

// Update post
router.put('/:id', async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            req.flash('error_msg', err);
            return res.redirect(`/posts/${req.params.id}/edit`);
        }

        try {
            const post = await Post.findById(req.params.id);
            if (!post) {
                req.flash('error_msg', 'Post not found');
                return res.redirect('/');
            }

            post.title = req.body.title;
            post.content = req.body.content;
            if (req.file) {
                post.imageUrl = `/images/${req.file.filename}`;
            }

            await post.save();
            req.flash('success_msg', 'Post updated successfully');
            res.redirect(`/posts/${req.params.id}`);
        } catch (err) {
            req.flash('error_msg', 'Error updating post');
            res.redirect(`/posts/${req.params.id}/edit`);
        }
    });
});

// Delete post
router.delete('/:id', async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        req.flash('success_msg', 'Post deleted successfully');
        res.redirect('/');
    } catch (err) {
        req.flash('error_msg', 'Error deleting post');
        res.redirect('/');
    }
});

module.exports = router;
