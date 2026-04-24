import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AtomicLab from './pages/AtomicLab';
import ChemicalLab from './pages/ChemicalLab';
import PeriodicTable from './pages/PeriodicTable';
import ElementWiki from './pages/ElementWiki';
import AcidReactions from './pages/AcidReactions';
import PremiumLayout from './layouts/PremiumLayout';
import DisciplineWiki from './pages/DisciplineWiki';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<PremiumLayout />}>
        <Route path="/lab" element={<AtomicLab />} />
        <Route path="/chemist-lab" element={<ChemicalLab />} />
        <Route path="/periodic-table" element={<PeriodicTable />} />
        <Route path="/element/:id" element={<ElementWiki />} />
        <Route path="/acid-reactions" element={<AcidReactions />} />
        <Route path="/discipline/:disciplineId" element={<DisciplineWiki />} />
      </Route>
    </Routes>
  );
}

export default App;
