/** @jsxImportSource react */
import { useStore } from '@nanostores/react';
import { $cartItems, $cartTotal, removeFromCart, $isCartOpen, toggleCart } from '@/stores/cart';
import { $language } from '@/stores/language';
import { translations } from '@/data/translations';
import { motion, AnimatePresence } from 'framer-motion';

export default function Cart() {
    const items = useStore($cartItems);
    const total = useStore($cartTotal);
    const isOpen = useStore($isCartOpen);
    const lang = useStore($language);
    const t = translations[lang] || translations.es;

    return (
        <>
            {/* Floating Cart Trigger (when closed) */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={toggleCart}
                        className="fixed bottom-10 right-10 z-[110] w-16 h-16 bg-accent rounded-full flex items-center justify-center shadow-2xl hover:bg-white transition-colors group"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-surface-dark group-hover:scale-110 transition-transform"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>
                        {items.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-white text-surface-dark text-[10px] w-6 h-6 flex items-center justify-center rounded-full font-bold border-2 border-accent">
                                {items.length}
                            </span>
                        )}
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Cart Sidebar */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={toggleCart}
                            className="fixed inset-0 bg-surface-dark/80 backdrop-blur-sm z-[120]"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-surface-dark border-l border-white/5 z-[130] flex flex-col"
                        >
                            <div className="p-10 flex items-center justify-between border-b border-white/5">
                                <h2 className="font-heading text-xl text-white uppercase tracking-[0.2em]">{t.cart.title}</h2>
                                <button onClick={toggleCart} className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 hover:bg-white hover:text-surface-dark transition-all">
                                    ✕
                                </button>
                            </div>

                            <div className="flex-grow overflow-y-auto p-10 space-y-8 no-scrollbar">
                                {items.map(item => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex gap-6 items-center"
                                        key={item.id}
                                    >
                                        <div className="w-20 h-20 flex-shrink-0 relative">
                                            <img src={item.image} className="w-full h-full object-cover rounded-sm" />
                                            <div className="absolute inset-0 border border-white/10 rounded-sm"></div>
                                        </div>
                                        <div className="flex-grow">
                                            <h4 className="text-xs font-heading text-white uppercase tracking-widest mb-1">{item.title}</h4>
                                            <p className="text-[10px] text-accent uppercase tracking-widest font-bold">{item.price} €</p>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-muted-foreground hover:text-red-500 transition-colors p-2"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
                                        </button>
                                    </motion.div>
                                ))}

                                {items.length === 0 && (
                                    <div className="h-full flex flex-col items-center justify-center text-center space-y-6 pt-20">
                                        <p className="text-muted-foreground font-body italic text-sm">
                                            {t.cart.empty}
                                        </p>
                                        <button onClick={toggleCart} className="text-accent underline underline-offset-8 text-[10px] uppercase font-bold tracking-widest hover:text-white transition-colors">
                                            {t.cart.viewOptions}
                                        </button>
                                    </div>
                                )}
                            </div>

                            {items.length > 0 && (
                                <div className="p-10 bg-surface-dark border-t border-white/5 space-y-8">
                                    <div className="flex justify-between items-center px-2">
                                        <span className="text-[10px] text-muted-foreground uppercase tracking-[0.3em]">{t.cart.subtotal}</span>
                                        <span className="text-2xl font-heading text-white">{total} €</span>
                                    </div>

                                    <div className="space-y-4">
                                        <button className="w-full py-5 bg-accent text-surface-dark font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-white transition-all shadow-xl shadow-accent/5">
                                            {t.cart.checkout}
                                        </button>
                                        <p className="text-[9px] text-center text-muted-foreground uppercase tracking-widest opacity-60">
                                            {t.cart.note}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
