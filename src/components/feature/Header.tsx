import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface MenuItem {
  label: string;
  path: string;
}

interface SearchResult {
  text: string;
  element: Element;
  context: string;
}

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { i18n } = useTranslation();

  const currentLang = i18n.language === 'fr' ? 'fr' : 'en';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Focus input when search opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 150);
    }
  }, [searchOpen]);

  // Close search on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        // Don't close if clicking the search toggle button
        const target = e.target as HTMLElement;
        if (target.closest('[data-search-toggle]')) {
          return;
        }
        setSearchOpen(false);
        setSearchQuery('');
        setSearchResults([]);
        setShowResults(false);
      }
    };
    if (searchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (searchOpen) {
          setSearchOpen(false);
          setSearchQuery('');
          setSearchResults([]);
          setShowResults(false);
        }
        if (mobileMenuOpen) {
          setMobileMenuOpen(false);
        }
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [searchOpen, mobileMenuOpen]);

  // Search as user types
  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      const query = searchQuery.toLowerCase().trim();
      const results: SearchResult[] = [];
      const seenTexts = new Set<string>();
      
      const allElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, li, a, td, th, label');
      
      allElements.forEach((element) => {
        if (searchContainerRef.current?.contains(element)) return;
        if (element.closest('header')) return;
        if (element.closest('[data-search-overlay]')) return;
        
        const text = element.textContent?.trim() || '';
        const lowerText = text.toLowerCase();
        
        if (lowerText.includes(query) && text.length > 10 && text.length < 300) {
          const uniqueKey = text.substring(0, 100);
          if (!seenTexts.has(uniqueKey)) {
            seenTexts.add(uniqueKey);
            
            const matchIndex = lowerText.indexOf(query);
            const start = Math.max(0, matchIndex - 30);
            const end = Math.min(text.length, matchIndex + query.length + 50);
            let context = text.substring(start, end);
            if (start > 0) context = '...' + context;
            if (end < text.length) context = context + '...';
            
            results.push({
              text: text,
              element: element,
              context: context,
            });
          }
        }
      });
      
      setSearchResults(results.slice(0, 8));
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [searchQuery]);

  const menuItems: MenuItem[] = [
    { label: 'Home', path: '/' },
    { label: 'Company', path: '/company/corporate-overview' },
    { label: 'Products', path: '/products/copper-blister' },
    { label: 'Sustainability', path: '/sustainability/hse' },
    { label: 'CSR', path: '/csr/social-initiatives' },
    { label: 'Media', path: '/media' },
    { label: 'Jobs', path: '/jobs' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Resources Center', path: '/resources/statistics-report' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleResultClick = (result: SearchResult) => {
    result.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    const originalBg = (result.element as HTMLElement).style.backgroundColor;
    const originalTransition = (result.element as HTMLElement).style.transition;
    (result.element as HTMLElement).style.transition = 'background-color 0.3s ease';
    (result.element as HTMLElement).style.backgroundColor = '#FEE2E2';
    
    setTimeout(() => {
      (result.element as HTMLElement).style.backgroundColor = originalBg;
      setTimeout(() => {
        (result.element as HTMLElement).style.transition = originalTransition;
      }, 300);
    }, 2000);
    
    setSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
  };

  const highlightMatch = (text: string, query: string) => {
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const matchIndex = lowerText.indexOf(lowerQuery);
    
    if (matchIndex === -1) return text;
    
    const before = text.substring(0, matchIndex);
    const match = text.substring(matchIndex, matchIndex + query.length);
    const after = text.substring(matchIndex + query.length);
    
    return (
      <>
        {before}
        <span className="bg-[#FEE2E2] text-[#DC2626] font-semibold">{match}</span>
        {after}
      </>
    );
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center space-x-2 sm:space-x-3 cursor-pointer">
              <img
                src="https://static.readdy.ai/image/1b404af276821d98dfecb0eec592fbd4/2beca25c2dca50fd1a3109512ef52e33.png"
                alt="Company Logo"
                className="h-10 sm:h-12 w-auto"
              />
              <span className={`text-base sm:text-xl font-bold tracking-wide ${isScrolled ? 'text-[#2C3E50]' : 'text-white'}`}>
                RUBAMIN SARL
              </span>
            </Link>

            {/* Desktop Navigation Menu */}
            <nav className="hidden xl:flex items-center space-x-6 flex-1 justify-center">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`text-sm font-medium transition-colors duration-200 whitespace-nowrap cursor-pointer py-6 block ${
                    isScrolled ? 'text-[#2C3E50] hover:text-[#DC2626]' : 'text-white hover:text-[#DC2626]'
                  } ${item.path === '/' ? (location.pathname === '/' ? 'text-[#DC2626]' : '') : (location.pathname.startsWith(item.path) ? 'text-[#DC2626]' : '')}`}
                >
                  {item.label === 'Home' ? (
                    <i className="ri-home-4-line text-lg"></i>
                  ) : item.label === 'Webmail' ? (
                    <span className="flex items-center gap-1.5">
                      <i className="ri-mail-line text-base"></i>
                      {item.label}
                    </span>
                  ) : (
                    item.label
                  )}
                </Link>
              ))}
            </nav>

            {/* Right Side Controls */}
            <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
              {/* Webmail Link */}
              <Link
                to="/webmail"
                className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isScrolled
                    ? 'text-[#2C3E50] hover:text-[#DC2626] hover:bg-gray-100'
                    : 'text-white hover:text-white hover:bg-white/20'
                } ${location.pathname === '/webmail' ? 'text-[#DC2626]' : ''}`}
              >
                <i className="ri-mail-line text-base"></i>
                <span>Webmail</span>
              </Link>

              {/* Language Toggle - Hidden on very small screens */}
              <div 
                className={`hidden sm:flex items-center p-1 rounded-full transition-all ${
                  isScrolled 
                    ? 'bg-gray-100' 
                    : 'bg-white/20 backdrop-blur-sm'
                }`}
              >
                <button
                  onClick={() => i18n.changeLanguage('en')}
                  className={`px-3 sm:px-4 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer whitespace-nowrap ${
                    currentLang === 'en'
                      ? 'bg-white text-[#2C3E50] shadow-sm'
                      : isScrolled 
                        ? 'text-[#6C757D] hover:text-[#2C3E50]' 
                        : 'text-white/80 hover:text-white'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => i18n.changeLanguage('fr')}
                  className={`px-3 sm:px-4 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer whitespace-nowrap ${
                    currentLang === 'fr'
                      ? 'bg-white text-[#2C3E50] shadow-sm'
                      : isScrolled 
                        ? 'text-[#6C757D] hover:text-[#2C3E50]' 
                        : 'text-white/80 hover:text-white'
                  }`}
                >
                  FR
                </button>
              </div>

              {/* Search Icon Button - Desktop */}
              <button
                type="button"
                data-search-toggle
                onClick={(e) => {
                  e.stopPropagation();
                  if (searchOpen) {
                    // Close and clear everything
                    setSearchOpen(false);
                    setSearchQuery('');
                    setSearchResults([]);
                    setShowResults(false);
                  } else {
                    // Open search
                    setSearchOpen(true);
                  }
                }}
                className={`hidden sm:flex w-9 h-9 items-center justify-center rounded-full transition-all cursor-pointer flex-shrink-0 ${
                  searchOpen
                    ? 'bg-[#DC2626] text-white'
                    : isScrolled
                      ? 'text-[#2C3E50] hover:bg-gray-100'
                      : 'text-white hover:bg-white/20'
                }`}
              >
                <i className={`${searchOpen ? 'ri-close-line' : 'ri-search-line'} text-base`}></i>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`xl:hidden w-10 h-10 flex items-center justify-center rounded-lg transition-all cursor-pointer ${
                  isScrolled
                    ? 'text-[#2C3E50] hover:bg-gray-100'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                <i className={`${mobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-2xl`}></i>
              </button>
            </div>
          </div>
        </div>

        {/* Search Overlay - Drops down below header */}
        <div
          ref={searchContainerRef}
          data-search-overlay
          className={`absolute left-0 right-0 top-full bg-white/95 backdrop-blur-md shadow-xl border-t border-gray-100 transition-all duration-300 ease-out origin-top ${
            searchOpen
              ? 'opacity-100 scale-y-100 translate-y-0'
              : 'opacity-0 scale-y-95 -translate-y-2 pointer-events-none'
          }`}
        >
          <div className="max-w-3xl mx-auto px-6 py-5">
            <div className="relative">
              <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-lg text-[#9CA3AF]"></i>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search across the website..."
                className="w-full h-12 pl-12 pr-12 bg-white border border-gray-200 rounded-xl text-sm text-[#2C3E50] placeholder-[#9CA3AF] outline-none focus:border-[#DC2626] focus:ring-1 focus:ring-[#DC2626]/20 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSearchQuery('');
                    setSearchResults([]);
                    setShowResults(false);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-[#6C757D] cursor-pointer transition-colors"
                >
                  <i className="ri-close-line text-sm"></i>
                </button>
              )}
            </div>

            {/* Search Results */}
            {showResults && searchResults.length > 0 && (
              <div className="mt-4">
                <p className="text-xs text-[#6C757D] mb-3">
                  <span className="font-semibold text-[#2C3E50]">{searchResults.length}</span> results found for &ldquo;<span className="font-semibold text-[#DC2626]">{searchQuery}</span>&rdquo;
                </p>
                <div className="max-h-72 overflow-y-auto rounded-xl border border-gray-100 divide-y divide-gray-50 bg-white">
                  {searchResults.map((result, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleResultClick(result)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors cursor-pointer flex items-start gap-3"
                    >
                      <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <i className="ri-file-text-line text-sm text-[#9CA3AF]"></i>
                      </div>
                      <p className="text-sm text-[#2C3E50] leading-relaxed">
                        {highlightMatch(result.context, searchQuery)}
                      </p>
                    </button>
                  ))}
                </div>
                {searchResults.length === 8 && (
                  <p className="text-xs text-[#9CA3AF] text-center mt-3">Showing top 8 results</p>
                )}
              </div>
            )}

            {/* No Results */}
            {showResults && searchResults.length === 0 && searchQuery.trim().length >= 2 && (
              <div className="mt-4 py-8 text-center bg-white rounded-xl">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="ri-search-line text-xl text-[#9CA3AF]"></i>
                </div>
                <p className="text-sm text-[#6C757D]">No results found for</p>
                <p className="text-sm font-semibold text-[#2C3E50]">&ldquo;{searchQuery}&rdquo;</p>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 xl:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Slide-out */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-white z-50 xl:hidden transform transition-transform duration-300 ease-out shadow-2xl ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <span className="text-lg font-bold text-[#2C3E50]">Menu</span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="w-10 h-10 flex items-center justify-center rounded-lg text-[#6C757D] hover:bg-gray-100 cursor-pointer"
          >
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        {/* Mobile Search */}
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-3 pl-10 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#DC2626]"
            />
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]"></i>
          </div>
        </div>

        {/* Mobile Menu Items */}
        <nav className="flex-1 overflow-y-auto py-4">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center px-6 py-3.5 text-base font-medium transition-colors cursor-pointer ${
                item.path === '/' 
                  ? (location.pathname === '/' ? 'text-[#DC2626] bg-[#FEF2F2]' : 'text-[#2C3E50] hover:bg-gray-50')
                  : (location.pathname.startsWith(item.path) ? 'text-[#DC2626] bg-[#FEF2F2]' : 'text-[#2C3E50] hover:bg-gray-50')
              }`}
            >
              {item.label === 'Home' ? (
                <i className="ri-home-4-line text-xl"></i>
              ) : item.label === 'Webmail' ? (
                <span className="flex items-center gap-2">
                  <i className="ri-mail-line text-lg"></i>
                  {item.label}
                </span>
              ) : (
                item.label
              )}
            </Link>
          ))}
        </nav>

        {/* Mobile Language Toggle */}
        <div className="p-4 border-t border-gray-100">
          <p className="text-xs text-[#9CA3AF] uppercase tracking-wider mb-3">Language</p>
          <div className="flex items-center p-1 bg-gray-100 rounded-full">
            <button
              onClick={() => i18n.changeLanguage('en')}
              className={`flex-1 px-4 py-2 text-sm font-semibold rounded-full transition-all cursor-pointer ${
                currentLang === 'en'
                  ? 'bg-white text-[#2C3E50] shadow-sm'
                  : 'text-[#6C757D]'
              }`}
            >
              English
            </button>
            <button
              onClick={() => i18n.changeLanguage('fr')}
              className={`flex-1 px-4 py-2 text-sm font-semibold rounded-full transition-all cursor-pointer ${
                currentLang === 'fr'
                  ? 'bg-white text-[#2C3E50] shadow-sm'
                  : 'text-[#6C757D]'
              }`}
            >
              Français
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
