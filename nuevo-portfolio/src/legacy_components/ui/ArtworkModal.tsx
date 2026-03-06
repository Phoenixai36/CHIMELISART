import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Artwork } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { GALLERY } from '../../data/artworks';
import prices from "../../src/data/prices.json";

interface ArtworkModalProps {
  artwork: Artwork | null;
  onClose: () => void;
  onRelatedClick: (artwork: Artwork) => void;
}

interface ShippingDetails {
  calle: string;
  ciudad: string;
  codigo_postal: string;
  pais: string;
  telefono: string;
}

const ArtworkModal: React.FC<ArtworkModalProps> = ({ artwork, onClose, onRelatedClick }) => {
  const { lang, t } = useLanguage();
  const [activeImage, setActiveImage] = useState<string>('');
  const [purchaseOption, setPurchaseOption] = useState<'original' | 'lamina' | 'taza' | 'camiseta'>('original');
  const [email, setEmail] = useState("");
  const [shipping, setShipping] = useState<ShippingDetails>({
    calle: '', ciudad: '', codigo_postal: '', pais: 'ES', telefono: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (artwork) {
      setActiveImage(artwork.image);
      setPurchaseOption('original'); // Reset to original on open
      setError('');
    }
  }, [artwork]);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (purchaseOption === 'original') {
        // Handle inquiry logic or redirect to email
        window.location.href = `mailto:info@chimelisart.com?subject=Interés en obra original: ${artwork?.title[lang]}`;
        setLoading(false);
        return;
    }

    try {
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          obraId: artwork?.id,
          titulo: artwork?.title[lang],
          formato: purchaseOption,
          email,
          shipping,
          imagen: artwork?.image
        }),
      });

      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || "Error al iniciar pago");
      
      window.location.href = data.url;
      
    } catch (err: any) {
      setError("Error iniciando el pago seguro. Por favor verifica tus datos.");
      console.error(err);
      setLoading(false);
    }
  };

  const getRelatedArtworks = (currentId: string) => {
    const others = GALLERY.filter(a => a.id !== currentId);
    return others.sort(() => 0.5 - Math.random()).slice(0, 2);
  };

  // Helper to get price display
  const getPriceDisplay = (option: string) => {
       const p = prices.products[option as keyof typeof prices.products];
       if (!p) return "";
       if (p.price === 0) return t.modal.original.inquire;
       return `${(p.price / 100).toFixed(0)}€`;
  };

  return (
    <AnimatePresence>
      {artwork && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-end md:items-center justify-center p-0 md:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="bg-[#1c1917] w-full max-w-5xl h-[90svh] md:h-auto md:max-h-[90vh] overflow-y-auto overflow-x-hidden grid md:grid-cols-2 shadow-2xl rounded-t-2xl md:rounded-xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Section (Top on mobile, Left on desktop) */}
            <div className="relative bg-black flex flex-col min-h-[40vh] md:min-h-full sticky top-0 md:relative">
              <div className="flex-1 relative overflow-hidden flex items-center justify-center p-4">
                 <motion.img 
                   key={activeImage}
                   initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                   src={activeImage} 
                   alt={artwork.title[lang]} 
                   className="w-full h-auto max-h-[40vh] md:max-h-[80vh] object-contain shadow-2xl"
                 />
              </div>
              
              {/* Thumbnails */}
              {artwork.detailImages && (
                <div className="h-16 bg-[#0c0a09]/80 backdrop-blur border-t border-white/10 flex items-center gap-2 px-4 overflow-x-auto no-scrollbar absolute bottom-0 w-full md:relative md:h-20 md:bg-[#0c0a09]">
                   <button 
                     onClick={() => setActiveImage(artwork.image)}
                     className={`h-10 w-10 md:h-14 md:w-14 flex-shrink-0 border-2 ${activeImage === artwork.image ? 'border-[#fbbf24]' : 'border-white/20'}`}
                   >
                     <img src={artwork.image} alt="Main" className="w-full h-full object-cover" />
                   </button>
                  {artwork.detailImages.map((img, i) => (
                    <button 
                     key={i}
                     onClick={() => setActiveImage(img)}
                     className={`h-10 w-10 md:h-14 md:w-14 flex-shrink-0 border-2 ${activeImage === img ? 'border-[#fbbf24]' : 'border-white/20'}`}
                   >
                     <img src={img} alt={`Detail ${i}`} className="w-full h-full object-cover" />
                   </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info & Purchase Section */}
            <div className="p-6 md:p-10 relative bg-[#1c1917]">
              <button 
                onClick={onClose}
                aria-label="Close"
                className="absolute top-4 right-4 text-white/50 hover:text-white bg-black/20 p-2 rounded-full md:bg-transparent"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="mb-2 flex items-center gap-3 mt-4 md:mt-0">
                 <span className="text-xs font-mono text-white/40">{artwork.id}</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-2 text-[#fef3c7] leading-tight">
                {artwork.title[lang]}
              </h2>
              <p className="text-[#d97706] uppercase tracking-widest text-xs mb-6 font-medium">
                {artwork.technique[lang]}
              </p>

              <form onSubmit={handleCheckout} className="space-y-6">
                {/* Purchase Options Grid */}
                <div>
                    <h4 className="text-xs uppercase text-white/30 mb-3 tracking-widest">Elige Formato</h4>
                    <div className="grid grid-cols-1 gap-3">
                        {['original', 'lamina', 'taza', 'camiseta'].map((opt) => (
                            <label 
                                key={opt}
                                className={`flex items-center justify-between p-3 md:p-4 border rounded-lg cursor-pointer transition-all ${
                                    purchaseOption === opt 
                                    ? 'border-white/20 bg-[#fbbf24]/10' 
                                    : 'border-white/10 hover:border-white/20'
                                }`}
                            >
                                <div className="flex items-center gap-2 md:gap-3">
                                    <input 
                                        type="radio" 
                                        name="format" 
                                        value={opt}
                                        checked={purchaseOption === opt}
                                        onChange={() => setPurchaseOption(opt as any)}
                                        className="accent-[#fbbf24] w-4 h-4 flex-shrink-0"
                                    />
                                    <div className="flex flex-col">
                                        <span className="font-bold text-[13px] sm:text-sm md:text-base text-[#fef3c7]">
                                            {prices.products[opt as keyof typeof prices.products].name}
                                        </span>
                                    </div>
                                </div>
                                <span className="font-mono text-[#fbbf24] font-medium text-xs md:text-base whitespace-nowrap">
                                    {getPriceDisplay(opt)}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Secure Form (Only for paid items) */}
                {purchaseOption !== 'original' && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="space-y-4 pt-4 border-t border-white/10"
                    >
                        <div>
                            <label className="block text-xs uppercase text-white/40 mb-1">Email de Contacto</label>
                            <input 
                                type="email" required 
                                value={email} onChange={e => setEmail(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded p-3 text-white placeholder-white/20 focus:border-[#fbbf24] focus:outline-none transition-colors"
                                placeholder="tu@email.com"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="col-span-2">
                                <label className="block text-xs uppercase text-white/40 mb-1">Dirección de Envío</label>
                                <input 
                                    placeholder="Calle y número" required 
                                    value={shipping.calle} onChange={e => setShipping({...shipping, calle: e.target.value})}
                                    className="w-full bg-black/40 border border-white/10 rounded p-3 text-white focus:border-[#fbbf24] focus:outline-none"
                                />
                            </div>
                            <input 
                                placeholder="Ciudad" required 
                                value={shipping.ciudad} onChange={e => setShipping({...shipping, ciudad: e.target.value})}
                                className="bg-black/40 border border-white/10 rounded p-3 text-white focus:border-[#fbbf24] focus:outline-none"
                            />
                            <input 
                                placeholder="C. Postal" required 
                                value={shipping.codigo_postal} onChange={e => setShipping({...shipping, codigo_postal: e.target.value})}
                                className="bg-black/40 border border-white/10 rounded p-3 text-white focus:border-[#fbbf24] focus:outline-none"
                            />
                        </div>
                    </motion.div>
                )}

                {error && <p className="text-red-400 text-sm bg-red-900/20 p-3 rounded border border-red-900/50">{error}</p>}

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-[#fbbf24] text-black py-4 font-bold uppercase tracking-[0.2em] hover:bg-[#f59e0b] transition-all shadow-lg hover:shadow-[#fbbf24]/30 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                >
                  {loading ? "Procesando..." : (purchaseOption === 'original' ? t.modal.cta.inquire : `Pagar ${getPriceDisplay(purchaseOption)}`)}
                </button>
                
                {purchaseOption !== 'original' && (
                    <p className="text-center text-xs text-white/30 flex items-center justify-center gap-2">
                        <span>🔒 Pago Seguro procesado por Stripe</span>
                    </p>
                )}
              </form>

              {/* Related - Hidden on mobile if form is long, visible on desktop */}
              <div className="hidden md:block mt-12 pt-8 border-t border-white/10">
                 <h4 className="text-xs uppercase text-white/30 mb-4 tracking-widest">{t.modal.related}</h4>
                 <div className="grid grid-cols-2 gap-4">
                    {getRelatedArtworks(artwork.id).map(related => (
                      <div 
                        key={related.id} 
                        className="group cursor-pointer flex gap-3 items-center"
                        onClick={() => onRelatedClick(related)}
                      >
                         <div className="w-12 h-12 bg-[#0c0a09] overflow-hidden rounded">
                           <img 
                             src={related.image} 
                             alt={related.title[lang]}
                             className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all" 
                           />
                         </div>
                         <div className="text-xs font-bold text-white/50 group-hover:text-[#fbbf24] truncate transition-colors">{related.title[lang]}</div>
                      </div>
                    ))}
                 </div>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ArtworkModal;
