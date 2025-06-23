
import { Code2, Coffee, Users, Award } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Code2, label: 'Projects Completed', value: '50+' },
    { icon: Coffee, label: 'Cups of Coffee', value: '1000+' },
    { icon: Users, label: 'Happy Clients', value: '25+' },
    { icon: Award, label: 'Years Experience', value: '5+' },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Crafting Digital Experiences with Passion
            </h3>
            <p className="text-gray-600 leading-relaxed">
              I'm a passionate frontend developer with a deep love for creating intuitive, 
              performant, and visually stunning web applications. My journey in software 
              development began 5 years ago, and I've been constantly evolving with the 
              latest technologies and best practices.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Beyond just writing code, I believe in building tools that empower other 
              developers. That's why I create developer productivity tools and contribute 
              to open-source projects that make our community stronger.
            </p>
            <p className="text-gray-600 leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies, contributing 
              to open source, or sharing knowledge through technical writing and mentoring.
            </p>
            
            <div className="flex flex-wrap gap-3 pt-4">
              {['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Node.js', 'GraphQL'].map((tech) => (
                <span
                  key={tech}
                  className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl transform rotate-6"></div>
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop"
              alt="Developer workspace"
              className="relative rounded-2xl shadow-2xl"
            />
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <stat.icon className="text-white" size={24} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
