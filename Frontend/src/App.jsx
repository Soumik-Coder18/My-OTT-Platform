import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Header from './components/Header';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Header />
          <main className="pt-16 min-h-screen bg-transparent text-[#2E004F]">
            <AppRoutes />
          </main>
          <Footer />
          <Chatbot />
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
