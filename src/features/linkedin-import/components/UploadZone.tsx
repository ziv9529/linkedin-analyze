/**
 * Upload Zone component for LinkedIn CSV file
 * Handles file input with drag & drop support and theme integration
 */

import React, { useRef } from 'react';
import { Card } from '@/shared/components/Card';
import { Button } from '@/shared/components/Button';
import './UploadZone.css';

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  isLoading?: boolean;
}

export const UploadZone: React.FC<UploadZoneProps> = ({ onFileSelect, isLoading = false }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragActive, setIsDragActive] = React.useState(false);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      onFileSelect(files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      onFileSelect(files[0]);
    }
  };

  return (
    <Card variant="elevated">
      <h3>Upload Connections.csv</h3>
      <p className="text-secondary mb-4">
        Select your LinkedIn connections export file to begin analysis
      </p>

      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`upload-zone ${isDragActive ? 'is-active' : ''} ${isLoading ? 'is-loading' : ''}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleChange}
          className="upload-zone-input"
          disabled={isLoading}
        />

        <div className="upload-zone-content">
          <svg
            className="upload-zone-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>

          <p className="upload-zone-text">
            {isDragActive ? 'Drop your CSV file here' : 'Drag & drop your Connections.csv here'}
          </p>
          <p className="upload-zone-divider">or</p>

          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            isLoading={isLoading}
          >
            {isLoading ? 'Processing...' : 'Select File'}
          </Button>
        </div>
      </div>
    </Card>
  );
};
