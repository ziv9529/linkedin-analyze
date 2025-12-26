/**
 * Connections Analyzer Page - Main application interface
 * Orchestrates file upload, parsing, and analysis display
 */

import React, { useState } from 'react';
import { UploadZone } from '@/features/linkedin-import/components/UploadZone';
import { Summary } from '@/features/linkedin-import/components/Summary';
import { parseConnectionsCsv } from '@/features/linkedin-import/parseConnectionsCsv';
import { Card } from '@/shared/components/Card';
import { ThemeToggle } from '@/shared/components/ThemeToggle';
import type { LinkedInConnection } from '@/shared/types';
import './ConnectionsAnalyzerPage.css';

export const ConnectionsAnalyzerPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [validConnections, setValidConnections] = useState<LinkedInConnection[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);

  const handleFileSelect = async (file: File) => {
    setIsLoading(true);
    setErrors([]);

    try {
      const result = await parseConnectionsCsv(file);

      if (result.success) {
        setValidConnections(result.validConnections);
        setTotalRows(result.totalRows);
        if (result.errors.length > 0) {
          setErrors(result.errors);
        }
      } else {
        setErrors(result.errors);
        setValidConnections([]);
        setTotalRows(0);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error occurred';
      setErrors([`Failed to parse file: ${errorMsg}`]);
      setValidConnections([]);
      setTotalRows(0);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setValidConnections([]);
    setTotalRows(0);
    setErrors([]);
  };

  return (
    <div className="page-container">
      {/* Header with Theme Toggle */}
      <header className="page-header">
        <div className="header-content">
          <div>
            <h1>LinkedIn Connections Analyzer</h1>
            <p className="header-subtitle">Privacy-first analysis of your network</p>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="page-main">
        {/* Getting Started Guide */}
        {totalRows === 0 && (
          <Card variant="elevated" className="guide-card">
            <h3>How to Get Your Data</h3>
            <ol className="steps-list">
              <li>
                <span className="step-number">1</span>
                <span className="step-text">
                  Go to <strong>LinkedIn → Settings & Privacy → Data privacy</strong>
                </span>
              </li>
              <li>
                <span className="step-number">2</span>
                <span className="step-text">
                  Click <strong>Get a copy of your data</strong>
                </span>
              </li>
              <li>
                <span className="step-number">3</span>
                <span className="step-text">
                  Request your <strong>Connections export</strong> and download the CSV file
                </span>
              </li>
              <li>
                <span className="step-number">4</span>
                <span className="step-text">
                  Upload the <strong>Connections.csv</strong> file below
                </span>
              </li>
            </ol>
          </Card>
        )}

        {/* Upload Zone */}
        {totalRows === 0 && <UploadZone onFileSelect={handleFileSelect} isLoading={isLoading} />}

        {/* Error Messages */}
        {errors.length > 0 && (
          <Card variant="outlined" className="error-card">
            <h4>Issues Found</h4>
            <ul className="error-list">
              {errors.map((error, idx) => (
                <li key={idx}>
                  <span className="error-icon">!</span>
                  <span>{error}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}

        {/* Results Summary */}
        {totalRows > 0 && (
          <Summary
            totalRows={totalRows}
            validConnections={validConnections}
            onReset={handleReset}
          />
        )}
      </main>
    </div>
  );
};
