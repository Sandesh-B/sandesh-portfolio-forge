
import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Download, ChevronDown } from 'lucide-react';

const Hero = () => {
  const [text, setText] = useState('');
  const fullText = 'Frontend Developer';
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorTimer);
  }, []);

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: '#contact', label: 'Email' },
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <div className="mb-8">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
              alt="Sandesh Bhusal"
              className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-white shadow-xl hover:scale-105 transition-transform duration-300"
            />
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-4">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Sandesh
              </span>
            </h1>
            <div className="text-2xl md:text-3xl text-gray-600 mb-8 h-12">
              <span>{text}</span>
              <span className={`text-blue-600 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>|</span>
            </div>
          </div>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Passionate about creating exceptional digital experiences with modern technologies. 
            Specialized in React, TypeScript, and building developer tools that enhance productivity.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center space-x-2">
              <Download size={20} />
              <span>Download Resume</span>
            </button>
            <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300">
              View My Work
            </button>
          </div>

          <div className="flex justify-center space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="p-3 rounded-full bg-white/80 text-gray-700 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110 shadow-lg"
                aria-label={link.label}
              >
                <link.icon size={24} />
              </a>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-gray-400" size={32} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
