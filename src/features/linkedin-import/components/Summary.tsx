/**
 * Summary component to display analysis results
 * Shows parsed data with metrics and top companies list
 */

import React from 'react';
import { Card } from '@/shared/components/Card';
import { Button } from '@/shared/components/Button';
import type { LinkedInConnection, CompanyCount } from '@/shared/types';
import './Summary.css';

interface SummaryProps {
  totalRows: number;
  validConnections: LinkedInConnection[];
  onReset: () => void;
}

export const Summary: React.FC<SummaryProps> = ({ totalRows, validConnections, onReset }) => {
  // Calculate top 10 companies
  const companyMap = new Map<string, number>();
  validConnections.forEach((conn) => {
    if (conn.company) {
      companyMap.set(conn.company, (companyMap.get(conn.company) || 0) + 1);
    }
  });

  const topCompanies: CompanyCount[] = Array.from(companyMap.entries())
    .map(([company, count]) => ({ company, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const errorCount = totalRows - validConnections.length;

  return (
    <Card variant="elevated">
      <div className="summary-header">
        <div>
          <h3>Analysis Summary</h3>
          <p className="text-secondary">Results from your LinkedIn export</p>
        </div>
        <Button variant="ghost" onClick={onReset} size="sm">
          Clear & Reset
        </Button>
      </div>

      <div className="summary-metrics">
        <div className="metric-card">
          <p className="metric-label">Total Rows</p>
          <p className="metric-value">{totalRows}</p>
        </div>

        <div className="metric-card">
          <p className="metric-label">Valid Connections</p>
          <p className="metric-value metric-success">{validConnections.length}</p>
        </div>

        {errorCount > 0 && (
          <div className="metric-card">
            <p className="metric-label">Parsing Errors</p>
            <p className="metric-value metric-error">{errorCount}</p>
          </div>
        )}
      </div>

      {topCompanies.length > 0 && (
        <div className="summary-section">
          <h4>Top Companies</h4>
          <div className="company-list">
            {topCompanies.map((item, idx) => (
              <div key={idx} className="company-item">
                <div className="company-rank">{idx + 1}</div>
                <div className="company-info">
                  <p className="company-name">{item.company || 'Not specified'}</p>
                </div>
                <div className="company-count">{item.count}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {topCompanies.length === 0 && validConnections.length > 0 && (
        <div className="summary-empty">
          <p>No company information available in the CSV.</p>
        </div>
      )}
    </Card>
  );
};
