
import React, { useState, useEffect } from 'react';
import { Code, Palette, Server, Smartphone, Database, Globe, TrendingUp } from 'lucide-react';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');
  const [animationKey, setAnimationKey] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const skillCategories = {
    frontend: {
      icon: Code,
      title: 'Frontend Development',
      color: 'from-blue-600 to-cyan-600',
      skills: [
        { name: 'React', level: 95, icon: '⚛️' },
        { name: 'TypeScript', level: 90, icon: '📘' },
        { name: 'Next.js', level: 88, icon: '▲' },
        { name: 'Tailwind CSS', level: 92, icon: '🎨' },
        { name: 'JavaScript', level: 94, icon: '📜' },
        { name: 'Vue.js', level: 75, icon: '💚' },
      ]
    },
    design: {
      icon: Palette,
      title: 'UI/UX Design',
      color: 'from-purple-600 to-pink-600',
      skills: [
        { name: 'Figma', level: 85, icon: '🎯' },
        { name: 'Adobe XD', level: 80, icon: '🔶' },
        { name: 'Responsive Design', level: 95, icon: '📱' },
        { name: 'Design Systems', level: 88, icon: '🎛️' },
        { name: 'Prototyping', level: 82, icon: '🔧' },
        { name: 'User Research', level: 75, icon: '🔍' },
      ]
    },
    backend: {
      icon: Server,
      title: 'Backend & APIs',
      color: 'from-green-600 to-emerald-600',
      skills: [
        { name: 'Node.js', level: 85, icon: '🟢' },
        { name: 'Express.js', level: 82, icon: '🚂' },
        { name: 'GraphQL', level: 78, icon: '📊' },
        { name: 'REST APIs', level: 90, icon: '🌐' },
        { name: 'PostgreSQL', level: 80, icon: '🐘' },
        { name: 'MongoDB', level: 75, icon: '🍃' },
      ]
    },
    mobile: {
      icon: Smartphone,
      title: 'Mobile Development',
      color: 'from-orange-600 to-red-600',
      skills: [
        { name: 'React Native', level: 80, icon: '📱' },
        { name: 'Flutter', level: 70, icon: '🦋' },
        { name: 'PWA', level: 88, icon: '⚡' },
        { name: 'Mobile UI/UX', level: 85, icon: '✨' },
        { name: 'App Store Optimization', level: 72, icon: '📈' },
        { name: 'Cross-platform', level: 82, icon: '🔄' },
      ]
    },
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      observer.observe(skillsSection);
    }

    return () => {
      if (skillsSection) {
        observer.unobserve(skillsSection);
      }
    };
  }, []);

  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [activeCategory]);

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-300 rounded-full blur-xl animate-blob"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-purple-300 rounded-full blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-36 h-36 bg-indigo-300 rounded-full blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            My <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full mb-6 animate-pulse"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive expertise across the full stack, from pixel-perfect frontends to robust backend systems
          </p>
        </div>

        {/* Category Tabs */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {Object.entries(skillCategories).map(([key, category], index) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`group flex items-center space-x-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${
                activeCategory === key
                  ? `bg-gradient-to-r ${category.color} text-white shadow-xl scale-105 -translate-y-1`
                  : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-lg hover:shadow-xl'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <category.icon size={24} className={`transition-transform duration-300 ${activeCategory === key ? '' : 'group-hover:scale-110 group-hover:rotate-12'}`} />
              <span className="text-lg">{category.title}</span>
              {activeCategory === key && (
                <TrendingUp size={20} className="ml-2 animate-pulse" />
              )}
            </button>
          ))}
        </div>

        {/* Skills Display */}
        <div className={`bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center space-x-4 mb-10">
            <div className={`p-3 rounded-2xl bg-gradient-to-r ${skillCategories[activeCategory].color} shadow-lg`}>
              {React.createElement(skillCategories[activeCategory].icon, {
                size: 32,
                className: "text-white"
              })}
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900">
                {skillCategories[activeCategory].title}
              </h3>
              <p className="text-gray-600 mt-1">Specialized expertise and experience</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8" key={animationKey}>
            {skillCategories[activeCategory].skills.map((skill, index) => (
              <div 
                key={skill.name} 
                className="group space-y-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{skill.icon}</span>
                    <span className="text-gray-800 font-semibold text-lg">{skill.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`bg-gradient-to-r ${skillCategories[activeCategory].color} bg-clip-text text-transparent font-bold text-lg`}>
                      {skill.level}%
                    </span>
                  </div>
                </div>
                <div className="relative w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                  <div
                    className={`h-full bg-gradient-to-r ${skillCategories[activeCategory].color} rounded-full transition-all duration-1500 ease-out relative overflow-hidden`}
                    style={{ 
                      width: `${skill.level}%`,
                      animation: `skill-fill 1.5s ease-out forwards`
                    }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Technologies */}
        <div className={`mt-20 text-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h4 className="text-2xl font-bold text-gray-900 mb-8 flex items-center justify-center space-x-3">
            <Globe className="text-blue-600" size={28} />
            <span>Additional Technologies & Tools</span>
          </h4>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'Git', 'Docker', 'AWS', 'Firebase', 'Vercel', 'Webpack', 'Vite', 'Jest', 
              'Cypress', 'Storybook', 'Prisma', 'Supabase', 'Redux', 'Zustand'
            ].map((tech, index) => (
              <span
                key={tech}
                className="group bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-700 px-6 py-3 rounded-full text-sm font-semibold hover:shadow-lg transition-all duration-300 hover:scale-110 hover:-translate-y-1 cursor-pointer"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {tech}
                <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">✨</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes skill-fill {
          from { width: 0%; }
          to { width: var(--skill-width); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </section>
  );
};

export default Skills;
