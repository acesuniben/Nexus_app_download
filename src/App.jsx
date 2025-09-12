import React, { useState, useEffect } from 'react';
import { Download, CheckCircle, AlertTriangle, Smartphone, Shield, Clock, Users, BookOpen, Target, Zap } from 'lucide-react';

export default function App() {
  const [downloadStatus, setDownloadStatus] = useState('preparing');
  const [progress, setProgress] = useState(0);
  const [showInstructions, setShowInstructions] = useState(false);
  const [autoDownloadAttempted, setAutoDownloadAttempted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!autoDownloadAttempted) {
        setAutoDownloadAttempted(true);
        setDownloadStatus('downloading');
        simulateDownload();
        
        const link = document.createElement('a');
        link.href = './aces.apk';
        link.download = 'aces.apk';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [autoDownloadAttempted]);

  const simulateDownload = () => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 12 + 3;
      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(100);
        setDownloadStatus('completed');
        clearInterval(interval);
      } else {
        setProgress(Math.floor(currentProgress));
      }
    }, 400);
  };

  const handleManualDownload = () => {
    if (downloadStatus !== 'downloading') {
      setDownloadStatus('downloading');
      setProgress(0);
      simulateDownload();
      
      const link = document.createElement('a');
      link.href = './aces.apk';
      link.download = 'aces.apk';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const getStatusIcon = () => {
    switch (downloadStatus) {
      case 'preparing':
        return <Clock className="w-10 h-10 text-teal-500 animate-spin" />;
      case 'downloading':
        return <Download className="w-10 h-10 text-teal-500 animate-bounce" />;
      case 'completed':
        return <CheckCircle className="w-10 h-10 text-green-500" />;
      case 'error':
        return <AlertTriangle className="w-10 h-10 text-red-500" />;
      default:
        return <Download className="w-10 h-10 text-teal-500" />;
    }
  };

  const getStatusMessage = () => {
    switch (downloadStatus) {
      case 'preparing':
        return 'Preparing your ACES Mobile App...';
      case 'downloading':
        return `Downloading ACES Mobile App... ${progress}%`;
      case 'completed':
        return 'ACES Mobile App downloaded successfully!';
      case 'error':
        return 'Download failed. Please try again.';
      default:
        return 'Ready to download ACES Mobile App';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600/10 to-blue-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-teal-100 text-teal-800 text-sm font-medium mb-6">
              <Zap className="w-4 h-4 mr-2" />
              Mobile App Storage Hub
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Learn More with the{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
                ACES
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
                Mobile App
              </span>
            </h1>
           
          </div>

          {/* App Preview Section */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 mb-20">
           

            {/* Download Section */}
            <div className="flex-1 max-w-md w-full">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                {/* Header */}
                <div className="bg-gradient-to-r from-teal-600 to-blue-600 p-8 text-white text-center">
                  <div className="mb-4">
                    {getStatusIcon()}
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Download Now</h2>
                  <p className="text-teal-100 text-sm">
                    {getStatusMessage()}
                  </p>
                </div>

                {/* Content */}
                <div className="p-8">
                  {/* Progress Bar */}
                  {downloadStatus === 'downloading' && (
                    <div className="mb-6">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Downloading...</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-teal-500 to-blue-500 h-3 rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Download Button */}
                  <button
                    onClick={handleManualDownload}
                    disabled={downloadStatus === 'downloading'}
                    className={`w-full py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
                      downloadStatus === 'downloading'
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white shadow-xl hover:shadow-2xl'
                    }`}
                  >
                    {downloadStatus === 'downloading' ? (
                      <div className="flex items-center justify-center">
                        <Download className="w-6 h-6 mr-3 animate-bounce" />
                        Downloading...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Download className="w-6 h-6 mr-3" />
                        Download Now
                      </div>
                    )}
                  </button>

                  {/* Benefits */}
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                      Personalized Learning Reminders
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Academic and Tech Learning Resources
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      Class Reminders
                    </div>
                  </div>

                  {/* Installation Instructions Toggle */}
                  <button
                    onClick={() => setShowInstructions(!showInstructions)}
                    className="w-full mt-6 py-3 text-teal-600 hover:text-teal-800 transition-colors duration-200 text-sm font-medium border border-teal-200 hover:border-teal-300 rounded-xl"
                  >
                    {showInstructions ? 'Hide' : 'Show'} Installation Guide
                  </button>

                  {/* Installation Instructions */}
                  {showInstructions && (
                    <div className="mt-6 p-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl">
                      <div className="flex items-start mb-4">
                        <Shield className="w-6 h-6 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <h3 className="font-bold text-amber-800 mb-3">
                            Android Installation Steps:
                          </h3>
                          <ol className="text-amber-700 space-y-2 list-decimal list-inside text-sm">
                            <li>Open Settings → Security & Privacy</li>
                            <li>Enable "Install Unknown Apps" for your browser</li>
                            <li>Open the downloaded ACES app file</li>
                            <li>Tap "Install" and follow the prompts</li>
                            <li>Launch ACES Uniben App!</li>
                          </ol>
                        </div>
                      </div>
                      <div className="p-4 bg-white rounded-xl border-l-4 border-amber-500">
                        <p className="text-xs text-amber-800">
                          <strong>Security Note:</strong> Only install APKs from trusted sources. ACES Mobile App is safe and designed to protect your healthcare data.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Success Message */}
                  {downloadStatus === 'completed' && (
                    <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl">
                      <div className="flex items-center">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                        <div>
                          <p className="text-green-800 font-semibold text-sm">
                            Download completed successfully!
                          </p>
                          <p className="text-green-700 text-xs mt-1">
                            Check your Downloads folder and follow the installation steps.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-8 py-4 text-center border-t border-gray-100">
                  <p className="text-xs text-gray-500">
                    ACES Mobile App • aces-mobile-app.apk • Secure & Trusted
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 py-12">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-white mb-4">
            Download now and enjoy the benefits that come with ACES
          </h2>
          <p className="text-teal-100 text-lg">
            Developed with ♥️ by sabiDevs🌍 
          </p>
        </div>
      </div>
    </div>
  );
}