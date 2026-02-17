import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import MagneticButton from './MagneticButton'

const Navbar = ({ theme, toggleTheme }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const menuItems = [
        { name: 'Home', href: '/' },
        { name: 'Services', href: '/services' },
        { name: 'Portfolio', href: '/portfolio' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? (theme === 'dark' ? 'bg-hub-black/95 backdrop-blur-2xl py-4 border-b border-white/5' : 'bg-white/95 backdrop-blur-2xl py-4 border-b border-black/5 shadow-sm') : 'bg-transparent py-8'} px-6 md:px-12 flex items-center justify-between`}>
            <Link to="/" className="w-56">
                <motion.img
                    src="/images/favicon.png"
                    alt="HUB"
                    className={`h-20 w-auto object-contain transition-all duration-500 drop-shadow-xl ${isScrolled ? 'scale-90' : 'scale-110'}`}
                />
            </Link>

            <div className="hidden lg:flex items-center justify-center gap-10">
                {menuItems.map((item) => (
                    <Link
                        key={item.name}
                        to={item.href}
                        className={`text-[17px] font-black uppercase tracking-[0.4em] hover:text-hub-bronze transition-all relative group ${theme === 'dark' ? 'text-white' : 'text-black'} ${location.pathname === item.href ? 'text-hub-bronze' : ''}`}
                    >
                        {item.name}
                        <span className={`absolute -bottom-2 left-0 h-[1.5px] bg-hub-bronze transition-all duration-300 ${location.pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                    </Link>
                ))}
            </div>

            <div className="w-48 flex items-center justify-end gap-6 md:gap-8">
                <button onClick={toggleTheme} className={`p-3 rounded-full transition-all duration-300 ${theme === 'dark' ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-black/5 hover:bg-black/10 text-black'}`}>
                    {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <div className="lg:hidden">
                    <MagneticButton className={`w-14 h-14 rounded-full ${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'}`} onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </MagneticButton>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`fixed inset-0 ${theme === 'dark' ? 'bg-hub-black text-white' : 'bg-white text-black'} z-[60] flex flex-col items-center justify-center p-10 font-inter`}
                    >
                        <button onClick={() => setIsOpen(false)} className="absolute top-10 right-10 p-4"><X size={40} /></button>
                        <div className="flex flex-col items-center gap-8">
                            <img src="/images/favicon.png" alt="HUB_VISUAL_STUDIO" className="w-24 h-24 mb-6 object-contain" />
                            {menuItems.map((item, i) => (
                                <motion.div key={item.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                                    <Link
                                        to={item.href}
                                        className="text-5xl font-black uppercase tracking-tighter hover:text-hub-bronze transition-colors flex items-center gap-4"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <span className="text-xs opacity-30">/ 0{i + 1}</span>{item.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
