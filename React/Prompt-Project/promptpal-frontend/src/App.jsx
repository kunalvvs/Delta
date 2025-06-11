import PromptForm from './components/PromptForm';
import PromptHistory from './components/PromptHistory';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🧠 PromptPal – AI Prompt Optimizer</h1>
      <PromptForm />
      <PromptHistory />
    </div>
  );
}

export default App;
