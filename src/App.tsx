import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AtomicLab from './pages/AtomicLab';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/lab" element={<AtomicLab />} />
    </Routes>
  );
}

export default App;
