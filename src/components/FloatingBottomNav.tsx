
import React, { useState, useEffect } from 'react';
import { ChevronDown, Github, Linkedin, Mail, Twitter } from 'lucide-react';

const FloatingBottomNav = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      setShowNav(scrollY > windowHeight * 0.3);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub', color: 'hover:bg-gray-700' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn', color: 'hover:bg-blue-600' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter', color: 'hover:bg-blue-400' },
    { icon: Mail, href: '#contact', label: 'Email', color: 'hover:bg-green-600' },
  ];

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
      showNav ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`}>
      <div className="relative">
        {/* Social Icons */}
        <div className={`absolute bottom-16 right-0 space-y-3 transition-all duration-300 ${
          isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}>
          {socialLinks.map((link, index) => (
            <div
              key={link.label}
              className="transform transition-all duration-300"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <a
                href={link.href}
                className={`flex items-center justify-center w-12 h-12 bg-white text-gray-700 rounded-full shadow-lg transition-all duration-300 ${link.color} hover:text-white hover:shadow-xl hover:scale-110 group`}
                aria-label={link.label}
              >
                <link.icon size={20} />
                <span className="absolute right-14 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  {link.label}
                </span>
              </a>
            </div>
          ))}
        </div>

        {/* Main Button */}
        <button
          onClick={() => {
            if (isExpanded) {
              setIsExpanded(false);
            } else {
              setIsExpanded(true);
              setTimeout(() => setIsExpanded(false), 3000); // Auto-collapse after 3s
            }
          }}
          onDoubleClick={scrollToBottom}
          className="relative w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group overflow-hidden"
        >
          <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${
            isExpanded ? 'rotate-180' : 'rotate-0'
          }`}>
            <ChevronDown size={24} />
          </div>
          
          {/* Ripple effect */}
          <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          
          {/* Tooltip */}
          <span className="absolute bottom-16 right-1/2 transform translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            Click to expand • Double-click to scroll down
          </span>
        </button>
      </div>
    </div>
  );
};

export default FloatingBottomNav;
