
import { useState } from 'react';
import { ExternalLink, Github, Eye } from 'lucide-react';

const Projects = () => {
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Dashboard',
      description: 'Modern admin dashboard for e-commerce management with real-time analytics, inventory tracking, and order management.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Chart.js'],
      category: 'web',
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Collaborative task management application with drag-and-drop functionality, team collaboration, and progress tracking.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
      technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'Framer Motion'],
      category: 'web',
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    },
    {
      id: 3,
      title: 'Weather Mobile App',
      description: 'Beautiful weather application with location-based forecasts, interactive maps, and offline support.',
      image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop',
      technologies: ['React Native', 'Redux', 'Weather API', 'Maps'],
      category: 'mobile',
      liveUrl: '#',
      githubUrl: '#',
      featured: false
    },
    {
      id: 4,
      title: 'Code Formatter Tool',
      description: 'Online code formatting and beautification tool supporting multiple programming languages with syntax highlighting.',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop',
      technologies: ['React', 'Monaco Editor', 'Prettier', 'TypeScript'],
      category: 'tools',
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    },
    {
      id: 5,
      title: 'Portfolio Website',
      description: 'Responsive portfolio website with modern design, smooth animations, and optimized performance.',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop',
      technologies: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite'],
      category: 'web',
      liveUrl: '#',
      githubUrl: '#',
      featured: false
    },
    {
      id: 6,
      title: 'Color Palette Generator',
      description: 'Advanced color palette generator with harmony rules, accessibility checking, and export functionality.',
      image: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=600&h=400&fit=crop',
      technologies: ['Vue.js', 'Color.js', 'Canvas API', 'CSS3'],
      category: 'tools',
      liveUrl: '#',
      githubUrl: '#',
      featured: false
    }
  ];

  const categories = [
    { key: 'all', label: 'All Projects' },
    { key: 'web', label: 'Web Apps' },
    { key: 'mobile', label: 'Mobile Apps' },
    { key: 'tools', label: 'Developer Tools' }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Featured <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Showcasing my passion for building exceptional digital experiences and developer tools
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setFilter(category.key)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                filter === category.key
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:scale-105 ${
                project.featured ? 'ring-2 ring-blue-200' : ''
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {project.featured && (
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold px-3 py-1 absolute top-4 left-4 rounded-full z-10">
                  Featured
                </div>
              )}
              
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 flex space-x-2">
                    <a
                      href={project.liveUrl}
                      className="flex-1 bg-white/90 text-gray-900 px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-center space-x-1 hover:bg-white transition-colors"
                    >
                      <Eye size={16} />
                      <span>Live Demo</span>
                    </a>
                    <a
                      href={project.githubUrl}
                      className="flex-1 bg-white/90 text-gray-900 px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-center space-x-1 hover:bg-white transition-colors"
                    >
                      <Github size={16} />
                      <span>Code</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-blue-50 text-blue-700 px-2 py-1 rounded-lg text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">Interested in seeing more of my work?</p>
          <a
            href="#"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Github size={20} />
            <span>View All Projects on GitHub</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
