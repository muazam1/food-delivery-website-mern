const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { protect, admin } = require('../middleware/authMiddleware');

// @route   POST api/messages
// @desc    Submit a new contact message
// @access  Public
router.post('/', async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Please provide name, email, and message.' });
    }

    try {
        const newMessage = new Message({
            name,
            email,
            subject,
            message,
        });

        const savedMessage = await newMessage.save();
        res.status(201).json(savedMessage);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   GET api/messages
// @desc    Get all contact messages
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
    try {
        const messages = await Message.find().sort({ date: -1 });
        res.json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   DELETE api/messages/:id
// @desc    Delete a message
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }

        await message.deleteOne();
        res.json({ message: 'Message removed' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
