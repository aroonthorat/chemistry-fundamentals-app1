import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import PremiumLayout from './layouts/PremiumLayout';
import MouseCharacter from './components/MouseCharacter';
import SiteBackground from './components/SiteBackground';

const Home = lazy(() => import('./pages/Home'));
const AtomicLab = lazy(() => import('./pages/AtomicLab'));
const ChemicalLab = lazy(() => import('./pages/ChemicalLab'));
const PeriodicTable = lazy(() => import('./pages/PeriodicTable'));
const ElementWiki = lazy(() => import('./pages/ElementWiki'));
const AcidReactions = lazy(() => import('./pages/AcidReactions'));
const DisciplineWiki = lazy(() => import('./pages/DisciplineWiki'));

const PageLoader = () => (
  <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 border-4 border-cyan-500/20 rounded-full"></div>
      <div className="absolute inset-0 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
    <p className="mt-4 text-cyan-400 font-medium animate-pulse">Loading Environment...</p>
  </div>
);

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      {/* Living chemistry background — fixed behind every route, active through scroll */}
      <SiteBackground />
      {/* Cursor-tracking mascot, shown across every route */}
      <MouseCharacter />
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
    </Suspense>
  );
}

export default App;
