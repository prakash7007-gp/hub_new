import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Target, Zap, MousePointer2, Layers, Globe, Shield, Zap as Energy } from 'lucide-react'
import { useRef } from 'react'

const AboutPage = ({ theme }) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const yBackground = useTransform(scrollYProgress, [0, 1], [0, 500]);

    return (
        <main ref={containerRef} className="bg-zinc-950 text-white selection:bg-hub-bronze">

            {/* 1. CINEMATIC HERO */}
            <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <motion.div style={{ y: yBackground }} className="absolute -top-20 -right-20 text-[35vw] font-black opacity-[0.02] uppercase leading-none select-none italic">
                        Legacy
                    </motion.div>
                </div>

                <div className="max-w-[1600px] mx-auto relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-hub-bronze text-xs font-black uppercase tracking-[1em] mb-12"
                    >
                        Our DNA / Purpose
                    </motion.h2>
                    <h1 className="text-[14vw] md:text-[12rem] font-anton leading-[0.75] uppercase tracking-tighter mb-20">
                        WE ARCHITECT <br />
                        <span className="text-hub-bronze">VISIBLE MOTION.</span>
                    </h1>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-xl md:text-4xl font-light leading-snug opacity-80"
                        >
                            Hub Visual Studio is a premium production house dedicated to
                            crafting high-fidelity visual experiences for brands that
                            demand the extraordinary.
                        </motion.p>
                        <div className="flex flex-col justify-end">
                            <div className="pl-10 border-l border-hub-bronze/30">
                                <span className="block text-[10px] font-black uppercase tracking-widest opacity-40 mb-4">Operations</span>
                                <span className="block text-2xl font-bold">India / Global Presence</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. THE VISION (PARALLAX SPLIT) */}
            <section className="py-60 px-6 md:px-12 relative">
                <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="relative aspect-square rounded-[4rem] overflow-hidden glass"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200"
                            alt="Studio"
                            className="w-full h-full object-cover grayscale brightness-50"
                        />
                        <div className="absolute inset-0 bg-hub-bronze/10 mix-blend-overlay" />
                    </motion.div>

                    <div className="space-y-12">
                        <h3 className="text-4xl md:text-7xl font-anton uppercase leading-tight">
                            BEYOND THE <br /> <span className="text-hub-bronze italic">CONVENTIONAL.</span>
                        </h3>
                        <p className="text-xl md:text-2xl opacity-60 leading-relaxed font-medium">
                            Our philosophy is simple: Every frame must serve a purpose. We don't just "edit" or "animate";
                            we sculpt narratives that leave a lasting psychological impact on the viewer.
                        </p>
                        <div className="grid grid-cols-2 gap-10 pt-10 border-t border-white/5">
                            <Stat label="Creative Logic" value="100%" />
                            <Stat label="Project Mastery" value="15Y+" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. CORE PRINCIPLES (KINETIC CARDS) */}
            <section className="py-60 bg-zinc-900/50">
                <div className="max-w-[1600px] mx-auto px-6">
                    <h3 className="text-center text-hub-bronze text-xs font-black uppercase tracking-[0.8em] mb-32">The Ecosystem</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <PrincipleCard
                            icon={<Globe className="w-10 h-10" />}
                            title="Global Scale"
                            text="Delivering cinematic standards from India to the world's most innovative brands."
                        />
                        <PrincipleCard
                            icon={<Energy className="w-10 h-10" />}
                            title="High Velocity"
                            text="Agile workflows that ensure complex productions meet ambitious delivery timelines."
                        />
                        <PrincipleCard
                            icon={<Shield className="w-10 h-10" />}
                            title="Ironclad Quality"
                            text="Meticulous attention to detail in every pixel, every frame, and every sound bite."
                        />
                    </div>
                </div>
            </section>

            {/* 4. FINAL MANIFESTO */}
            <section className="py-80 px-6 text-center overflow-hidden relative">
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none select-none flex items-center justify-center">
                    <span className="text-[50vw] font-anton uppercase">HUB</span>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="max-w-5xl mx-auto relative z-10"
                >
                    <h3 className="text-5xl md:text-[8rem] font-anton uppercase leading-none mb-16">
                        TRANSCENDING THE <br /> <span className="text-hub-bronze">DIGITAL VOID.</span>
                    </h3>
                    <p className="text-xl md:text-3xl opacity-40 mb-20 max-w-3xl mx-auto font-medium">
                        Ready to build the future of your brand's visual identity? Let's initiate the sequence.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="px-20 py-10 bg-hub-bronze text-black rounded-full font-black uppercase tracking-[0.6em] text-xs shadow-2xl"
                    >
                        START THE JOURNEY
                    </motion.button>
                </motion.div>
            </section>

        </main>
    );
};

const Stat = ({ label, value }) => (
    <div>
        <div className="text-4xl md:text-6xl font-anton text-hub-bronze mb-2">{value}</div>
        <div className="text-[10px] font-black uppercase tracking-widest opacity-40">{label}</div>
    </div>
);

const PrincipleCard = ({ icon, title, text }) => (
    <motion.div
        whileHover={{ y: -20 }}
        className="glass p-16 rounded-[4rem] group border-white/5 hover:border-hub-bronze/30 transition-all duration-500"
    >
        <div className="text-hub-bronze mb-10 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">{icon}</div>
        <h4 className="text-3xl font-anton uppercase mb-6 tracking-tight">{title}</h4>
        <p className="opacity-40 leading-relaxed font-medium">{text}</p>
    </motion.div>
);

export default AboutPage;
