import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import MainLayout from '@/layouts/MainLayout';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="climate-grow-theme">
      <Router>
        <MainLayout />
      </Router>
    </ThemeProvider>
  );
}

export default App;