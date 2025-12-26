/**
 * Domain types for LinkedIn Connections data
 */

export interface LinkedInConnection {
  firstName: string;
  lastName: string;
  company?: string;
  position?: string;
  connectedOn?: string;
}

export interface ParseResult {
  success: boolean;
  totalRows: number;
  validConnections: LinkedInConnection[];
  errors: string[];
}

export interface CompanyCount {
  company: string;
  count: number;
}
