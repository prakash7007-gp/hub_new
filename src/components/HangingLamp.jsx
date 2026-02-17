import { useEffect } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

const HangingLamp = ({ theme, logoSrc = "/images/favicon.png" }) => {
    // 15+ years UI/UX Expert: Cinematic Physics Source
    const rotation = useMotionValue(0);

    useEffect(() => {
        const controls = animate(rotation, [-20, 20], {
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: [0.45, 0, 0.55, 1]
        });
        return controls.stop;
    }, [rotation]);

    // PRO EXPERT SYNC: Spatially Direct Directional Sync (Calibrated for Visual Inversion)
    // Positive Rotation (Right) -> Mask moves Left (relative to container)
    // This creates the perceived "Same Direction" movement for the user.
    const maskX = useTransform(rotation, [-20, 20], ["130%", "-30%"]);

    const spotlightOpacity = useTransform(rotation, [-20, 0, 20], [0.3, 0.8, 0.3]);

    return (
        <div className="absolute top-0 right-[-100px] h-full w-[700px] pointer-events-none z-20 flex flex-col items-center">

            {/* 1. THE LAMP ASSEMBLY */}
            <motion.div
                style={{ rotate: rotation }}
                className="relative flex flex-col items-center origin-top h-auto"
            >
                {/* Cable */}
                <div className={`w-[1px] h-[220px] ${theme === 'dark' ? 'bg-white/20' : 'bg-black/20'} relative shadow-[0_0_15px_rgba(178,139,103,0.1)]`} />

                {/* Lamp Head */}
                <div className="relative -mt-1 flex flex-col items-center">
                    <div className={`w-3 h-5 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-700'} rounded-t-sm`} />

                    {/* Shade with high-end finish */}
                    <div className={`w-36 h-18 ${theme === 'dark' ? 'bg-[#030303]' : 'bg-zinc-950'} border-b border-hub-bronze/40 rounded-t-full shadow-[0_30px_60px_rgba(0,0,0,0.8)] relative flex items-end justify-center overflow-hidden`}>
                        <div className="w-20 h-12 bg-hub-bronze blur-2xl mb-[-5px] opacity-100" />
                        <div className="absolute bottom-2 w-8 h-8 bg-white blur-md opacity-40 rounded-full" />
                    </div>

                    {/* Volumetric Beam - Extra Long to reach lowered logo */}
                    <div className="absolute top-[15px] left-1/2 -translate-x-1/2 w-0 h-0 flex justify-center origin-top scale-[1.2]">
                        <div
                            className="w-[600px] h-[1000px] blur-[60px] opacity-20"
                            style={{
                                background: `radial-gradient(circle at top, #B28B67 0%, transparent 85%)`,
                                clipPath: 'polygon(48% 0%, 52% 0%, 100% 100%, 0% 100%)'
                            }}
                        />
                    </div>
                </div>
            </motion.div>

            {/* 2. THE CINEMATIC STAGE (Lowered and Enlarged Logo) */}
            <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] flex items-center justify-center">

                {/* Silhouette (Faint Base) */}
                <img
                    src={logoSrc}
                    alt="Logo Base"
                    className="w-[450px] h-[450px] object-contain opacity-[0.03] brightness-0 contrast-200"
                />

                {/* The Reveal Layer (Synchronized Mask) */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                        maskImage: useTransform(maskX, (val) => `radial-gradient(circle at ${val} 50%, black 0%, black 25%, transparent 65%)`),
                        WebkitMaskImage: useTransform(maskX, (val) => `radial-gradient(circle at ${val} 50%, black 0%, black 25%, transparent 65%)`),
                    }}
                >
                    <div className="relative">
                        {/* Enlarged Logo */}
                        <img
                            src={logoSrc}
                            alt="Logo Highlight"
                            className="w-[450px] h-[450px] object-contain brightness-150 contrast-125 drop-shadow-[0_0_80px_rgba(178,139,103,1)]"
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default HangingLamp;
