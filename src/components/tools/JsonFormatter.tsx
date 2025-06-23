
import React, { useState } from 'react';
import { Copy, Check, Download, FileJson, AlertCircle } from 'lucide-react';

const JsonFormatter = () => {
  const [input, setInput] = useState('{"name":"John","age":30,"city":"New York","hobbies":["reading","swimming"]}');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError('');
    } catch (err) {
      setError('Invalid JSON format');
      setOutput('');
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError('');
    } catch (err) {
      setError('Invalid JSON format');
      setOutput('');
    }
  };

  const validateJson = () => {
    try {
      JSON.parse(input);
      setError('');
      return true;
    } catch (err) {
      setError('Invalid JSON format');
      return false;
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const downloadJson = () => {
    const element = document.createElement('a');
    const file = new Blob([output], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = 'formatted.json';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="p-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
          <FileJson className="text-white" size={24} />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">JSON Formatter</h3>
          <p className="text-gray-600">Format, validate, and beautify JSON data</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              Input JSON
            </label>
            <div className="flex space-x-2">
              <button
                onClick={validateJson}
                className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-medium hover:bg-green-200 transition-all duration-300"
              >
                Validate
              </button>
            </div>
          </div>
          
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Paste your JSON here..."
            />
            {error && (
              <div className="absolute top-2 right-2 flex items-center space-x-1 bg-red-100 text-red-700 px-2 py-1 rounded text-xs">
                <AlertCircle size={12} />
                <span>{error}</span>
              </div>
            )}
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
                onClick={formatJson}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
              >
                <FileJson size={16} />
                <span>Format</span>
              </button>
              <button
                onClick={minifyJson}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-all duration-300"
              >
                Minify
              </button>
              <button
                onClick={copyToClipboard}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-all duration-300 flex items-center space-x-2"
              >
                {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
              <button
                onClick={downloadJson}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-all duration-300 flex items-center space-x-2"
              >
                <Download size={16} />
                <span>Download</span>
              </button>
            </div>
          </div>
          
          <div className="relative">
            <pre className="w-full h-64 p-4 bg-gray-50 border border-gray-300 rounded-lg font-mono text-sm overflow-auto">
              <code>{output}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mt-8 grid md:grid-cols-4 gap-6">
        {[
          { title: 'Validation', description: 'Real-time JSON syntax validation' },
          { title: 'Formatting', description: 'Beautiful indentation and structure' },
          { title: 'Minification', description: 'Compress JSON for production use' },
          { title: 'Export', description: 'Copy or download formatted JSON' }
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

export default JsonFormatter;
