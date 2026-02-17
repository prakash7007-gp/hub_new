import { motion } from 'framer-motion'
import { MessageCircle, Phone } from 'lucide-react'

const FloatingCTA = ({ theme }) => (
    <div className="fixed bottom-10 right-6 md:right-10 z-[100] flex flex-col gap-5">
        <motion.a whileHover={{ scale: 1.15 }} href="https://wa.me/+919445224494" target="_blank" rel="noopener noreferrer" className="w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl"><MessageCircle size={30} /></motion.a>
        <motion.a whileHover={{ scale: 1.15 }} href="tel:+919445224494" className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all ${theme === 'dark' ? 'bg-hub-bronze text-black' : 'bg-black text-white'}`}><Phone size={28} /></motion.a>
    </div>
);

export default FloatingCTA;
