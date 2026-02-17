import { useState } from 'react'
import { Phone, Mail, MapPin, Send, ArrowUpRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'

const ContactSection = ({ theme }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        // TODO: Replace with your Google Apps Script Web App URL
        const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwXFXvGUJS2yjW4UFpSd6hNDg-oC_mwpZzwQS7K_SQg0UR_PHIyWtNfVQGxdcKWv9c7/exec';

        if (!SCRIPT_URL) {
            alert('Please configure the Google Apps Script URL in src/components/ContactSection.jsx');
            setIsSubmitting(false);
            return;
        }

        try {
            // Use URLSearchParams for application/x-www-form-urlencoded content type
            // This is often more reliable for Google Apps Script Web Apps than FormData
            const params = new URLSearchParams();
            params.append('name', formData.name);
            params.append('email', formData.email);
            params.append('message', formData.message);
            params.append('timestamp', new Date().toISOString());

            await fetch(SCRIPT_URL, {
                method: 'POST',
                body: params,
                mode: 'no-cors' // Handle CORS by using opaque mode
            });

            setSubmitStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-40 px-6 md:px-12 relative overflow-hidden">
            {/* Design Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-hub-bronze/5 blur-[150px] -z-10 animate-pulse-slow" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-hub-bronze/5 blur-[150px] -z-10 animate-pulse-slow" />

            <div className="max-w-[1600px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-stretch">

                    {/* Left Side: Impactful Text */}
                    <div className="flex flex-col justify-between py-10">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-hub-bronze text-sm font-black uppercase tracking-[0.6em] mb-12">Connect with us</h2>
                            <h3 className="text-7xl md:text-[8rem] font-anton leading-[0.8] uppercase tracking-tighter mb-16">
                                START A <br />
                                <span className="text-hub-bronze group cursor-pointer inline-flex items-center gap-4">
                                    DIALOGUE.
                                    <ArrowUpRight className="w-16 h-16 md:w-24 md:h-24 opacity-20 group-hover:opacity-100 transition-all duration-500" />
                                </span>
                            </h3>

                            <div className="space-y-12 max-w-lg">
                                <ContactInfo icon={<Phone />} label="Ring" value="+91 93245 45595" />
                                <ContactInfo icon={<Mail />} label="Draft" value="hello@hubvisual.studio" />
                                <ContactInfo icon={<MapPin />} label="Visit" value="Creative District, India" />
                            </div>
                        </motion.div>

                        <div className="mt-20 pt-20 border-t border-white/5 opacity-30 text-[10px] uppercase font-black tracking-widest">
                            Available for Global Projects 2026
                        </div>
                    </div>

                    {/* Right Side: Premium Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass p-10 md:p-20 rounded-[4rem] relative overflow-hidden"
                    >
                        <div className="relative z-10">
                            <h4 className="text-3xl font-black uppercase tracking-tighter mb-12">Project Brief</h4>

                            <form onSubmit={handleSubmit} className="space-y-12">
                                <InputField
                                    placeholder="Full Name"
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                                <InputField
                                    placeholder="Email Address"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">Tell us about your vision</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-3xl p-8 focus:border-hub-bronze transition-colors outline-none min-h-[200px] text-lg font-medium resize-none"
                                        placeholder="Briefly describe your goals..."
                                    />
                                </div>

                                <div className="relative">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        disabled={isSubmitting}
                                        type="submit"
                                        className={`w-full py-8 bg-hub-bronze text-black font-black uppercase tracking-[0.4em] text-sm rounded-full shadow-[0_20px_50px_rgba(178,139,103,0.3)] flex items-center justify-center gap-4 group ${isSubmitting ? 'opacity-70 cursor-wait' : ''}`}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                TRANSMITTING...
                                                <Loader2 size={18} className="animate-spin" />
                                            </>
                                        ) : (
                                            <>
                                                TRANSMIT REQUEST
                                                <Send size={18} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
                                            </>
                                        )}
                                    </motion.button>

                                    {submitStatus === 'success' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="absolute top-full left-0 w-full mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center justify-center gap-3 text-green-400"
                                        >
                                            <CheckCircle2 size={20} />
                                            <span className="text-xs font-bold uppercase tracking-widest">Message Received Successfully</span>
                                        </motion.div>
                                    )}

                                    {submitStatus === 'error' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="absolute top-full left-0 w-full mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center gap-3 text-red-400"
                                        >
                                            <AlertCircle size={20} />
                                            <span className="text-xs font-bold uppercase tracking-widest">Transmission Failed. Please try again.</span>
                                        </motion.div>
                                    )}
                                </div>
                            </form>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

const ContactInfo = ({ icon, label, value }) => (
    <div className="flex items-center gap-8 group">
        <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-hub-bronze group-hover:bg-hub-bronze group-hover:text-black transition-all duration-500">
            {icon}
        </div>
        <div>
            <div className="text-[10px] font-black opacity-30 uppercase tracking-[0.3em] mb-1">{label}</div>
            <div className="text-xl md:text-2xl font-bold tracking-tight">{value}</div>
        </div>
    </div>
);

const InputField = ({ placeholder, type, name, value, onChange }) => (
    <div className="relative group">
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required
            className="w-full bg-transparent border-b border-white/10 py-6 text-xl md:text-2xl font-bold focus:outline-none focus:border-hub-bronze transition-colors peer"
            placeholder=" "
        />
        <label className="absolute left-0 top-6 text-xl md:text-2xl font-bold opacity-30 pointer-events-none transition-all duration-500 peer-focus:-top-8 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-hub-bronze peer-[:not(:placeholder-shown)]:-top-8 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:uppercase">
            {placeholder}
        </label>
    </div>
);

export default ContactSection;
