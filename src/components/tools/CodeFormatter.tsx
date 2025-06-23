
import { useState } from 'react';
import { Copy, Check, Download, Code } from 'lucide-react';

const CodeFormatter = () => {
  const [code, setCode] = useState(`function greetUser(name) {
if(!name){return "Hello, World!";}
return \`Hello, \${name}!\`;
}

const users = ["Alice", "Bob", "Charlie"];
users.forEach(user => console.log(greetUser(user)));`);
  
  const [language, setLanguage] = useState('javascript');
  const [copied, setCopied] = useState(false);

  const formatCode = () => {
    // Simple formatting logic for demo purposes
    let formatted = code;
    
    if (language === 'javascript') {
      formatted = code
        .replace(/;/g, ';\n')
        .replace(/{/g, ' {\n  ')
        .replace(/}/g, '\n}')
        .replace(/,/g, ',\n  ')
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .join('\n');
    }
    
    setCode(formatted);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const downloadCode = () => {
    const element = document.createElement('a');
    const file = new Blob([code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `formatted-code.${language === 'javascript' ? 'js' : language}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'json', label: 'JSON' },
    { value: 'python', label: 'Python' },
  ];

  return (
    <div className="p-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
          <Code className="text-white" size={24} />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Code Formatter</h3>
          <p className="text-gray-600">Format and beautify your code with proper indentation</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              Select Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Input Code
            </label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Paste your code here..."
            />
          </div>
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              Formatted Output
            </label>
            <div className="flex space-x-2">
              <button
                onClick={formatCode}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
              >
                <Code size={16} />
                <span>Format</span>
              </button>
              <button
                onClick={copyToClipboard}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-all duration-300 flex items-center space-x-2"
              >
                {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
              <button
                onClick={downloadCode}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-all duration-300 flex items-center space-x-2"
              >
                <Download size={16} />
                <span>Download</span>
              </button>
            </div>
          </div>
          
          <div className="relative">
            <pre className="w-full h-64 p-4 bg-gray-50 border border-gray-300 rounded-lg font-mono text-sm overflow-auto">
              <code className={`language-${language}`}>{code}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        {[
          {
            title: 'Multiple Languages',
            description: 'Support for JavaScript, TypeScript, HTML, CSS, JSON, and Python'
          },
          {
            title: 'Smart Formatting',
            description: 'Intelligent indentation and code structure optimization'
          },
          {
            title: 'Export Options',
            description: 'Copy to clipboard or download formatted code as file'
          }
        ].map((feature, index) => (
          <div key={index} className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CodeFormatter;
