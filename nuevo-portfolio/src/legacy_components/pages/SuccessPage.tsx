import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Download, ArrowRight, Home } from 'lucide-react';

const SuccessPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (sessionId) {
            fetch(`/api/checkout-verify?session_id=${sessionId}`)
                .then(res => res.json())
                .then(data => {
                    setOrder(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Verification failed', err);
                    setLoading(false);
                });
        }
    }, [sessionId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0c0a09] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#fbbf24]"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0c0a09] pt-32 pb-20 px-4">
            <div className="max-w-3xl mx-auto text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mb-8 flex justify-center"
                >
                    <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center text-green-500">
                        <CheckCircle size={48} />
                    </div>
                </motion.div>

                <h1 className="text-4xl md:text-6xl font-heading font-bold text-[#fef3c7] mb-6">THANK YOU</h1>
                <p className="text-[#fbbf24] text-xl mb-12 uppercase tracking-widest">Order Confirmed</p>

                <div className="bg-[#1c1917] border border-white/10 rounded-2xl p-8 mb-12 text-left">
                    <div className="flex justify-between items-start mb-8 border-b border-white/5 pb-4">
                        <div>
                            <p className="text-white/30 text-xs uppercase mb-1">Order ID</p>
                            <p className="text-white font-mono">{order?.id}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-white/30 text-xs uppercase mb-1">Amount</p>
                            <p className="text-[#fbbf24] font-bold text-xl">{order?.totalAmount}€</p>
                        </div>
                    </div>

                    {order?.certificateUrl && (
                        <div className="bg-[#fbbf24]/5 border border-[#fbbf24]/20 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-[#fbbf24]/10 rounded-lg text-[#fbbf24]">
                                    <Download size={24} />
                                </div>
                                <div>
                                    <h3 className="text-[#fef3c7] font-bold">Certificate of Authenticity</h3>
                                    <p className="text-white/40 text-sm">Download your digital certificate for the original artwork.</p>
                                </div>
                            </div>
                            <a
                                href={order.certificateUrl}
                                download
                                className="w-full md:w-auto px-6 py-3 bg-[#fbbf24] text-black font-bold rounded-lg hover:bg-[#d97706] transition-all flex items-center justify-center gap-2"
                            >
                                DOWNLOAD PDF
                            </a>
                        </div>
                    )}
                </div>

                <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="px-8 py-4 border border-white/20 text-white hover:bg-white/5 rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                        <Home size={18} /> BACK TO HOME
                    </Link>
                    <Link
                        to="/gallery"
                        className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-all flex items-center justify-center gap-2"
                    >
                        CONTINUE BROWSING <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SuccessPage;
