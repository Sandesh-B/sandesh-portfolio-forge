
import { useState } from 'react';
import { Code, Palette, Server, Smartphone, Database, Globe } from 'lucide-react';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');

  const skillCategories = {
    frontend: {
      icon: Code,
      title: 'Frontend Development',
      skills: [
        { name: 'React', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'Next.js', level: 88 },
        { name: 'Tailwind CSS', level: 92 },
        { name: 'JavaScript', level: 94 },
        { name: 'Vue.js', level: 75 },
      ]
    },
    design: {
      icon: Palette,
      title: 'UI/UX Design',
      skills: [
        { name: 'Figma', level: 85 },
        { name: 'Adobe XD', level: 80 },
        { name: 'Responsive Design', level: 95 },
        { name: 'Design Systems', level: 88 },
        { name: 'Prototyping', level: 82 },
        { name: 'User Research', level: 75 },
      ]
    },
    backend: {
      icon: Server,
      title: 'Backend & APIs',
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Express.js', level: 82 },
        { name: 'GraphQL', level: 78 },
        { name: 'REST APIs', level: 90 },
        { name: 'PostgreSQL', level: 80 },
        { name: 'MongoDB', level: 75 },
      ]
    },
    mobile: {
      icon: Smartphone,
      title: 'Mobile Development',
      skills: [
        { name: 'React Native', level: 80 },
        { name: 'Flutter', level: 70 },
        { name: 'PWA', level: 88 },
        { name: 'Mobile UI/UX', level: 85 },
        { name: 'App Store Optimization', level: 72 },
        { name: 'Cross-platform', level: 82 },
      ]
    },
  };

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            My <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive expertise across the full stack, from pixel-perfect frontends to robust backend systems
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.entries(skillCategories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === key
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              <category.icon size={20} />
              <span>{category.title}</span>
            </button>
          ))}
        </div>

        {/* Skills Display */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="flex items-center space-x-3 mb-8">
            {React.createElement(skillCategories[activeCategory].icon, {
              size: 32,
              className: "text-blue-600"
            })}
            <h3 className="text-2xl font-bold text-gray-900">
              {skillCategories[activeCategory].title}
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories[activeCategory].skills.map((skill, index) => (
              <div key={skill.name} className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">{skill.name}</span>
                  <span className="text-blue-600 font-semibold">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: `${skill.level}%`,
                      animation: `skill-fill-${index} 1.5s ease-out forwards`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Technologies */}
        <div className="mt-16 text-center">
          <h4 className="text-xl font-semibold text-gray-900 mb-6">Additional Technologies & Tools</h4>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Git', 'Docker', 'AWS', 'Firebase', 'Vercel', 'Webpack', 'Vite', 'Jest', 
              'Cypress', 'Storybook', 'Prisma', 'Supabase', 'Redux', 'Zustand'
            ].map((tech) => (
              <span
                key={tech}
                className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-full text-sm font-medium hover:shadow-md transition-all duration-300 hover:scale-105"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
