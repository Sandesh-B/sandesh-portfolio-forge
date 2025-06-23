
import { useState } from 'react';
import { Palette, Copy, Check, RefreshCw, Download } from 'lucide-react';

const ColorPalette = () => {
  const [baseColor, setBaseColor] = useState('#3B82F6');
  const [copiedColor, setCopiedColor] = useState('');

  const generatePalette = (base: string) => {
    // Convert hex to HSL for easier manipulation
    const hexToHsl = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h: number, s: number, l = (max + min) / 2;

      if (max === min) {
        h = s = 0;
      } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
          default: h = 0;
        }
        h /= 6;
      }

      return [h * 360, s * 100, l * 100];
    };

    const hslToHex = (h: number, s: number, l: number) => {
      l /= 100;
      const a = s * Math.min(l, 1 - l) / 100;
      const f = (n: number) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
      };
      return `#${f(0)}${f(8)}${f(4)}`;
    };

    const [h, s, l] = hexToHsl(base);

    return {
      monochromatic: [
        hslToHex(h, s, Math.max(10, l - 40)),
        hslToHex(h, s, Math.max(20, l - 20)),
        base,
        hslToHex(h, s, Math.min(80, l + 20)),
        hslToHex(h, s, Math.min(90, l + 40))
      ],
      analogous: [
        hslToHex((h - 30 + 360) % 360, s, l),
        hslToHex((h - 15 + 360) % 360, s, l),
        base,
        hslToHex((h + 15) % 360, s, l),
        hslToHex((h + 30) % 360, s, l)
      ],
      complementary: [
        hslToHex((h + 180) % 360, s, l),
        hslToHex((h + 150) % 360, s, l),
        base,
        hslToHex((h + 210) % 360, s, l),
        hslToHex((h + 240) % 360, s, l)
      ],
      triadic: [
        base,
        hslToHex((h + 120) % 360, s, l),
        hslToHex((h + 240) % 360, s, l),
        hslToHex(h, Math.max(20, s - 30), l),
        hslToHex(h, Math.min(80, s + 30), l)
      ]
    };
  };

  const palette = generatePalette(baseColor);

  const copyColor = async (color: string) => {
    try {
      await navigator.clipboard.writeText(color);
      setCopiedColor(color);
      setTimeout(() => setCopiedColor(''), 2000);
    } catch (err) {
      console.error('Failed to copy color: ', err);
    }
  };

  const generateRandomColor = () => {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    setBaseColor(randomColor);
  };

  const exportPalette = (type: string) => {
    const colors = palette[type as keyof typeof palette];
    const css = colors.map((color, index) => `--color-${type}-${index + 1}: ${color};`).join('\n');
    
    const element = document.createElement('a');
    const file = new Blob([`:root {\n${css}\n}`], { type: 'text/css' });
    element.href = URL.createObjectURL(file);
    element.download = `${type}-palette.css`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const ColorCard = ({ colors, title, type }: { colors: string[], title: string, type: string }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            onClick={() => exportPalette(type)}
            className="text-blue-600 hover:text-blue-700 transition-colors"
            title="Export as CSS"
          >
            <Download size={16} />
          </button>
        </div>
      </div>
      <div className="flex">
        {colors.map((color, index) => (
          <div
            key={index}
            className="flex-1 h-24 cursor-pointer relative group"
            style={{ backgroundColor: color }}
            onClick={() => copyColor(color)}
          >
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 px-2 py-1 rounded text-xs font-mono">
                {color}
              </div>
            </div>
            {copiedColor === color && (
              <div className="absolute inset-0 flex items-center justify-center bg-green-500/80">
                <Check className="text-white" size={20} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
          <Palette className="text-white" size={24} />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Color Palette Generator</h3>
          <p className="text-gray-600">Generate beautiful color harmonies for your designs</p>
        </div>
      </div>

      {/* Color Input */}
      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <label className="text-sm font-medium text-gray-700">Base Color:</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={baseColor}
                onChange={(e) => setBaseColor(e.target.value)}
                className="w-12 h-12 rounded-lg border-2 border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={baseColor}
                onChange={(e) => setBaseColor(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm w-24"
              />
            </div>
          </div>
          <button
            onClick={generateRandomColor}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
          >
            <RefreshCw size={16} />
            <span>Random</span>
          </button>
        </div>
      </div>

      {/* Color Palettes */}
      <div className="grid lg:grid-cols-2 gap-6">
        <ColorCard colors={palette.monochromatic} title="Monochromatic" type="monochromatic" />
        <ColorCard colors={palette.analogous} title="Analogous" type="analogous" />
        <ColorCard colors={palette.complementary} title="Complementary" type="complementary" />
        <ColorCard colors={palette.triadic} title="Triadic" type="triadic" />
      </div>

      {/* Usage Tips */}
      <div className="mt-8 bg-blue-50 rounded-xl p-6">
        <h4 className="font-semibold text-gray-900 mb-3">Color Theory Tips</h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <strong>Monochromatic:</strong> Uses variations of a single color. Great for creating calm, cohesive designs.
          </div>
          <div>
            <strong>Analogous:</strong> Uses colors that are next to each other on the color wheel. Creates harmony.
          </div>
          <div>
            <strong>Complementary:</strong> Uses colors opposite on the color wheel. Creates vibrant, high-contrast designs.
          </div>
          <div>
            <strong>Triadic:</strong> Uses three evenly spaced colors. Offers strong visual contrast while maintaining balance.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPalette;
