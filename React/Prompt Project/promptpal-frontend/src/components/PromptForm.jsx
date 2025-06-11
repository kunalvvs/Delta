import { useState } from 'react';
import axios from 'axios';

const PromptForm = () => {
  const [text, setText] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

const handleSubmit = async () => {
  if (!text.trim()) return;
  setLoading(true);
  try {
    const res = await axios.post('http://localhost:5000/api/prompts/analyze', { text });
    setResponse(res.data);
  } catch (err) {
    console.error('Error:', err.message);
    alert('Failed to connect to the server. Please try again later.');
  }
  setLoading(false);
};

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-8">
      <textarea
        className="w-full p-3 border rounded mb-4"
        rows="4"
        placeholder="Enter your prompt here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Analyzing...' : 'Analyze Prompt'}
      </button>

      {response && (
        <div className="mt-6">
          <h3 className="font-bold text-lg mb-1">AI Feedback:</h3>
          <p><strong>Score:</strong> {response.score}</p>
          <p><strong>Suggestions:</strong></p>
          <pre className="bg-gray-100 p-2 rounded">{response.suggestions}</pre>
        </div>
      )}
    </div>
  );
};

export default PromptForm;
