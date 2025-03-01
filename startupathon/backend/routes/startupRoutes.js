const express = require('express');
const Startup = require('../models/Startup');

const router = express.Router();

// Create a new startup
router.post('/', async (req, res) => {
    const { name, description, website } = req.body;
    const newStartup = new Startup({ name, description, website });
    try {
        const savedStartup = await newStartup.save();
        res.status(201).json(savedStartup);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get all startups
router.get('/', async (req, res) => {
    try {
        const startups = await Startup.find();
        res.status(200).json(startups);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update a startup
router.put('/:id', async (req, res) => {
    try {
        const updatedStartup = await Startup.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedStartup);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete a startup
router.delete('/:id', async (req, res) => {
    try {
        await Startup.findByIdAndDelete(req.params.id);
        res.status(200).json('Startup deleted');
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
