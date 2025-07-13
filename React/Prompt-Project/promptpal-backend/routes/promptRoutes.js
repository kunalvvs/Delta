const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

// ✅ Make sure you export actual functions from the controller
const { analyzePrompt, getPromptHistory } = require('../controllers/promptController');

// ✅ These must be valid functions - now protected with authentication
router.post('/analyze', authMiddleware, analyzePrompt);
router.get('/history', authMiddleware, getPromptHistory);

module.exports = router;
