import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { servicesData } from './ServicesSection'

const ListServices = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <section className="py-40 px-6 md:px-12 bg-zinc-950 min-h-screen relative overflow-hidden">
            <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">

                {/* Left Side: Large Service List */}
                <div className="lg:col-span-7 z-10">
                    <div className="flex flex-col">
                        {servicesData.map((service, idx) => (
                            <motion.div
                                key={idx}
                                onMouseEnter={() => setActiveIndex(idx)}
                                onMouseLeave={() => setActiveIndex(null)}
                                className="group border-b border-white/5 py-10 pointer-events-auto cursor-pointer relative"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-10">
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-20 group-hover:opacity-100 group-hover:text-hub-bronze transition-all duration-500">
                                            / 0{idx + 1}
                                        </span>
                                        <h3 className="text-4xl md:text-7xl font-anton uppercase tracking-tight group-hover:translate-x-6 transition-transform duration-700 group-hover:text-hub-bronze">
                                            {service.name}
                                        </h3>
                                    </div>
                                    <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-x-10 group-hover:translate-x-0 transition-all duration-700">
                                        <ArrowRight className="-rotate-45" />
                                    </div>
                                </div>

                                {/* Expanded Detail On Hover (Optional/Subtle) */}
                                <div className="max-w-md ml-20 h-0 group-hover:h-auto overflow-hidden opacity-0 group-hover:opacity-40 transition-all duration-700 mt-4 text-sm font-medium leading-relaxed">
                                    Strategic visual consultancy and high-end production tailored for {service.name.toLowerCase()}.
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Dynamic Image Preview Container */}
                <div className="lg:col-span-5 relative hidden lg:block">
                    <div className="sticky top-40 w-full aspect-[3/4] rounded-[4rem] overflow-hidden bg-zinc-900 border border-white/5 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
                        <AnimatePresence mode='wait'>
                            {activeIndex !== null ? (
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
                                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                    exit={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
                                    transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                                    className="absolute inset-0"
                                >
                                    <img
                                        src={servicesData[activeIndex].image}
                                        alt={servicesData[activeIndex].name}
                                        className="w-full h-full object-cover grayscale brightness-50"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-hub-bronze/20 to-transparent" />

                                    {/* Mini Info Overlay */}
                                    <div className="absolute bottom-12 left-12 right-12 z-10">
                                        <div className="flex gap-2">
                                            {servicesData[activeIndex].tags.map(tag => (
                                                <span key={tag} className="text-[8px] font-black uppercase tracking-widest px-3 py-1 bg-white/10 backdrop-blur-md rounded-full">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-center p-12 opacity-10">
                                    <p className="text-sm font-black uppercase tracking-[0.5em]">Hover to reveal vision</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Background Decorative Element */}
                    <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-hub-bronze/5 blur-[120px] rounded-full" />
                </div>

            </div>
        </section>
    );
};

export default ListServices;
