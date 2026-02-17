import ContactSection from '../components/ContactSection'

const ContactPage = ({ theme }) => {
    return (
        <main className="pt-32 pb-20">
            <ContactSection theme={theme} />
            <footer className="py-20 px-10 text-center opacity-30 font-black uppercase tracking-widest text-[10px]">
                HUB VISUAL STUDIO © 2026
            </footer>
        </main>
    );
};

export default ContactPage;
