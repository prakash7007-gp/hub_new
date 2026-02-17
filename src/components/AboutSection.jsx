import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

const AboutSection = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const yBackground = useTransform(scrollYProgress, [0, 1], [0, -300]);
    const yImage = useTransform(scrollYProgress, [0, 1], [100, -100]);

    const titleRef = useRef(null);
    const isTitleInView = useInView(titleRef, { once: true, margin: "-100px" });

    return (
        <section ref={containerRef} id="about-section" className="py-60 px-6 md:px-12 relative overflow-hidden bg-transparent">
            {/* Background Kinetic Typography */}
            <div className="absolute inset-x-0 top-1/4 pointer-events-none select-none overflow-hidden h-full">
                <motion.h4
                    style={{ y: yBackground }}
                    className="text-[25vw] font-anton uppercase tracking-tighter leading-none opacity-[0.02] whitespace-nowrap"
                >
                    HUB VISUAL STUDIO ARCHIVE
                </motion.h4>
            </div>

            <div className="max-w-[1600px] mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">

                    {/* Left: Textual Narrative */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2 }}
                        >
                            <div className="flex items-center gap-6 mb-12">
                                <span className="w-16 h-[1px] bg-hub-bronze" />
                                <h2 className="text-hub-bronze text-sm font-black uppercase tracking-[0.8em]">Architects of Motion</h2>
                            </div>

                            <div ref={titleRef} className="space-y-4 mb-16">
                                <RevealText delay={0.2} isInView={isTitleInView}>CRAFTING</RevealText>
                                <RevealText delay={0.4} isInView={isTitleInView} color="text-hub-bronze">VISIBLE</RevealText>
                                <RevealText delay={0.6} isInView={isTitleInView}>LEGACIES.</RevealText>
                            </div>

                            <p className="text-2xl md:text-4xl font-light leading-snug max-w-3xl mb-20 opacity-70">
                                Based in India, we transform raw ambition into
                                <span className="text-white font-bold italic"> cinematic spectacles. </span>
                                With 15+ years of digital mastery, we define the next generation of visual storytelling.
                            </p>

                            <Link to="/about">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-14 py-8 bg-zinc-900 border border-white/10 rounded-full font-black uppercase tracking-[0.4em] text-[10px] flex items-center gap-8 group hover:bg-white hover:text-black transition-all duration-500"
                                >
                                    EXPLORE OUR DNA
                                    <div className="w-12 h-12 rounded-full bg-hub-bronze text-black flex items-center justify-center group-hover:bg-black group-hover:text-hub-bronze transition-colors">
                                        <ArrowRight size={18} />
                                    </div>
                                </motion.button>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right: Immersive Parallax Image */}
                    <div className="lg:col-span-5 relative">
                        <motion.div
                            style={{ y: yImage }}
                            className="relative group rounded-[5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/5"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200"
                                alt="Studio Workspace"
                                className="w-full aspect-[4/5] object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-110 transition-all duration-1000"
                            />

                            {/* Experience Badge */}
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute top-10 right-10 w-40 h-40 rounded-full glass flex items-center justify-center p-8 text-center"
                            >
                                <div>
                                    <div className="text-4xl font-anton text-hub-bronze italic leading-none">15Y</div>
                                    <div className="text-[8px] font-black uppercase tracking-widest mt-2 leading-tight opacity-40">Of Peak <br /> Mastery</div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Floating Label */}
                        <div className="absolute -bottom-10 -left-10 h-60 flex items-center pointer-events-none opacity-20">
                            <span className="text-[10px] font-black uppercase tracking-[1em] -rotate-90 origin-center whitespace-nowrap">
                                AUTHENTICITY / VISION / IMPACT
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const RevealText = ({ children, delay, isInView, color = "text-white" }) => (
    <div className="overflow-hidden">
        <motion.span
            initial={{ y: "100%" }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ duration: 1, delay, ease: [0.19, 1, 0.22, 1] }}
            className={`block text-6xl md:text-[10rem] font-anton leading-[0.75] tracking-tighter ${color} uppercase`}
        >
            {children}
        </motion.span>
    </div>
);

export default AboutSection;
