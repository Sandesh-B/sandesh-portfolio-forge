
import React, { useState, useEffect } from 'react';
import { Download, QrCode, Copy, Check } from 'lucide-react';

const QRCodeGenerator = () => {
  const [text, setText] = useState('https://sandeshbhusal.com');
  const [qrSize, setQrSize] = useState(200);
  const [qrColor, setQrColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [copied, setCopied] = useState(false);

  // Simple QR Code generation using QR Server API
  const generateQRCode = () => {
    const size = `${qrSize}x${qrSize}`;
    const encodedText = encodeURIComponent(text);
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}&data=${encodedText}&color=${qrColor.substring(1)}&bgcolor=${bgColor.substring(1)}`;
    setQrCodeDataUrl(url);
  };

  useEffect(() => {
    generateQRCode();
  }, [text, qrSize, qrColor, bgColor]);

  const downloadQRCode = async () => {
    try {
      const response = await fetch(qrCodeDataUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const element = document.createElement('a');
      element.href = url;
      element.download = 'qrcode.png';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download QR code:', error);
    }
  };

  const copyImageToClipboard = async () => {
    try {
      const response = await fetch(qrCodeDataUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy image:', error);
    }
  };

  const presetTexts = [
    { label: 'Website URL', value: 'https://sandeshbhusal.com' },
    { label: 'Email', value: 'mailto:hello@sandeshbhusal.com' },
    { label: 'Phone', value: 'tel:+1234567890' },
    { label: 'WiFi', value: 'WIFI:T:WPA;S:NetworkName;P:Password;;' },
  ];

  return (
    <div className="p-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
          <QrCode className="text-white" size={24} />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">QR Code Generator</h3>
          <p className="text-gray-600">Generate custom QR codes for any text or URL</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Text or URL
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Enter text, URL, or data to encode..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quick Presets
            </label>
            <div className="grid grid-cols-2 gap-2">
              {presetTexts.map((preset, index) => (
                <button
                  key={index}
                  onClick={() => setText(preset.value)}
                  className="p-2 text-sm bg-gray-100 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Size: {qrSize}px
              </label>
              <input
                type="range"
                min="100"
                max="500"
                value={qrSize}
                onChange={(e) => setQrSize(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Foreground Color
              </label>
              <input
                type="color"
                value={qrColor}
                onChange={(e) => setQrColor(e.target.value)}
                className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Background Color
            </label>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Output Section */}
        <div className="space-y-6">
          <div className="text-center">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Generated QR Code
            </label>
            <div className="inline-block p-4 bg-white border-2 border-gray-200 rounded-lg shadow-sm">
              {qrCodeDataUrl && (
                <img
                  src={qrCodeDataUrl}
                  alt="Generated QR Code"
                  className="max-w-full h-auto"
                  style={{ width: qrSize, height: qrSize }}
                />
              )}
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={copyImageToClipboard}
              className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-all duration-300 flex items-center space-x-2"
            >
              {copied ? <Check size={20} className="text-green-600" /> : <Copy size={20} />}
              <span>{copied ? 'Copied!' : 'Copy Image'}</span>
            </button>
            <button
              onClick={downloadQRCode}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
            >
              <Download size={20} />
              <span>Download PNG</span>
            </button>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mt-8 grid md:grid-cols-4 gap-6">
        {[
          { title: 'Custom Colors', description: 'Personalize foreground and background colors' },
          { title: 'Variable Size', description: 'Generate QR codes from 100px to 500px' },
          { title: 'Multiple Formats', description: 'Support for URLs, text, email, phone, WiFi' },
          { title: 'High Quality', description: 'PNG output suitable for print and web' }
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

export default QRCodeGenerator;
