import { useState } from 'react';
import { Code, Palette, Layers, FileJson, FileText, QrCode, Hash, Key } from 'lucide-react';
import CodeFormatter from './tools/CodeFormatter';
import ColorPalette from './tools/ColorPalette';
import GradientGenerator from './tools/GradientGenerator';
import JsonFormatter from './tools/JsonFormatter';
import Base64Tool from './tools/Base64Tool';
import QRCodeGenerator from './tools/QRCodeGenerator';

const DeveloperTools = () => {
  const [activeTab, setActiveTab] = useState('formatter');

  const tools = [
    {
      id: 'formatter',
      title: 'Code Formatter',
      description: 'Format and beautify your code',
      icon: Code,
      component: CodeFormatter
    },
    {
      id: 'json',
      title: 'JSON Formatter',
      description: 'Format, validate and beautify JSON',
      icon: FileJson,
      component: JsonFormatter
    },
    {
      id: 'base64',
      title: 'Base64 Tool',
      description: 'Encode and decode Base64 strings',
      icon: FileText,
      component: Base64Tool
    },
    {
      id: 'qrcode',
      title: 'QR Code Generator',
      description: 'Generate custom QR codes',
      icon: QrCode,
      component: QRCodeGenerator
    },
    {
      id: 'colors',
      title: 'Color Palette',
      description: 'Generate beautiful color palettes',
      icon: Palette,
      component: ColorPalette
    },
    {
      id: 'gradients',
      title: 'Gradient Generator',
      description: 'Create stunning CSS gradients',
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
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveTab(tool.id)}
              className={`group flex items-center space-x-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeTab === tool.id
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-md hover:shadow-lg'
              }`}
            >
              <tool.icon size={20} className={`transition-transform duration-300 ${activeTab === tool.id ? '' : 'group-hover:scale-110'}`} />
              <div className="text-left">
                <div className="font-semibold text-sm">{tool.title}</div>
                <div className={`text-xs transition-opacity duration-300 ${activeTab === tool.id ? 'opacity-80' : 'opacity-60 group-hover:opacity-100'}`}>
                  {tool.description}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Tool Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in">
          {ActiveComponent && <ActiveComponent />}
        </div>

        {/* Tool Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {[
            {
              icon: Code,
              title: 'Open Source',
              description: 'All tools are open source and available for contributions and improvements.'
            },
            {
              icon: Palette,
              title: 'Mobile Optimized',
              description: 'Fully responsive design ensures all tools work perfectly on any device.'
            },
            {
              icon: Layers,
              title: 'Offline Ready',
              description: 'Works offline with service worker caching for uninterrupted productivity.'
            }
          ].map((feature, index) => (
            <div key={index} className="group text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
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
