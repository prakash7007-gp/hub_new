import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import CarouselServices from '../components/CarouselServices'

const ServicesPage = ({ theme }) => {
    return (
        <main className={`w-full overflow-hidden ${theme === 'dark' ? 'bg-zinc-950' : 'bg-white'}`}>
            {/* Premium Page Hero */}
            <section className="pt-40 pb-20 px-6 md:px-12 relative overflow-hidden">
                {/* Background Decorative Element */}
                <div className="absolute top-20 right-0 text-[25vw] font-black opacity-[0.03] pointer-events-none select-none uppercase tracking-tighter">
                    Expertise
                </div>

                <div className="max-w-[1600px] mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-hub-bronze text-xs md:text-sm font-black uppercase tracking-[0.8em] mb-8">
                            Our Expertise
                        </h2>
                        <h1 className="text-[12vw] md:text-[10rem] font-black uppercase leading-[0.8] tracking-tighter mb-12">
                            VISIONARY <br /> <span className="text-hub-bronze">SOLUTIONS.</span>
                        </h1>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-end">
                            <p className="text-xl md:text-3xl font-medium leading-relaxed opacity-60">
                                We combine technical excellence with artistic intuition to deliver
                                cinematic experiences that resonate. From the first frame to the final
                                export, we define the future of visual storytelling.
                            </p>

                            <div className="flex flex-col gap-6 items-start lg:items-end">
                                <div className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">
                                    Trusted by Creators Worldwide
                                </div>
                                <div className="flex gap-4">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center">
                                            <div className="w-2 h-2 bg-hub-bronze rounded-full" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Moving Marquee */}
                <div className="mt-20 border-y border-white/5 py-10 overflow-hidden">
                    <motion.div
                        animate={{ x: [0, -1000] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="flex whitespace-nowrap gap-20"
                    >
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="flex items-center gap-20">
                                <span className="text-4xl md:text-6xl font-anton opacity-10 uppercase tracking-widest text-white">Full Spectrum Digital Production</span>
                                <div className="w-12 h-12 rounded-full border border-hub-bronze/30 flex items-center justify-center">
                                    <div className="w-4 h-4 bg-hub-bronze rounded-full" />
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* The "Mode" - Carousel Layout */}
            <div className="relative">
                <CarouselServices />
            </div>

            {/* Bottom CTA for Services Page */}
            <section className="py-40 px-6 md:px-12 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto p-12 md:p-24 rounded-[4rem] bg-hub-bronze/10 border border-hub-bronze/20 relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-hub-bronze" />
                    <h3 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mb-8">
                        NEED A CUSTOM <br /> <span className="text-hub-bronze">WORKFLOW?</span>
                    </h3>
                    <p className="text-lg opacity-60 mb-12">
                        Every project is unique. Let's discuss a tailored strategy for your specific vision.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-hub-bronze text-black px-12 py-6 rounded-full font-black uppercase tracking-[0.3em] text-xs shadow-2xl flex items-center gap-4 mx-auto"
                    >
                        GET IN TOUCH <ArrowRight size={18} />
                    </motion.button>
                </motion.div>
            </section>

            <footer className="py-20 px-10 text-center opacity-30 font-black uppercase tracking-widest text-[10px]">
                HUB VISUAL STUDIO © 2026
            </footer>
        </main>
    );
};

export default ServicesPage;
