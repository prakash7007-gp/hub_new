import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { servicesData } from './ServicesSection'

const CarouselServices = ({ title, preTitle, autoPlay = false }) => {
    const [index, setIndex] = useState(0);
    const containerRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Track width for drag constraints
    useEffect(() => {
        if (containerRef.current) {
            setContainerWidth(containerRef.current.offsetWidth);
        }
        const handleResize = () => {
            if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const next = () => {
        setIndex((prevIndex) => (prevIndex < servicesData.length - 1 ? prevIndex + 1 : 0));
    };

    const prev = () => {
        setIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : servicesData.length - 1));
    };

    // Auto-play Logic
    useEffect(() => {
        if (!autoPlay || isPaused) return;
        const interval = setInterval(next, 3000); // 3 seconds per slide
        return () => clearInterval(interval);
    }, [autoPlay, isPaused]);

    return (
        <section className="py-32 px-6 md:px-12 bg-zinc-950 overflow-hidden relative">
            {/* Background Text Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-black opacity-[0.02] pointer-events-none select-none uppercase tracking-tighter whitespace-nowrap">
                Services
            </div>

            <div className="max-w-[1600px] mx-auto relative z-10">
                {/* Header Information */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-10">
                    <div className="max-w-2xl">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-hub-bronze text-xs md:text-sm font-black uppercase tracking-[0.8em] mb-6"
                        >
                            {preTitle || "Explore Our Capabilities"}
                        </motion.h2>
                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]"
                        >
                            {title || <>Tailored <br /> <span className="text-hub-bronze">Experiences.</span></>}
                        </motion.h3>
                    </div>

                    <div className="flex gap-4">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={prev}
                            className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center hover:bg-hub-bronze hover:text-black transition-colors"
                        >
                            <ChevronLeft size={24} />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={next}
                            className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center hover:bg-hub-bronze hover:text-black transition-colors"
                        >
                            <ChevronRight size={24} />
                        </motion.button>

                        {/* AutoPlay Indicator (Pause/Play) if enabled */}
                        {autoPlay && (
                            <button
                                onClick={() => setIsPaused(!isPaused)}
                                className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors text-xs font-black uppercase tracking-widest text-white/50"
                            >
                                {isPaused ? "PLAY" : "PAUSE"}
                            </button>
                        )}
                    </div>
                </div>

                {/* Carousel Viewport */}
                <div
                    ref={containerRef}
                    className="relative cursor-grab active:cursor-grabbing"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <motion.div
                        animate={{ x: `calc(-${index * (100 / (containerWidth < 768 ? 1 : 3))}% - ${index * 32}px)` }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="flex gap-8"
                    >
                        {servicesData.map((service, idx) => (
                            <ServiceItem
                                key={idx}
                                service={service}
                                isActive={index === idx}
                                index={idx}
                                autoPlay={autoPlay}
                            />
                        ))}
                    </motion.div>
                </div>

                {/* Counter / Progress */}
                <div className="mt-20 flex items-center justify-between">
                    <div className="flex items-center gap-10">
                        <span className="text-4xl font-anton text-hub-bronze leading-none">
                            {String(index + 1).padStart(2, '0')}
                        </span>
                        <div className="w-40 h-[1px] bg-white/10 relative">
                            {/* Base Progress */}
                            <motion.div
                                animate={{ width: `${((index + 1) / servicesData.length) * 100}%` }}
                                className="absolute top-0 left-0 h-full bg-hub-bronze shadow-[0_0_10px_#B28B67]"
                            />

                            {/* Timer Progress (Only if AutoPlay is Active) */}
                            {autoPlay && !isPaused && (
                                <motion.div
                                    key={index}
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 3, ease: "linear" }}
                                    className="absolute -top-[1px] left-0 h-[3px] bg-white mix-blend-overlay"
                                />
                            )}
                        </div>
                        <span className="text-xl font-bold opacity-30">
                            {String(servicesData.length).padStart(2, '0')}
                        </span>
                    </div>

                    <span className="hidden md:block text-[10px] font-black uppercase tracking-[0.4em] opacity-40">
                        {autoPlay ? "Auto-Cycling Active" : "Slide to explore more services"}
                    </span>
                </div>
            </div>
        </section>
    );
};

const ServiceItem = ({ service, isActive, index, autoPlay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className={`flex-shrink-0 w-full md:w-[calc(33.33%-22px)] h-[500px] md:h-[650px] relative group overflow-hidden rounded-[3rem] border border-white/5 bg-zinc-900 transition-all duration-700`}
        >
            {/* Image Layer */}
            <motion.div className="absolute inset-0 z-0">
                <img
                    src={service.image}
                    alt={service.name}
                    className={`w-full h-full object-cover transition-all duration-1000 
                        ${autoPlay && isActive ? 'grayscale-0 brightness-110 scale-110' : 'grayscale brightness-[0.3]'} 
                        ${!autoPlay ? 'group-hover:grayscale-0 group-hover:brightness-75 group-hover:scale-110' : ''}`}
                />
            </motion.div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />

            {/* Content */}
            <div className="absolute inset-0 p-10 flex flex-col justify-between z-20">
                <div className={`flex justify-between items-start transition-all duration-500
                    ${autoPlay && isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'}`}>

                    <div className="flex flex-wrap gap-2">
                        {service.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-white/5 backdrop-blur-md rounded-full text-[8px] font-bold uppercase tracking-widest text-white/80">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-hub-bronze opacity-80">
                        #{String(index + 1).padStart(2, '0')}
                    </span>
                </div>

                <div>
                    <h4 className={`text-4xl md:text-5xl font-anton uppercase text-white leading-tight mb-6 transition-transform duration-500
                        ${autoPlay && isActive ? '-translate-y-2' : 'transform group-hover:-translate-y-2'}`}>
                        {service.name.split(' ').map((word, i) => (
                            <span key={i} className="block">{word}</span>
                        ))}
                    </h4>

                    <motion.div
                        className={`mt-6 flex items-center gap-4 text-hub-bronze font-black text-[10px] uppercase tracking-[0.4em] transition-all duration-500
                            ${autoPlay && isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                    >
                        LEARN MORE <ArrowRight size={14} />
                    </motion.div>
                </div>
            </div>

            {/* Animation Effect: Running Border Trace for AutoPlay Active Item */}
            {autoPlay && isActive && (
                <div className="absolute inset-0 z-30 pointer-events-none">
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <motion.path
                            d="M0,0 L100,0 L100,100 L0,100 Z"
                            fill="none"
                            stroke="#B28B67"
                            strokeWidth="2"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 3, ease: "linear", repeat: Infinity }}
                            vectorEffect="non-scaling-stroke" // Ensure stroke width stays consistent
                        />
                    </svg>
                </div>
            )}

            {/* Default Hover Border */}
            <div className="absolute inset-0 border border-white/0 group-hover:border-hub-bronze/30 rounded-[3rem] transition-all duration-500" />
        </motion.div>
    );
};

export default CarouselServices;
