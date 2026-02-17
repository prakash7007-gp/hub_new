import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import FloatingCTA from './components/FloatingCTA'
import Home from './pages/Home'
import ServicesPage from './pages/ServicesPage'
import ContactPage from './pages/ContactPage'
import AboutPage from './pages/AboutPage'
import PortfolioPage from './pages/PortfolioPage'

export default function App() {
    const [theme, setTheme] = useState('dark');

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
    };

    return (
        <div className={`min-h-screen w-full relative overflow-x-hidden ${theme === 'dark' ? 'bg-hub-black text-white' : 'bg-white text-black'} transition-colors duration-700 font-inter scroll-smooth`}>
            <Navbar theme={theme} toggleTheme={toggleTheme} />
            <FloatingCTA theme={theme} />

            <Routes>
                <Route path="/" element={<Home theme={theme} />} />
                <Route path="/services" element={<ServicesPage theme={theme} />} />
                <Route path="/portfolio" element={<PortfolioPage theme={theme} />} />
                <Route path="/about" element={<AboutPage theme={theme} />} />
                <Route path="/contact" element={<ContactPage theme={theme} />} />
            </Routes>

            <style dangerouslySetInnerHTML={{
                __html: `
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Anton&family=Outfit:wght@400;700;900&display=swap');
                body { font-family: 'Outfit', sans-serif; overflow-x: hidden; }
                .font-anton { font-family: 'Anton', sans-serif; }
                .bg-radial-gradient { background: radial-gradient(circle at center, var(--tw-gradient-from) 0%, var(--tw-gradient-to) 100%); }
                ::selection { background: #B28B67; color: #fff; }
                .shadow-text { text-shadow: 20px 20px 60px rgba(0,0,0,0.1); }
            `}} />
        </div>
    );
}
