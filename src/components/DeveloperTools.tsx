
import { useState } from 'react';
import { Code, Palette, Layers, Copy, Check, Download } from 'lucide-react';
import CodeFormatter from './tools/CodeFormatter';
import ColorPalette from './tools/ColorPalette';
import GradientGenerator from './tools/GradientGenerator';

const DeveloperTools = () => {
  const [activeTab, setActiveTab] = useState('formatter');

  const tools = [
    {
      id: 'formatter',
      title: 'Code Formatter',
      description: 'Format and beautify your code with syntax highlighting',
      icon: Code,
      component: CodeFormatter
    },
    {
      id: 'colors',
      title: 'Color Palette',
      description: 'Generate beautiful color palettes for your projects',
      icon: Palette,
      component: ColorPalette
    },
    {
      id: 'gradients',
      title: 'Gradient Generator',
      description: 'Create stunning CSS gradients with live preview',
      icon: Layers,
      component: GradientGenerator
    }
  ];

  const ActiveComponent = tools.find(tool => tool.id === activeTab)?.component;

  return (
    <section id="tools" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Developer <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Tools</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Productivity tools built by developers, for developers. Streamline your workflow with these handy utilities.
          </p>
        </div>

        {/* Tool Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveTab(tool.id)}
              className={`flex items-center space-x-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === tool.id
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-md'
              }`}
            >
              <tool.icon size={20} />
              <div className="text-left">
                <div className="font-semibold">{tool.title}</div>
                <div className="text-xs opacity-80">{tool.description}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Tool Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {ActiveComponent && <ActiveComponent />}
        </div>

        {/* Tool Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {[
            {
              icon: Code,
              title: 'Open Source',
              description: 'All tools are open source and available on GitHub for contributions and improvements.'
            },
            {
              icon: Palette,
              title: 'Mobile Optimized',
              description: 'Fully responsive design ensures all tools work perfectly on any device or screen size.'
            },
            {
              icon: Layers,
              title: 'Offline Ready',
              description: 'Works offline with service worker caching for uninterrupted productivity.'
            }
          ].map((feature, index) => (
            <div key={index} className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <feature.icon className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeveloperTools;
