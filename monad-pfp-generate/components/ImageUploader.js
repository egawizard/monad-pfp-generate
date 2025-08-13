'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function ImageUploader({ onImageUpload }) {
  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();
        if (result.success) {
          onImageUpload({
            file: file,
            url: result.imageUrl,
            preview: URL.createObjectURL(file)
          });
        }
      } catch (error) {
        console.error('Upload error:', error);
      }
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    multiple: false
  });

  return (
    <div className="flex items-center justify-center">
      <div
        {...getRootProps()}
        className={`w-full max-w-md mx-auto p-12 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-300 ${
          isDragActive 
            ? 'border-purple-400 bg-purple-900/20' 
            : 'border-gray-600 hover:border-purple-500 bg-gray-800/50'
        }`}
      >
        <input {...getInputProps()} />
        <div className="text-center">
          <div className="mb-4">
            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-lg text-gray-300 mb-2">
            {isDragActive ? 'Drop your image here!' : 'Upload your profile picture'}
          </p>
          <p className="text-sm text-gray-500">
            Drag & drop or click to select (PNG, JPG, GIF)
          </p>
        </div>
      </div>
    </div>
  );
}