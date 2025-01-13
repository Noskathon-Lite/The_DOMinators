import { Navigate, BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './components/logincomponents/theme-provider';
import MainLayout from './layouts/MainLayout';
import { Dialog } from './components/ui/dialog';
import { Toaster } from './components/ui/toaster';


function App() {

  return (
    <ThemeProvider defaultTheme="system" storageKey="climate-grow-theme">
      <Router>
        <MainLayout />
        <Dialog />
        <Toaster/>
      </Router>
    </ThemeProvider>
  );
}

export default App;