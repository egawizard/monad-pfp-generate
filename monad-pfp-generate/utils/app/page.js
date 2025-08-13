'use client';

import { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import ImageProcessor from '../components/ImageProcessor';
import Footer from '../components/Footer';

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent mb-4">
          MONAD PFP GENERATE
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Transform your photos into amazing AI-generated profile pictures. 
          Upload your image and let AI create something incredible!
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {!uploadedImage ? (
          <ImageUploader onImageUpload={setUploadedImage} />
        ) : (
          <ImageProcessor 
            uploadedImage={uploadedImage} 
            onReset={() => setUploadedImage(null)}
            isProcessing={isProcessing}
            setIsProcessing={setIsProcessing}
          />
        )}
      </div>

      <Footer />
    </main>
  );
}