import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import SchemeDetails from './pages/mutual-funds/SchemeDetails';
import './App.css';

// Lazy load FD and Mutual Funds pages for code splitting
const FD = lazy(() => import('./pages/fd/FD'));
const MutualFunds = lazy(() => import('./pages/mutual-funds/MutualFunds'));

// Loading fallback component
function PageLoader() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
        <p className="text-purple-200">Loading...</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/fd"
          element={
            <Suspense fallback={<PageLoader />}>
              <FD />
            </Suspense>
          }
        />
        <Route
          path="/mutual-funds"
          element={
            <Suspense fallback={<PageLoader />}>
              <MutualFunds />
            </Suspense>
          }
        />
        <Route path="/mutual-funds/scheme/:schemeCode" element={<SchemeDetails />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
