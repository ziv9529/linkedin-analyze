/**
 * Main App Shell
 * Wraps the application with theme context provider
 */

import { ThemeProvider } from '@/shared/context/ThemeContext';
import { ConnectionsAnalyzerPage } from '@/pages/ConnectionsAnalyzerPage';

function App() {
  return (
    <ThemeProvider>
      <ConnectionsAnalyzerPage />
    </ThemeProvider>
  );
}

export default App;
