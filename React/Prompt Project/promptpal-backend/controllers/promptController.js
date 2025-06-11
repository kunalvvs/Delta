const Prompt = require('../models/Prompt');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

exports.analyzePrompt = async (req, res) => {
  const { text } = req.body;

  try {
    const result = await model.generateContent(`Analyze the following prompt and return:
1. Power Score (1-10)
2. Suggestions to improve it
3. A rewritten version of the prompt

Prompt: "${text}"`);

    const reply = result.response.text();

    const scoreMatch = reply.match(/Power Score.*?(\d+)/i);
    const score = scoreMatch ? parseInt(scoreMatch[1]) : 5;

    const prompt = new Prompt({
      text,
      score,
      suggestions: reply,
      rewrite: reply, // Can parse more if needed
    });

    await prompt.save();
    res.json(prompt);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Gemini analysis failed' });
  }
};



// ✅ Existing: analyzePrompt
exports.analyzePrompt = async (req, res) => {
  const { text } = req.body;
  try {
    // ... your existing logic
  } catch (err) {
    res.status(500).json({ error: 'Analysis failed' });
  }
};

// ✅ Add this: getPromptHistory (missing before!)
exports.getPromptHistory = async (req, res) => {
  try {
    const prompts = await Prompt.find().sort({ createdAt: -1 });
    res.json(prompts);
  } catch (err) {
    res.status(500).json({ error: 'Fetching history failed' });
  }
};
