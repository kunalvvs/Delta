const express = require('express');
const router = express.Router();

// ✅ Make sure you export actual functions from the controller
const { analyzePrompt, getPromptHistory } = require('../controllers/promptController');

// ✅ These must be valid functions
router.post('/analyze', analyzePrompt);
router.get('/history', getPromptHistory);

module.exports = router;
