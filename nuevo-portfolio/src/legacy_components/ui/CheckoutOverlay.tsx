import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, CheckCircle, ArrowRight } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useLanguage } from '../../contexts/LanguageContext';

const CheckoutOverlay: React.FC = () => {
    const { isCheckoutOpen, closeCheckout, cartItems, cartTotal, clearCart } = useCart();
    const { lang, t } = useLanguage();
    const [step, setStep] = useState(1); // 1: Review, 2: Payment, 3: Success
    const [isProcessing, setIsProcessing] = useState(false);

    // Auto-close if empty? No, let user back out manually.

    const handlePayment = async () => {
        setIsProcessing(true);
        try {
            const response = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items: cartItems }),
            });

            const data = await response.json();
            if (data.url) {
                window.location.href = data.url; // Redirect to Stripe
            } else {
                throw new Error('Failed to create session');
            }
        } catch (err) {
            console.error('Checkout error:', err);
            alert('Checkout error. Please ensure the server is running and Stripe is configured.');
            setIsProcessing(false);
        }
    };

    if (!isCheckoutOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-black">
            <div className="absolute inset-0 bg-gradient-to-b from-[#1c1917] to-black opacity-90" />

            <div className="relative z-10 h-full max-w-7xl mx-auto px-4 py-8 md:py-12 flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-heading font-bold text-[#fef3c7]">CHECKOUT</h2>
                    <button
                        onClick={closeCheckout}
                        className="text-white/50 hover:text-white flex items-center gap-2"
                    >
                        <span className="hidden md:inline text-xs uppercase tracking-widest">Back to Gallery</span>
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 grid md:grid-cols-2 gap-12 overflow-hidden">
                    {/* Left: Summary */}
                    <div className="overflow-y-auto pr-4">
                        <h3 className="text-sm uppercase text-[#fbbf24] tracking-widest mb-6 border-b border-[#fbbf24]/20 pb-2">Order Summary</h3>

                        {cartItems.length === 0 && step !== 3 ? (
                            <div className="text-white/30 text-center py-12">Your cart is empty.</div>
                        ) : (
                            <div className="space-y-6">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="w-20 h-20 bg-[#292524] rounded-md overflow-hidden flex-shrink-0 flex items-center justify-center">
                                            {item.image ? (
                                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-white/20 text-[8px] uppercase font-bold text-center px-2">{item.title}</span>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-white text-lg">{item.title}</h4>
                                            <p className="text-white/50 text-xs uppercase tracking-wider mb-1">{item.type}</p>
                                            <div className="font-mono text-[#fbbf24]">{item.price === 0 ? 'Inquire' : `${item.price}€`}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="mt-8 border-t border-white/10 pt-6">
                            <div className="flex justify-between items-end">
                                <span className="text-white/50 text-sm uppercase">Total</span>
                                <span className="text-3xl font-mono text-[#fef3c7]">{cartTotal}€</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Action */}
                    <div className="bg-[#1c1917] p-8 rounded-2xl border border-white/5 h-fit">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                >
                                    <h3 className="text-xl font-bold text-white mb-6">Customer Information</h3>
                                    <div className="space-y-4 mb-8">
                                        <input type="email" placeholder="Email Address" className="w-full bg-black/50 border border-white/10 p-4 rounded-lg text-white focus:outline-none focus:border-[#fbbf24]" />
                                        <div className="grid grid-cols-2 gap-4">
                                            <input type="text" placeholder="First Name" className="w-full bg-black/50 border border-white/10 p-4 rounded-lg text-white focus:outline-none focus:border-[#fbbf24]" />
                                            <input type="text" placeholder="Last Name" className="w-full bg-black/50 border border-white/10 p-4 rounded-lg text-white focus:outline-none focus:border-[#fbbf24]" />
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setStep(2)}
                                        className="w-full bg-[#fbbf24] text-black py-4 font-bold uppercase tracking-widest hover:bg-[#f59e0b] transition-colors flex justify-center items-center gap-2"
                                    >
                                        Proceed to Pay <ArrowRight className="w-4 h-4" />
                                    </button>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                >
                                    <h3 className="text-xl font-bold text-white mb-6">Payment Details</h3>
                                    <div className="space-y-4 mb-8">
                                        {/* Mock stripe element */}
                                        <div className="p-4 border border-white/10 rounded-lg bg-black/30 flex items-center gap-3">
                                            <CreditCard className="text-white/50" />
                                            <input type="text" placeholder="Card Number" className="bg-transparent flex-1 outline-none text-white" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <input type="text" placeholder="MM/YY" className="bg-black/30 border border-white/10 p-4 rounded-lg text-white focus:outline-none" />
                                            <input type="text" placeholder="CVC" className="bg-black/30 border border-white/10 p-4 rounded-lg text-white focus:outline-none" />
                                        </div>
                                    </div>
                                    <button
                                        onClick={handlePayment}
                                        disabled={isProcessing}
                                        className="w-full bg-[#fbbf24] text-black py-4 font-bold uppercase tracking-widest hover:bg-[#f59e0b] transition-colors flex justify-center items-center gap-2 disabled:opacity-50"
                                    >
                                        {isProcessing ? 'Processing...' : `Pay ${cartTotal}€`}
                                    </button>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-12"
                                >
                                    <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-2">Order Confirmed!</h3>
                                    <p className="text-white/50 mb-8">Thank you for your purchase. A confirmation email has been sent.</p>
                                    <button
                                        onClick={closeCheckout}
                                        className="px-8 py-3 border border-[#fbbf24] text-[#fbbf24] uppercase tracking-widest hover:bg-[#fbbf24] hover:text-black transition-colors"
                                    >
                                        Return to Gallery
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutOverlay;
