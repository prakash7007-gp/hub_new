import HeroTextReveal from '../components/HeroTextReveal'
import AboutSection from '../components/AboutSection'
import CarouselServices from '../components/CarouselServices'
import ContactSection from '../components/ContactSection'
import ListServices from '../components/ListServices';

const Home = ({ theme }) => {
    return (
        <main id="home" className="relative z-10 w-full overflow-x-hidden">
            <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 relative overflow-hidden pt-32">
                <div className="max-w-[1600px] mx-auto w-full">
                    <HeroTextReveal theme={theme} />
                </div>
            </section>

            {/* 2. Manifesto Layer */}
            <AboutSection />

            {/* 3. Offerings Layer (The Carousel) */}
            <CarouselServices
                preTitle="Core Capabilities"
                title={<>Creative <br /> <span className="text-hub-bronze">Offerings.</span></>}
                autoPlay={true}
            />

            {/* 4. Connectivity Layer */}
            <ContactSection />
            <footer className="py-20 px-10 text-center opacity-30 font-black uppercase tracking-widest text-[10px]">
                HUB VISUAL STUDIO © 2026
            </footer>
        </main>
    );
};

export default Home;
