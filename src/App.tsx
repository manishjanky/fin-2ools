 import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router';
import './App.css';
import router from './app-router';
import PageLoader from './components/common/PageLoader';

function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);


  return (
    <>
      <RouterProvider router={router} />
      {!mounted && <PageLoader />}
    </>
  );
}

export default App;
