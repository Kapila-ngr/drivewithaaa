import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLessonsOpen, setIsLessonsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { pathname } = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
    setIsLessonsOpen(false);
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsLessonsOpen(false);
  };

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-xl bg-white/85 border-b border-gray-200 transition-shadow ${isScrolled ? 'shadow-md' : 'shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between py-5 gap-5">
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="/assets/logo-v1.png" 
              alt="Drive with AAA Logo" 
              className="h-28 sm:h-24 lg:h-40 w-auto mt-1" 
              fetchPriority="high"
              loading="eager"
              decoding="async"
              height="160"
            />
          </Link>
          
          <button 
            className="lg:hidden p-2 z-50"
            aria-label="Toggle navigation menu" 
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <div className="w-7 h-0.5 bg-gray-800 relative">
              <span className={`absolute w-7 h-0.5 bg-gray-800 transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'}`}></span>
              <span className={`absolute w-7 h-0.5 bg-gray-800 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`absolute w-7 h-0.5 bg-gray-800 transition-transform duration-300 ${isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'}`}></span>
            </div>
          </button>

          <nav className={`fixed lg:relative top-0 right-0 lg:right-auto h-screen lg:h-auto w-72 lg:w-auto bg-white lg:bg-transparent shadow-2xl lg:shadow-none transition-transform duration-300 lg:transform-none pt-20 lg:pt-0 overflow-y-auto lg:overflow-visible ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} lg:translate-x-0`}>
            <ul className="flex flex-col lg:flex-row items-stretch lg:items-center gap-0 lg:gap-1.5 p-5 lg:p-0">
              <li><Link to="/" className="block py-3.5 px-4 text-gray-700 hover:text-brand hover:bg-brand-light rounded-xl font-medium transition-all">Home</Link></li>
              <li><Link to="/about" className="block py-3.5 px-4 text-gray-700 hover:text-brand hover:bg-brand-light rounded-xl font-medium transition-all">About</Link></li>
              <li className="relative">
                <button 
                  className="w-full lg:w-auto flex items-center justify-between py-3.5 px-4 text-gray-700 hover:text-brand hover:bg-brand-light rounded-xl font-medium transition-all"
                  aria-expanded={isLessonsOpen}
                  onClick={() => setIsLessonsOpen(!isLessonsOpen)}
                >
                  Lessons
                  <span className={`ml-2 text-xs transition-transform ${isLessonsOpen ? 'rotate-180' : ''}`}>▼</span>
                </button>
                <ul className={`lg:absolute lg:top-full lg:left-0 lg:mt-3 bg-white lg:border lg:border-gray-100 lg:rounded-2xl lg:shadow-xl lg:min-w-[200px] p-3 transition-all ${isLessonsOpen ? 'block' : 'hidden'}`}>
                  <li><Link to="/lessons" className="flex items-center py-3 px-4 text-gray-700 hover:text-brand hover:bg-brand-light rounded-lg transition-all text-sm before:content-['→'] before:mr-2.5 before:opacity-0 hover:before:opacity-100 hover:pl-5 before:transition-all">Manual Lessons</Link></li>
                  <li><Link to="/lessons" className="flex items-center py-3 px-4 text-gray-700 hover:text-brand hover:bg-brand-light rounded-lg transition-all text-sm before:content-['→'] before:mr-2.5 before:opacity-0 hover:before:opacity-100 hover:pl-5 before:transition-all">Automatic Lessons</Link></li>
                  <li><Link to="/lessons" className="flex items-center py-3 px-4 text-gray-700 hover:text-brand hover:bg-brand-light rounded-lg transition-all text-sm before:content-['→'] before:mr-2.5 before:opacity-0 hover:before:opacity-100 hover:pl-5 before:transition-all">Intensive Courses</Link></li>
                  <li><Link to="/lessons" className="flex items-center py-3 px-4 text-gray-700 hover:text-brand hover:bg-brand-light rounded-lg transition-all text-sm before:content-['→'] before:mr-2.5 before:opacity-0 hover:before:opacity-100 hover:pl-5 before:transition-all">Advanced Training</Link></li>
                </ul>
              </li>
              <li><Link to="/results" className="block py-3.5 px-4 text-gray-700 hover:text-brand hover:bg-brand-light rounded-xl font-medium transition-all">Results</Link></li>
              <li><Link to="/packages" className="block py-3.5 px-4 text-gray-700 hover:text-brand hover:bg-brand-light rounded-xl font-medium transition-all">Packages</Link></li>
              <li><Link to="/blog" className="block py-3.5 px-4 text-gray-700 hover:text-brand hover:bg-brand-light rounded-xl font-medium transition-all">Blog</Link></li>
              <li className="lg:ml-2 mt-2 lg:mt-0"><Link to="/contact" className="block py-3.5 px-6 bg-gradient-to-br from-brand to-accent text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={closeMenu}></div>
      )}
    </header>
  );
};

export default Header;
