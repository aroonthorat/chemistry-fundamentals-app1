import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AtomicLab from './pages/AtomicLab';
import ChemicalLab from './pages/ChemicalLab';
import PeriodicTable from './pages/PeriodicTable';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/lab" element={<AtomicLab />} />
      <Route path="/chemist-lab" element={<ChemicalLab />} />
      <Route path="/periodic-table" element={<PeriodicTable />} />
    </Routes>
  );
}

export default App;
