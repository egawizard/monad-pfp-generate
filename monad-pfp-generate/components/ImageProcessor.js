'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ImageProcessor({ uploadedImage, onReset, isProcessing, setIsProcessing }) {
  const [generatedImage, setGeneratedImage] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState('cool');

  const styles = [
    { id: 'cool', name: 'Cool Cyberpunk', emoji: '🔥' },
    { id: 'funny', name: 'Funny Cartoon', emoji: '😄' },
    { id: 'artistic', name: 'Artistic Oil', emoji: '🎨' },
    { id: 'retro', name: 'Retro 80s', emoji: '🌆' }
  ];

  const handleGenerate = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUrl: uploadedImage.url,
          style: selectedStyle
        }),
      });

      const result = await response.json();
      if (result.success) {
        setGeneratedImage(result.imageUrl);
      }
    } catch (error) {
      console.error('Generation error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = async () => {
    if (generatedImage) {
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `monad_pfp_${Date.now()}.png`;
      link.click();
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Original Image */}
        <div className="bg-gray-800/50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Original Image</h3>
          <div className="aspect-square relative rounded-lg overflow-hidden">
            <Image
              src={uploadedImage.preview}
              alt="Original"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Generated Image */}
        <div className="bg-gray-800/50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">AI Generated</h3>
          <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-700 flex items-center justify-center">
            {generatedImage ? (
              <Image
                src={generatedImage}
                alt="Generated"
                fill
                className="object-cover"
              />
            ) : (
              <div className="text-center text-gray-400">
                <div className="text-4xl mb-2">🤖</div>
                <p>AI magic happens here!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Style Selection */}
      <div className="bg-gray-800/50 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Choose Your Style</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {styles.map((style) => (
            <button
              key={style.id}
              onClick={() => setSelectedStyle(style.id)}
              className={`p-4 rounded-lg transition-all duration-200 ${
                selectedStyle === style.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <div className="text-2xl mb-2">{style.emoji}</div>
              <div className="font-medium">{style.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={onReset}
          className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
        >
          Upload New Image
        </button>
        
        <button
          onClick={handleGenerate}
          disabled={isProcessing}
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Generating...
            </div>
          ) : (
            'Generate AI PFP'
          )}
        </button>

        {generatedImage && (
          <button
            onClick={handleDownload}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors"
          >
            Download
          </button>
        )}
      </div>
    </div>
  );
}