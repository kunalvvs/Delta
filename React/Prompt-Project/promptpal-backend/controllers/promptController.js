const Prompt = require('../models/Prompt');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

exports.analyzePrompt = async (req, res) => {
  const { text } = req.body;

  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'Prompt text is required' });
  }

  try {
    const prompt = `Analyze the following prompt and provide a structured response:

Prompt: "${text}"

Please respond in this exact format:
SCORE: [1-10]
SUGGESTIONS: [Your improvement suggestions]
REWRITE: [Improved version of the prompt]`;

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    // Parse the structured response
    const scoreMatch = reply.match(/SCORE:\s*(\d+)/i);
    const suggestionsMatch = reply.match(/SUGGESTIONS:\s*([\s\S]*?)(?=REWRITE:|$)/i);
    const rewriteMatch = reply.match(/REWRITE:\s*([\s\S]*?)$/i);

    const score = scoreMatch ? parseInt(scoreMatch[1]) : 5;
    const suggestions = suggestionsMatch ? suggestionsMatch[1].trim() : 'No suggestions available';
    const rewrite = rewriteMatch ? rewriteMatch[1].trim() : 'No rewrite available';

    const promptDoc = new Prompt({
      text: text.trim(),
      score,
      suggestions,
      rewrite,
      user: req.userId, // Associate with authenticated user
    });

    await promptDoc.save();
    res.json(promptDoc);
  } catch (err) {
    console.error('Analysis error:', err.message);
    res.status(500).json({ error: 'AI analysis failed. Please try again.' });
  }
};

// ✅ Add this: getPromptHistory (missing before!)
exports.getPromptHistory = async (req, res) => {
  try {
    // Only get prompts for the authenticated user
    const prompts = await Prompt.find({ user: req.userId })
      .sort({ createdAt: -1 })
      .limit(20)
      .populate('user', 'username email');
    res.json(prompts);
  } catch (err) {
    console.error('History fetch error:', err.message);
    res.status(500).json({ error: 'Failed to fetch prompt history' });
  }
};
