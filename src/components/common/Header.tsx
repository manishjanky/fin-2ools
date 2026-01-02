import { useNavigate } from 'react-router';
import Back from './Back';

export default function Header() {
  const navigate = useNavigate();

  return (
    <> <header className="border-b border-purple-500/30 backdrop-blur-md bg-slate-900/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 hover:opacity-80 transition"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-2xl">₹</span>
            </div>
            <h1 className="text-lg font-bold text-white">fin-2ools</h1>
          </button>
          <nav className="hidden md:flex space-x-8">
            {/* <button
              onClick={() => navigate('/')}
              className="text-purple-200 hover:text-white transition"
            >
              Home
            </button>
            <a href="#features" className="text-purple-200 hover:text-white transition">
              Features
            </a> */}
            <a href="#contact" className="text-purple-200 hover:text-white transition">
              Contact
            </a>
          </nav>
          <button className="md:hidden text-purple-200 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
        <Back navigate={navigate} />

      </div>
    </>


  );
}
