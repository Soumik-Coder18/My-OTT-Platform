import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Header from './components/Header';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="pt-16 min-h-screen bg-[#DED3C4] text-[#555879]">
        <AppRoutes />
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
