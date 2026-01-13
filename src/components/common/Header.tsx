import { useNavigate } from 'react-router';
import Back from './Back';

export default function Header() {
  const navigate = useNavigate();

  return (
    <>
      <header
        className="border-b backdrop-blur-md sticky top-0 z-50"
        style={{
          backgroundColor: 'var(--color-bg-primary)',
          borderColor: 'var(--color-border-main)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 hover:opacity-80 transition"
              style={{
                backgroundColor: 'transparent'
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{
                  background: 'var(--color-primary-main)',
                }}
              >
                <span
                  className="font-bold text-2xl"
                  style={{ color: 'var(--color-text-inverse)' }}
                >
                  ₹
                </span>
              </div>
              <h1
                className="text-lg font-bold"
                style={{ color: 'var(--color-text-primary)' }}
              >
                fin-2ools
              </h1>
            </button>

            <nav className="hidden md:flex space-x-8">
              <a
                href="#contact"
                className="transition"
                style={{
                  color: 'var(--color-text-secondary)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-text-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--color-text-secondary)';
                }}
              >
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 pt-2">
        <Back navigate={navigate} />
      </div>
    </>
  );
}
