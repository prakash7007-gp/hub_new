import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import MagneticButton from './MagneticButton'
import HangingLamp from './HangingLamp'

const HeroTextReveal = ({ theme }) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.7], [0, 1, 1, 0.5]);

    return (
        <div ref={containerRef} className="relative z-10 w-full select-none mt-20">
            {/* Hanging Lamp Feature */}
            <div className="absolute top-[-150px] right-0 w-1/3 h-[120%] hidden lg:block pointer-events-none">
                <HangingLamp theme={theme} />
            </div>

            <motion.div style={{ y, opacity }} className="flex flex-col items-start w-full relative z-10">
                <h2 className="text-hub-bronze text-sm md:text-lg font-black uppercase tracking-[0.5em] mb-4">
                    Creative Media Studio
                </h2>

                <div className="relative w-full">
                    <motion.h1
                        className={`text-[20vw] md:text-[14rem] font-black leading-[0.75] tracking-tighter uppercase relative ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                    >
                        <span className="absolute inset-0 opacity-[0.03] pointer-events-none">HUB</span>
                        <motion.span
                            initial={{ clipPath: 'inset(100% 0 0 0)' }}
                            animate={{ clipPath: 'inset(0% 0 0 0)' }}
                            transition={{ duration: 1.5, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
                            className="relative block"
                        >
                            HUB
                        </motion.span>

                        <div className="relative mt-2 flex items-baseline gap-6">
                            <div className="relative">
                                <span className="absolute inset-0 opacity-[0.03] pointer-events-none text-hub-bronze uppercase text-[12vw] md:text-[10rem]">VISUAL</span>
                                <motion.span
                                    initial={{ clipPath: 'inset(100% 0 0 0)' }}
                                    animate={{ clipPath: 'inset(0% 0 0 0)' }}
                                    transition={{ duration: 1.5, delay: 0.6, ease: [0.19, 1, 0.22, 1] }}
                                    className="text-hub-bronze relative block text-[12vw] md:text-[10rem]"
                                >
                                    VISUAL
                                </motion.span>
                            </div>
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.2, duration: 1 }}
                                className={`text-[4vw] md:text-[3.5rem] font-medium uppercase tracking-[0.2em] ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}
                            >
                                studio
                            </motion.span>
                        </div>
                    </motion.h1>

                </div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.2, duration: 1 }}
                    className="max-w-2xl text-sm md:text-lg opacity-40 mt-12 md:mt-16 uppercase tracking-[0.25em] leading-relaxed font-bold"
                >
                    Elevating brands through cinematic storytelling & cutting-edge visual design. Based in India.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="mt-12 w-full sm:w-auto"
                >
                    <MagneticButton className={`px-12 py-7 rounded-full font-black uppercase tracking-[0.3em] text-[14px] shadow-2xl transition-all duration-500 hover:scale-105 ${theme === 'dark' ? 'bg-hub-bronze text-black' : 'bg-black text-white'}`}>
                        <div className="flex items-center gap-2 whitespace-nowrap">
                            START A PROJECT <ArrowRight size={18} className="translate-y-[1px]" />
                        </div>
                    </MagneticButton>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default HeroTextReveal;
