import { useState } from 'react'
import { motion } from 'framer-motion'

const MagneticButton = ({ children, className = "", onClick }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const { clientX, clientY, currentTarget } = e;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        setPosition({ x: x * 0.35, y: y * 0.35 });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.button
            animate={{ x: position.x, y: position.y }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={`relative flex items-center justify-center transition-all duration-300 ${className}`}
            onClick={onClick}
        >
            <span className="relative z-10">{children}</span>
        </motion.button>
    );
};

export default MagneticButton;
