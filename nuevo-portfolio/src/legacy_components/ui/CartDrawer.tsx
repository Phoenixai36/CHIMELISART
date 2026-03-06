import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, CreditCard } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useLanguage } from '../../contexts/LanguageContext';

const CartDrawer: React.FC = () => {
  const { isCartOpen, closeCart, cartItems, removeFromCart } = useCart();
  const { t } = useLanguage();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full md:w-[450px] bg-[#1c1917] border-l border-[#fbbf24]/20 z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#0c0a09]">
              <h2 className="font-heading text-xl text-[#fbbf24]">{t.cart.title}</h2>
              <button onClick={closeCart} aria-label="Close Cart"><X className="w-6 h-6 text-white/50 hover:text-white" /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-white/30 gap-4">
                  <ShoppingBag className="w-12 h-12" />
                  <p>{t.cart.empty}</p>
                  <button onClick={() => { closeCart(); document.getElementById('acquisition')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-[#fbbf24] hover:underline text-sm mt-2">
                    {t.cart.viewOptions}
                  </button>
                </div>
              ) : (
                cartItems.map((item, idx) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-[#292524] p-3 rounded-lg flex items-start gap-4 border border-white/5 relative group"
                  >
                    <div className="w-16 h-16 bg-black rounded overflow-hidden flex-shrink-0 flex items-center justify-center">
                        {item.image ? (
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-white/20 text-[6px] uppercase font-bold text-center px-1">{item.title}</span>
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-[#fef3c7] text-sm truncate">{item.title}</h4>
                      <div className="flex justify-between items-center mt-1">
                          <span className="text-xs text-[#d97706] uppercase tracking-wider">{item.type}</span>
                          <span className="text-sm font-mono text-white">{item.price > 0 ? `${item.price}€` : 'Inquire'}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)} 
                      className="absolute top-2 right-2 text-white/10 hover:text-red-500 transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            <div className="p-6 border-t border-white/10 bg-[#0c0a09]">
              <div className="flex justify-between mb-4 text-sm">
                 <span className="text-white/50">{t.cart.subtotal}</span>
                 <span className="font-mono">{useCart().cartTotal}€</span>
              </div>
              <p className="text-[10px] text-white/30 mb-4">{t.cart.note}</p>
              <button 
                  onClick={useCart().openCheckout}
                  disabled={cartItems.length === 0}
                  className="w-full bg-[#fbbf24] text-black font-bold py-4 uppercase tracking-widest hover:bg-[#f59e0b] transition-colors flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CreditCard className="w-4 h-4" />
                {t.cart.checkout}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
