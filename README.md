# fin-2ools

This application provides your with some financial tools that help you with your day to financial needs.


import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import Home from './pages/Home';
import SchemeDetails from './pages/mutual-funds/SchemeDetails';
import './App.css';
import PageLoader from './components/common/PageLoader';
import Footer from './components/common/Footer';

// Lazy load FD and Mutual Funds pages for code splitting
const FD = lazy(() => import('./pages/fd/FD'));
const MutualFunds = lazy(() => import('./pages/mutual-funds/MutualFunds'));
const MyFunds = lazy(() => import('./pages/mutual-funds/MyFunds'));
const MyFundDetails = lazy(() => import('./pages/mutual-funds/MyFundDetails'));
function App() {
  return (
    <>
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
          <Route path="/mutual-funds/my-funds" element={
            <Suspense fallback={<PageLoader />}>
              <MyFunds />
            </Suspense>} />
          <Route path="/mutual-funds/my-funds/scheme/:schemeCode" element={
            <Suspense fallback={<PageLoader />}>
              <MyFundDetails />
            </Suspense>}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      <Footer />
    </>

  );
}

export default App;
