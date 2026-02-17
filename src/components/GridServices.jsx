import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Zap, Layers, Video, Palette, Target } from 'lucide-react'
import { servicesData } from './ServicesSection'

const GridServices = () => {
    return (
        <section className="py-20 px-6 md:px-12 bg-zinc-950">
            <div className="max-w-[1600px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {servicesData.map((service, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative h-[600px] rounded-[3rem] overflow-hidden border border-white/5 bg-zinc-900 shadow-2xl"
                        >
                            {/* Background Image */}
                            <img
                                src={service.image}
                                alt={service.name}
                                className="absolute inset-0 w-full h-full object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                            {/* Content */}
                            <div className="absolute inset-0 p-12 flex flex-col justify-between z-10">
                                <div className="flex justify-between items-start">
                                    <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center text-hub-bronze transform group-hover:rotate-12 transition-transform">
                                        {idx % 3 === 0 ? <Video /> : idx % 3 === 1 ? <Palette /> : <Layers />}
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">/ 0{idx + 1}</span>
                                </div>

                                <div>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {service.tags.map(tag => (
                                            <span key={tag} className="px-3 py-1 bg-white/5 backdrop-blur-md rounded-full text-[8px] font-bold uppercase tracking-widest text-white/60">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h4 className="text-4xl font-anton uppercase text-white mb-6 group-hover:text-hub-bronze transition-colors">
                                        {service.name}
                                    </h4>
                                    <p className="text-sm opacity-40 leading-relaxed line-clamp-2 mb-8 group-hover:opacity-100 transition-opacity">
                                        We provide high-end solutions tailored for {service.name.toLowerCase()} ensuring cinematic quality and impact.
                                    </p>

                                    <motion.button
                                        whileHover={{ x: 10 }}
                                        className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-hub-bronze"
                                    >
                                        Inquire Now <ArrowRight size={14} />
                                    </motion.button>
                                </div>
                            </div>

                            {/* Hover Reveal Glow */}
                            <div className="absolute -inset-1 bg-hub-bronze/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        </motion.div>
                    ))}

                    {/* Final CTA Card */}
                    <motion.div
                        className="lg:col-span-1 h-[600px] rounded-[3rem] p-12 bg-hub-bronze flex flex-col justify-between group cursor-pointer"
                    >
                        <Target size={40} className="text-black" />
                        <div>
                            <h3 className="text-4xl md:text-5xl font-anton text-black uppercase leading-tight mb-8">
                                Ready to <br /> collaborate?
                            </h3>
                            <div className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                                <ArrowRight size={30} />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default GridServices;
