/** @jsxImportSource react */
import { useStore } from '@nanostores/react';
import { $language } from '@/stores/language';
import { addToCart } from '@/stores/cart';
import { translations } from '@/data/translations';
import { motion } from 'framer-motion';

export default function ProductCard({ artwork, priceData }) {
    const lang = useStore($language);
    const t = translations[lang] || translations.es;
    const title = artwork.title[lang] || artwork.title['es'];

    const handleAdd = () => {
        addToCart({
            artworkId: artwork.id,
            title: title,
            image: artwork.image,
            type: 'original',
            price: priceData.amount
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-surface-dark border border-white/5 p-4 group hover:border-accent/40 transition-all duration-500"
        >
            <div className="relative aspect-square overflow-hidden mb-6">
                <img
                    src={artwork.image}
                    alt={title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-start">
                    <h3 className="font-heading text-sm text-white uppercase tracking-widest">{title}</h3>
                    <span className="text-accent text-sm font-bold tracking-tighter">{priceData.amount} €</span>
                </div>

                <p className="text-[10px] text-muted-foreground font-body uppercase tracking-widest">
                    {artwork.technique[lang]}
                </p>

                <button
                    onClick={handleAdd}
                    className="w-full py-4 bg-transparent border border-accent text-accent text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-accent hover:text-surface-dark transition-all duration-500"
                >
                    {t.modal.cta.add}
                </button>
            </div>
        </motion.div>
    );
}
