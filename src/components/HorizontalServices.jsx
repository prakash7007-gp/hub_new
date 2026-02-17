import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { servicesData } from './ServicesSection'

const HorizontalServices = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    // Horizontal movement: from 0 to -80% (depending on total cards)
    // We have 12 cards. Let's make it more immersive.
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);

    return (
        <section ref={sectionRef} className="relative h-[600vh] bg-zinc-950">
            {/* Sticky Container */}
            <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">

                {/* Background Text */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
                    <span className="text-[40vw] font-black uppercase tracking-tighter">EXCELLENCE</span>
                </div>

                {/* Animated Track */}
                <motion.div
                    style={{ x }}
                    className="flex gap-10 px-[10vw] relative z-10"
                >
                    {servicesData.map((service, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -20 }}
                            className="flex-shrink-0 w-[400px] md:w-[600px] h-[500px] md:h-[700px] relative group overflow-hidden rounded-[3rem] border border-white/10 bg-zinc-900"
                        >
                            {/* Image Background */}
                            <img
                                src={service.image}
                                alt={service.name}
                                className="absolute inset-0 w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                            {/* Content */}
                            <div className="absolute inset-0 p-10 flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-hub-bronze">
                                        Service {String(idx + 1).padStart(2, '0')}
                                    </span>
                                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/40">
                                        <ArrowRight size={20} className="-rotate-45" />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {service.tags.map(tag => (
                                            <span key={tag} className="px-3 py-1 bg-white/5 backdrop-blur-md rounded-full text-[8px] font-bold uppercase tracking-widest text-white/60">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h4 className="text-4xl md:text-6xl font-anton uppercase text-white leading-tight">
                                        {service.name}
                                    </h4>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Final Card / Call to Action */}
                    <div className="flex-shrink-0 w-[400px] md:w-[600px] h-[500px] md:h-[700px] flex items-center justify-center">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="text-center group cursor-pointer"
                        >
                            <h3 className="text-white text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 group-hover:text-hub-bronze transition-colors">
                                LET'S BUILD <br /> YOUR VISION.
                            </h3>
                            <div className="w-24 h-24 rounded-full bg-hub-bronze text-black flex items-center justify-center mx-auto shadow-2xl">
                                <ArrowRight size={40} />
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Progress Bar (Bottom) */}
                <div className="absolute bottom-10 left-[10vw] right-[10vw] h-[2px] bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                        style={{ scaleX: scrollYProgress }}
                        className="h-full bg-hub-bronze origin-left"
                    />
                </div>
            </div>
        </section>
    );
};

export default HorizontalServices;
