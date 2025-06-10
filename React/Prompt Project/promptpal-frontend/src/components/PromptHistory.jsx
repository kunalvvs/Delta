import { useEffect, useState } from 'react';
import axios from 'axios';

const PromptHistory = () => {
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/prompts/history');
      setHistory(res.data);
    } catch (err) {
      console.error('Failed to fetch history');
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">📜 Past Prompts</h2>
      {history.map((item, index) => (
        <div key={index} className="border-b py-2 mb-2">
          <p><strong>Prompt:</strong> {item.text}</p>
          <p><strong>Score:</strong> {item.score}</p>
          <pre className="text-sm bg-gray-100 p-2 rounded">{item.suggestions}</pre>
        </div>
      ))}
    </div>
  );
};

export default PromptHistory;
