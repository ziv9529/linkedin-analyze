/**
 * CSV Parser for LinkedIn Connections export
 * Handles parsing and validation of LinkedIn CSV files
 */

import Papa from 'papaparse';
import { LinkedInConnectionSchema } from '@/shared/schemas';
import type { LinkedInConnection, ParseResult } from '@/shared/types';

/**
 * Map potential column name variations from LinkedIn CSV
 */
const normalizeColumnName = (col: string): string => {
  return col
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]/g, '');
};

const COLUMN_ALIASES: Record<string, string> = {
  firstname: 'firstName',
  lastname: 'lastName',
  company: 'company',
  position: 'position',
  title: 'position',
  connectedon: 'connectedOn',
  dateconnected: 'connectedOn',
};

/**
 * Parse a LinkedIn Connections CSV file
 * @param file - CSV file from LinkedIn export
 * @returns ParseResult with validated connections or errors
 */
export const parseConnectionsCsv = async (file: File): Promise<ParseResult> => {
  return new Promise((resolve) => {
    if (!file.name.toLowerCase().endsWith('.csv')) {
      resolve({
        success: false,
        totalRows: 0,
        validConnections: [],
        errors: ['Invalid file type. Please upload a .csv file.'],
      });
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const errors: string[] = [];
        const validConnections: LinkedInConnection[] = [];

        if (!results.data || results.data.length === 0) {
          resolve({
            success: false,
            totalRows: 0,
            validConnections: [],
            errors: ['CSV file is empty.'],
          });
          return;
        }

        // Normalize column headers
        const normalizedData = (results.data as Record<string, string>[]).map((row) => {
          const normalized: Record<string, string> = {};
          for (const [key, value] of Object.entries(row)) {
            const normalized_key =
              COLUMN_ALIASES[normalizeColumnName(key)] || normalizeColumnName(key);
            // Map back to camelCase if it matches a known column
            if (normalized_key.match(/firstname|lastname|company|position|connectedon/)) {
              const camelKey =
                Object.entries(COLUMN_ALIASES).find(([, v]) => v === normalized_key)?.[1] ||
                normalized_key;
              normalized[camelKey] = String(value || '').trim();
            }
          }
          return normalized;
        });

        // Validate each row
        normalizedData.forEach((row, index) => {
          const validationResult = LinkedInConnectionSchema.safeParse(row);
          if (validationResult.success) {
            validConnections.push(validationResult.data);
          } else {
            errors.push(`Row ${index + 2}: Missing required fields (First Name and/or Last Name)`);
          }
        });

        resolve({
          success: validConnections.length > 0,
          totalRows: results.data.length,
          validConnections,
          errors: errors.length > 0 ? errors.slice(0, 5) : [], // Show first 5 errors only
        });
      },
      error: (error) => {
        resolve({
          success: false,
          totalRows: 0,
          validConnections: [],
          errors: [`CSV parsing error: ${error.message}`],
        });
      },
    });
  });
};
