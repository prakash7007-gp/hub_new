import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const ServiceCard = ({ service, theme }) => {
    const cardRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

    // Parallax values for inner elements
    const translateXTitle = useTransform(mouseX, [-0.5, 0.5], ["-20px", "20px"]);
    const translateYTitle = useTransform(mouseY, [-0.5, 0.5], ["-20px", "20px"]);
    const translateXImg = useTransform(mouseX, [-0.5, 0.5], ["20px", "-20px"]);
    const translateYImg = useTransform(mouseY, [-0.5, 0.5], ["20px", "-20px"]);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXPos = e.clientX - rect.left;
        const mouseYPos = e.clientY - rect.top;
        x.set(mouseXPos / width - 0.5);
        y.set(mouseYPos / height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                perspective: 1200
            }}
            whileHover={{ scale: 0.98 }} // Interactive "squeeze" effect
            className="group relative h-[500px] md:h-[650px] overflow-hidden rounded-[3rem] cursor-pointer bg-zinc-950 border border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        >
            <motion.div
                className="absolute inset-0 z-0"
                style={{
                    transformStyle: "preserve-3d",
                    x: translateXImg,
                    y: translateYImg,
                    scale: 1.2
                }}
            >
                <motion.img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 brightness-[0.3] group-hover:brightness-90"
                />
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />

            {/* Top Bar (Tags & Year) */}
            <div className="absolute top-10 left-10 right-10 flex justify-between items-start z-20" style={{ transform: "translateZ(80px)" }}>
                <div className="flex flex-wrap gap-3">
                    {service.tags.map(tag => (
                        <span key={tag} className="px-5 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white">
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="px-5 py-2 border border-white/20 rounded-full text-[10px] font-black text-white/40 uppercase tracking-widest">
                    2026
                </div>
            </div>

            {/* Content (Title) */}
            <div className="absolute inset-x-10 bottom-10 z-10" style={{ transform: "translateZ(100px)" }}>
                <motion.div
                    style={{ x: translateXTitle, y: translateYTitle }}
                >
                    <h4 className="text-[12vw] md:text-[8rem] font-anton uppercase leading-[0.8] tracking-tighter text-white/90 group-hover:text-white transition-colors duration-500 transform-gpu">
                        {service.name.split(' ').map((word, i) => (
                            <span key={i} className="block">{word}</span>
                        ))}
                    </h4>
                </motion.div>

                <div className="mt-8 flex items-center gap-4 text-hub-bronze font-black text-[10px] uppercase tracking-[0.4em] opacity-40 group-hover:opacity-100 transition-all duration-500">
                    EXPLORE SERVICE <div className="w-12 h-[1px] bg-hub-bronze" />
                </div>
            </div>

            {/* Action Button */}
            <div className="absolute bottom-10 right-10 z-30" style={{ transform: "translateZ(120px)" }}>
                <motion.div
                    whileHover={{ scale: 1.1, rotate: 45 }}
                    className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center text-black shadow-2xl transition-transform duration-500 group-hover:bg-hub-bronze"
                >
                    <ArrowRight size={40} className="md:w-12 md:h-12" />
                </motion.div>
            </div>

            {/* Inner Glow Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-radial-gradient from-hub-bronze/10 to-transparent pointer-events-none" />
        </motion.div>
    );
};

export const servicesData = [
    {
        name: "Video Editing",
        tags: ["Cinematic", "Ads", "Reels"],
        image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=1200"
    },
    {
        name: "Motion Graphics",
        tags: ["2D/3D", "VFX", "Explainer"],
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200"
    },
    {
        name: "Animation (2D / 3D)",
        tags: ["Character", "Product", "Logo"],
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1200"
    },
    {
        name: "VFX",
        tags: ["Compositing", "CGI", "Clean-up"],
        image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=1201"
    },
    {
        name: "Content Creation",
        tags: ["Brands", "Creators", "Strategy"],
        image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&q=80&w=1200"
    },
    {
        name: "TV Commercials",
        tags: ["Commercial", "Ads", "TV"],
        image: "https://images.unsplash.com/photo-1579165466541-7482affbd781?auto=format&fit=crop&q=80&w=1200"
    },
    {
        name: "Digital Marketing",
        tags: ["Performance", "Growth", "Ads"],
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200"
    },
    {
        name: "Creative Branding",
        tags: ["Identity", "Logo", "Style"],
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1200"
    },
    {
        name: "Video Shooting",
        tags: ["Event", "Corporate", "B-Roll"],
        image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1200"
    },
    {
        name: "Brand Photoshoot",
        tags: ["Studio", "Lifestyle", "Product"],
        image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=1200"
    },
    {
        name: "Brand Designing",
        tags: ["Print", "UI/UX", "Social"],
        image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=1200"
    },
    {
        name: "Social Media",
        tags: ["SMM", "Management", "Content"],
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1200"
    },
];

const ServicesSection = ({ title = "Portfolio Selection" }) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <section ref={containerRef} id="services" className="relative h-[800vh] bg-zinc-950">
            {/* Sticky Viewer - The viewport "lens" */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

                {/* Fixed Background Elements */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-hub-bronze" />
                    <div className="absolute top-0 left-1/2 w-[1px] h-full bg-hub-bronze" />
                </div>

                {/* Section Branding - Locked Position */}
                <div className="absolute top-12 left-8 md:top-24 md:left-24 z-50">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="flex flex-col gap-2"
                    >
                        <span className="text-hub-bronze text-[10px] font-black uppercase tracking-[0.8em]">Core Offering</span>
                        <h3 className="text-4xl md:text-8xl font-anton text-white/10 uppercase leading-none">
                            {title.split(' ').map((word, i) => (
                                <span key={i} className="block">{word}</span>
                            ))}
                        </h3>
                    </motion.div>
                </div>

                {/* The Central Fixed Frame */}
                <div className="relative w-full max-w-[1500px] h-[65vh] md:h-[80vh] px-4 md:px-12">
                    {servicesData.map((service, idx) => (
                        <WipeCard
                            key={idx}
                            service={service}
                            idx={idx}
                            total={servicesData.length}
                            overallProgress={scrollYProgress}
                        />
                    ))}
                </div>

                {/* Status Bar */}
                <div className="absolute bottom-12 left-8 right-8 md:left-24 md:right-24 z-50 flex justify-between items-end">
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-2">
                            {servicesData.map((_, i) => (
                                <motion.div
                                    key={i}
                                    style={{
                                        width: 12,
                                        height: 2,
                                        backgroundColor: "#B28B67",
                                        opacity: 0.2
                                    }}
                                    animate={{
                                        opacity: scrollYProgress.get() >= i / servicesData.length ? 1 : 0.2
                                    }}
                                />
                            ))}
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/30">
                            Sequence <span className="text-hub-bronze">Active</span>
                        </span>
                    </div>
                </div>
            </div>

            {/* Grain/Texture to bind the visuals */}
            <div className="absolute inset-0 pointer-events-none z-[60] mix-blend-soft-light opacity-20"
                style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/black-linen.png")` }} />
        </section>
    );
};

const WipeCard = ({ service, idx, total, overallProgress }) => {
    // Determine the scroll range for this card
    const step = 1 / total;
    const startOfSlot = idx * step;
    const endOfSlot = (idx + 1) * step;

    // Movement: Slide in from bottom (100% -> 0%)
    // Trigger: As we approach this card's slot
    // Card 0 is always at 0.
    const y = useTransform(
        overallProgress,
        [startOfSlot - step, startOfSlot],
        ["100%", "0%"]
    );

    // Scale: Scale down as the NEXT card slides in (0 -> -5%)
    // Trigger: During this card's active slot (while next one is arriving)
    const scale = useTransform(
        overallProgress,
        [startOfSlot, endOfSlot],
        [1, 0.90] // Squeeze more for better stack effect
    );

    // Brightness: Darken as the next card slides in
    const brightness = useTransform(
        overallProgress,
        [startOfSlot, endOfSlot],
        [1, 0.5]
    );

    // Combine filters if needed or just brightness
    const filter = useTransform(brightness, b => `brightness(${b})`);

    // Inner image parallax (optional, keeping it subtle)
    const imgY = useTransform(overallProgress, [startOfSlot, endOfSlot], ["-10%", "10%"]);

    return (
        <motion.div
            style={{
                y: idx === 0 ? 0 : y,
                scale: idx === total - 1 ? 1 : scale, // Last card doesn't scale
                filter: idx === total - 1 ? "none" : filter,
                zIndex: idx
            }}
            className="absolute inset-0 w-full h-full origin-top"
        >
            <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] md:rounded-[4rem] border border-white/10 bg-zinc-900 shadow-[0_-20px_60px_rgba(0,0,0,0.5)]">

                {/* Meta Labels */}
                <div className="absolute top-8 left-8 md:top-12 md:left-12 z-30 flex flex-wrap gap-2 md:gap-4 pointer-events-none">
                    {service.tags.map(tag => (
                        <span key={tag} className="px-3 py-1.5 md:px-4 md:py-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-white/90">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Parallax Image Background */}
                <motion.div style={{ y: imgY }} className="absolute inset-x-0 -top-[10%] -bottom-[10%]">
                    <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover grayscale brightness-[0.5]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </motion.div>

                {/* Main Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 z-20">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h4 className="text-[10vw] md:text-[6rem] lg:text-[7rem] font-anton uppercase leading-[0.8] tracking-tight text-white mb-6 md:mb-10 drop-shadow-lg">
                            {service.name}
                        </h4>

                        <div className="flex items-center gap-6 group cursor-pointer w-fit">
                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white text-black flex items-center justify-center transition-all duration-300 group-hover:bg-hub-bronze group-hover:scale-110">
                                <ArrowRight size={28} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-hub-bronze text-[9px] font-black uppercase tracking-[0.3em]">Explore</span>
                                <span className="text-white/60 text-[9px] font-bold uppercase tracking-widest">Service Details</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Number Watermark */}
                <div className="absolute top-6 right-6 md:top-10 md:right-10 z-10 pointer-events-none mix-blend-overlay">
                    <span className="text-[4rem] md:text-[6rem] font-black text-white/10 leading-none">
                        {String(idx + 1).padStart(2, '0')}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};




export default ServicesSection;
export { ServiceCard };
