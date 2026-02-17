import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useRef } from 'react'

const works = [
    { title: "Neon Nights", category: "Cinematics", year: "2025", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200" },
    { title: "Fluid Motion", category: "VFX / 3D", year: "2024", img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=1200" },
    { title: "Apex Branding", category: "Identity", year: "2025", img: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=1200" },
    { title: "Digital Pulse", category: "Social Media", year: "2026", img: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1200" },
    { title: "Oceanic Flow", category: "Color Grading", year: "2025", img: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&q=80&w=1200" },
    { title: "Urban Echo", category: "Sound Design", year: "2024", img: "https://images.unsplash.com/photo-1579165466541-7482affbd781?auto=format&fit=crop&q=80&w=1200" }
];

const PortfolioPage = () => {
    return (
        <main className="pt-40 pb-20 px-6 md:px-12 bg-zinc-950 min-h-screen">
            <div className="max-w-[1600px] mx-auto">
                {/* Header Section */}
                <div className="mb-32 relative overflow-hidden p-20 glass rounded-[4rem]">
                    <div className="absolute top-0 right-0 text-[20vw] font-black opacity-[0.03] select-none uppercase pointer-events-none">Works</div>
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-hub-bronze text-xs font-black uppercase tracking-[0.6em] mb-10"
                    >
                        Portfolio
                    </motion.h2>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-7xl md:text-[10rem] font-anton leading-[0.8] uppercase tracking-tighter"
                    >
                        SELECTED <br /> <span className="text-hub-bronze">ARCHIVES.</span>
                    </motion.h1>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
                    {works.map((work, idx) => (
                        <PortfolioItem key={idx} work={work} idx={idx} />
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-60 text-center py-40 border-t border-white/5">
                    <h3 className="text-4xl md:text-7xl font-anton uppercase tracking-tight mb-12">
                        YOUR VISION <br /> <span className="text-white/40 italic">OUR EXPERTISE.</span>
                    </h3>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="px-16 py-8 bg-hub-bronze text-black rounded-full font-black uppercase tracking-[0.4em] text-xs shadow-2xl"
                    >
                        START COLLABORATION
                    </motion.button>
                </div>
            </div>

            <footer className="py-20 px-10 text-center opacity-30 font-black uppercase tracking-widest text-[10px] mt-40">
                HUB VISUAL STUDIO © 2026
            </footer>
        </main>
    );
};

const PortfolioItem = ({ work, idx }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

    return (
        <motion.div
            ref={ref}
            style={{ scale }}
            className="group cursor-none relative"
        >
            <div className="aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-[3rem] relative shadow-2xl">
                <motion.img
                    style={{ y }}
                    src={work.img}
                    alt={work.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                />

                {/* Information Overlay */}
                <div className="absolute inset-x-8 bottom-8 z-10">
                    <div className="flex justify-between items-end">
                        <div>
                            <span className="text-hub-bronze text-[10px] font-black uppercase tracking-widest mb-2 block">/ 0{idx + 1}</span>
                            <h4 className="text-4xl md:text-5xl font-anton uppercase text-white group-hover:tracking-wider transition-all duration-500">
                                {work.title}
                            </h4>
                        </div>
                        <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-10 group-hover:translate-y-0">
                            <ArrowUpRight size={24} />
                        </div>
                    </div>
                </div>

                {/* Gradient Shadow */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:opacity-60 transition-opacity" />
            </div>

            <div className="mt-8 flex justify-between items-center px-4">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">{work.category}</span>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-20">EST. {work.year}</span>
            </div>
        </motion.div>
    );
};

export default PortfolioPage;
