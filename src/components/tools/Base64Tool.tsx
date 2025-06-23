
import React, { useState } from 'react';
import { Copy, Check, Download, FileText, ArrowUpDown } from 'lucide-react';

const Base64Tool = () => {
  const [input, setInput] = useState('Hello, World!');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [copied, setCopied] = useState(false);

  const processText = () => {
    try {
      if (mode === 'encode') {
        const encoded = btoa(unescape(encodeURIComponent(input)));
        setOutput(encoded);
      } else {
        const decoded = decodeURIComponent(escape(atob(input)));
        setOutput(decoded);
      }
    } catch (error) {
      setOutput('Error: Invalid input for ' + mode);
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

  const downloadText = () => {
    const element = document.createElement('a');
    const file = new Blob([output], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${mode}d-text.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const swapInputOutput = () => {
    setInput(output);
    setOutput(input);
    setMode(mode === 'encode' ? 'decode' : 'encode');
  };

  return (
    <div className="p-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
          <FileText className="text-white" size={24} />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Base64 Encoder/Decoder</h3>
          <p className="text-gray-600">Encode and decode Base64 strings</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              Input Text
            </label>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setMode(mode === 'encode' ? 'decode' : 'encode')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  mode === 'encode' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                Encode
              </button>
              <button
                onClick={() => setMode(mode === 'encode' ? 'decode' : 'encode')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  mode === 'decode' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                Decode
              </button>
            </div>
          </div>
          
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'}
            />
          </div>
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              {mode === 'encode' ? 'Base64 Output' : 'Decoded Output'}
            </label>
            <div className="flex space-x-2">
              <button
                onClick={swapInputOutput}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-all duration-300 flex items-center space-x-2"
              >
                <ArrowUpDown size={16} />
                <span>Swap</span>
              </button>
              <button
                onClick={processText}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
              >
                <FileText size={16} />
                <span>{mode === 'encode' ? 'Encode' : 'Decode'}</span>
              </button>
              <button
                onClick={copyToClipboard}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-all duration-300 flex items-center space-x-2"
              >
                {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
              <button
                onClick={downloadText}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-all duration-300 flex items-center space-x-2"
              >
                <Download size={16} />
                <span>Download</span>
              </button>
            </div>
          </div>
          
          <div className="relative">
            <pre className="w-full h-64 p-4 bg-gray-50 border border-gray-300 rounded-lg font-mono text-sm overflow-auto break-all">
              {output}
            </pre>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        {[
          { title: 'UTF-8 Support', description: 'Full Unicode character support' },
          { title: 'Bidirectional', description: 'Encode and decode in both directions' },
          { title: 'Error Handling', description: 'Graceful handling of invalid input' }
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

export default Base64Tool;
