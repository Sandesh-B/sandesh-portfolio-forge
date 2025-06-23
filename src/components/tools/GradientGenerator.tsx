
import { useState } from 'react';
import { Layers, Copy, Check, Download, RotateCw } from 'lucide-react';

const GradientGenerator = () => {
  const [gradient, setGradient] = useState({
    color1: '#3B82F6',
    color2: '#8B5CF6',
    direction: '45deg',
    type: 'linear'
  });
  const [copied, setCopied] = useState(false);

  const directions = [
    { value: '0deg', label: 'Top' },
    { value: '45deg', label: 'Top Right' },
    { value: '90deg', label: 'Right' },
    { value: '135deg', label: 'Bottom Right' },
    { value: '180deg', label: 'Bottom' },
    { value: '225deg', label: 'Bottom Left' },
    { value: '270deg', label: 'Left' },
    { value: '315deg', label: 'Top Left' },
  ];

  const presetGradients = [
    { name: 'Ocean Blue', color1: '#667eea', color2: '#764ba2', direction: '45deg' },
    { name: 'Sunset', color1: '#f093fb', color2: '#f5576c', direction: '135deg' },
    { name: 'Forest', color1: '#11998e', color2: '#38ef7d', direction: '90deg' },
    { name: 'Purple Haze', color1: '#667eea', color2: '#764ba2', direction: '180deg' },
    { name: 'Fire', color1: '#f12711', color2: '#f5af19', direction: '45deg' },
    { name: 'Ice', color1: '#a8edea', color2: '#fed6e3', direction: '90deg' },
  ];

  const generateCSS = () => {
    if (gradient.type === 'linear') {
      return `background: linear-gradient(${gradient.direction}, ${gradient.color1}, ${gradient.color2});`;
    } else {
      return `background: radial-gradient(circle, ${gradient.color1}, ${gradient.color2});`;
    }
  };

  const generateGradientStyle = () => {
    if (gradient.type === 'linear') {
      return {
        background: `linear-gradient(${gradient.direction}, ${gradient.color1}, ${gradient.color2})`
      };
    } else {
      return {
        background: `radial-gradient(circle, ${gradient.color1}, ${gradient.color2})`
      };
    }
  };

  const copyCSS = async () => {
    try {
      await navigator.clipboard.writeText(generateCSS());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy CSS: ', err);
    }
  };

  const randomizeGradient = () => {
    const randomColor = () => '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    const randomDirection = directions[Math.floor(Math.random() * directions.length)].value;
    
    setGradient({
      ...gradient,
      color1: randomColor(),
      color2: randomColor(),
      direction: randomDirection
    });
  };

  const downloadGradient = () => {
    const css = `.gradient {
  ${generateCSS()}
  width: 100%;
  height: 100%;
}`;
    
    const element = document.createElement('a');
    const file = new Blob([css], { type: 'text/css' });
    element.href = URL.createObjectURL(file);
    element.download = 'gradient.css';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="p-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
          <Layers className="text-white" size={24} />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Gradient Generator</h3>
          <p className="text-gray-600">Create beautiful CSS gradients with live preview</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          {/* Gradient Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Gradient Type
            </label>
            <div className="flex space-x-3">
              {['linear', 'radial'].map((type) => (
                <button
                  key={type}
                  onClick={() => setGradient({...gradient, type})}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    gradient.type === type
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Color
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={gradient.color1}
                  onChange={(e) => setGradient({...gradient, color1: e.target.value})}
                  className="w-12 h-12 rounded-lg border-2 border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={gradient.color1}
                  onChange={(e) => setGradient({...gradient, color1: e.target.value})}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Second Color
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={gradient.color2}
                  onChange={(e) => setGradient({...gradient, color2: e.target.value})}
                  className="w-12 h-12 rounded-lg border-2 border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={gradient.color2}
                  onChange={(e) => setGradient({...gradient, color2: e.target.value})}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm"
                />
              </div>
            </div>
          </div>

          {/* Direction (for linear gradients) */}
          {gradient.type === 'linear' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Direction
              </label>
              <div className="grid grid-cols-4 gap-2">
                {directions.map((dir) => (
                  <button
                    key={dir.value}
                    onClick={() => setGradient({...gradient, direction: dir.value})}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      gradient.direction === dir.value
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {dir.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={randomizeGradient}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <RotateCw size={16} />
              <span>Randomize</span>
            </button>
            <button
              onClick={copyCSS}
              className="flex-1 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-200 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
              <span>{copied ? 'Copied!' : 'Copy CSS'}</span>
            </button>
            <button
              onClick={downloadGradient}
              className="bg-gray-100 text-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-200 transition-all duration-300"
            >
              <Download size={16} />
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Live Preview
            </label>
            <div
              className="w-full h-64 rounded-xl border-2 border-gray-200"
              style={generateGradientStyle()}
            ></div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CSS Code
            </label>
            <div className="bg-gray-900 rounded-lg p-4">
              <code className="text-green-400 text-sm font-mono break-all">
                {generateCSS()}
              </code>
            </div>
          </div>
        </div>
      </div>

      {/* Preset Gradients */}
      <div className="mt-8">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Preset Gradients</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {presetGradients.map((preset, index) => (
            <button
              key={index}
              onClick={() => setGradient({
                ...gradient,
                color1: preset.color1,
                color2: preset.color2,
                direction: preset.direction
              })}
              className="group relative h-20 rounded-lg overflow-hidden border-2 border-gray-200 hover:border-blue-400 transition-all duration-300"
              style={{
                background: `linear-gradient(${preset.direction}, ${preset.color1}, ${preset.color2})`
              }}
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 px-2 py-1 rounded">
                  {preset.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GradientGenerator;
