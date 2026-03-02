import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AtomicLab from './pages/AtomicLab';
import ChemicalLab from './pages/ChemicalLab';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/lab" element={<AtomicLab />} />
      <Route path="/chemist-lab" element={<ChemicalLab />} />
    </Routes>
  );
}

export default App;
