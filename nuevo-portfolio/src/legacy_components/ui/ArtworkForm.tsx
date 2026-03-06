import React, { useState, useEffect } from 'react';
import { X, Save, Image as ImageIcon } from 'lucide-react';
import { Artwork } from '../../types';

interface ArtworkFormProps {
    artwork?: Artwork;
    onSubmit: (data: any) => Promise<void>;
    onCancel: () => void;
}

const ArtworkForm: React.FC<ArtworkFormProps> = ({ artwork, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        title: { es: '', en: '' },
        technique: { es: '', en: '' },
        image: '',
        year: new Date().getFullYear().toString(),
        dimensions: '',
        status: 'available',
        description: { es: '', en: '' },
        stock: { original: 1, prints: 0, digital: 999 },
        prices: { original: 0, print: 0, digital: 0 }
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (artwork) {
            setFormData({
                title: { es: artwork.title.es, en: artwork.title.en },
                technique: { es: artwork.technique.es, en: artwork.technique.en },
                image: artwork.image,
                year: artwork.year,
                dimensions: artwork.dimensions,
                status: artwork.status,
                description: { es: artwork.description.es, en: artwork.description.en },
                stock: {
                    original: artwork.stock?.original || 1,
                    prints: artwork.stock?.prints || 0,
                    digital: artwork.stock?.digital || 999
                },
                prices: {
                    original: artwork.prices?.original || 0,
                    print: artwork.prices?.print || 0,
                    digital: artwork.prices?.digital || 0
                }
            });
        }
    }, [artwork]);

    const handleChange = (section: string, field: string, value: any) => {
        setFormData(prev => {
            if (section === 'root') {
                return { ...prev, [field]: value };
            }
            return {
                ...prev,
                [section]: {
                    ...(prev as any)[section],
                    [field]: value
                }
            };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSubmit(formData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#1c1917] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="p-6 border-b border-white/10 flex justify-between items-center sticky top-0 bg-[#1c1917] z-10">
                    <h2 className="text-2xl font-bold text-[#fef3c7]">
                        {artwork ? 'Edit Artwork' : 'New Artwork'}
                    </h2>
                    <button onClick={onCancel} className="text-white/50 hover:text-white" aria-label="Close modal">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-8">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="text-white/50 text-sm uppercase tracking-widest border-b border-white/10 pb-2">Information</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-[#fbbf24] mb-1 block">Title (ES)</label>
                                    <input required aria-label="Title in Spanish" className="w-full bg-black/30 border border-white/10 rounded p-2 text-white text-sm"
                                        value={formData.title.es} onChange={e => handleChange('title', 'es', e.target.value)} />
                                </div>
                                <div>
                                    <label className="text-xs text-[#fbbf24] mb-1 block">Title (EN)</label>
                                    <input required aria-label="Title in English" className="w-full bg-black/30 border border-white/10 rounded p-2 text-white text-sm"
                                        value={formData.title.en} onChange={e => handleChange('title', 'en', e.target.value)} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-[#fbbf24] mb-1 block">Technique (ES)</label>
                                    <input required aria-label="Technique in Spanish" className="w-full bg-black/30 border border-white/10 rounded p-2 text-white text-sm"
                                        value={formData.technique.es} onChange={e => handleChange('technique', 'es', e.target.value)} />
                                </div>
                                <div>
                                    <label className="text-xs text-[#fbbf24] mb-1 block">Technique (EN)</label>
                                    <input required aria-label="Technique in English" className="w-full bg-black/30 border border-white/10 rounded p-2 text-white text-sm"
                                        value={formData.technique.en} onChange={e => handleChange('technique', 'en', e.target.value)} />
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="text-xs text-[#fbbf24] mb-1 block">Year</label>
                                    <input required aria-label="Year of creation" className="w-full bg-black/30 border border-white/10 rounded p-2 text-white text-sm"
                                        value={formData.year} onChange={e => handleChange('root', 'year', e.target.value)} />
                                </div>
                                <div>
                                    <label className="text-xs text-[#fbbf24] mb-1 block">Dimensions</label>
                                    <input required aria-label="Dimensions" className="w-full bg-black/30 border border-white/10 rounded p-2 text-white text-sm"
                                        value={formData.dimensions} onChange={e => handleChange('root', 'dimensions', e.target.value)} />
                                </div>
                                <div>
                                    <label className="text-xs text-[#fbbf24] mb-1 block">Status</label>
                                    <select aria-label="Status" className="w-full bg-black/30 border border-white/10 rounded p-2 text-white text-sm h-[38px]"
                                        value={formData.status} onChange={e => handleChange('root', 'status', e.target.value)}>
                                        <option value="available">Available</option>
                                        <option value="sold">Sold</option>
                                        <option value="reserved">Reserved</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-white/50 text-sm uppercase tracking-widest border-b border-white/10 pb-2">Media</h3>
                            <div>
                                <label className="text-xs text-[#fbbf24] mb-1 block">Image URL (path)</label>
                                <div className="flex gap-2">
                                    <input required aria-label="Image absolute path" className="w-full bg-black/30 border border-white/10 rounded p-2 text-white text-sm"
                                        value={formData.image} onChange={e => handleChange('root', 'image', e.target.value)}
                                        placeholder="/images/example.jpg" />
                                    <div className="w-10 h-10 bg-black rounded border border-white/10 flex items-center justify-center overflow-hidden">
                                        {formData.image ? <img src={formData.image} alt="Preview" className="w-full h-full object-cover" /> : <ImageIcon className="w-4 h-4 text-white/20" />}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="text-xs text-[#fbbf24] mb-1 block">Description (ES)</label>
                                <textarea aria-label="Description in Spanish" className="w-full bg-black/30 border border-white/10 rounded p-2 text-white text-sm h-20"
                                    value={formData.description.es} onChange={e => handleChange('description', 'es', e.target.value)} />
                            </div>
                            <div>
                                <label className="text-xs text-[#fbbf24] mb-1 block">Description (EN)</label>
                                <textarea aria-label="Description in English" className="w-full bg-black/30 border border-white/10 rounded p-2 text-white text-sm h-20"
                                    value={formData.description.en} onChange={e => handleChange('description', 'en', e.target.value)} />
                            </div>
                        </div>
                    </div>

                    {/* Stock & Prices */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="text-white/50 text-sm uppercase tracking-widest border-b border-white/10 pb-2">Inventory (Stock)</h3>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="text-xs text-[#fbbf24] mb-1 block">Originals</label>
                                    <input aria-label="Stock of originals" type="number" className="w-full bg-black/30 border border-white/10 rounded p-2 text-white text-sm"
                                        value={formData.stock.original} onChange={e => handleChange('stock', 'original', e.target.value)} />
                                </div>
                                <div>
                                    <label className="text-xs text-[#fbbf24] mb-1 block">Prints</label>
                                    <input aria-label="Stock of prints" type="number" className="w-full bg-black/30 border border-white/10 rounded p-2 text-white text-sm"
                                        value={formData.stock.prints} onChange={e => handleChange('stock', 'prints', e.target.value)} />
                                </div>
                                <div>
                                    <label className="text-xs text-[#fbbf24] mb-1 block">Digital</label>
                                    <input aria-label="Stock of digital copies" type="number" className="w-full bg-black/30 border border-white/10 rounded p-2 text-white text-sm"
                                        value={formData.stock.digital} onChange={e => handleChange('stock', 'digital', e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-white/50 text-sm uppercase tracking-widest border-b border-white/10 pb-2">Pricing (€)</h3>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="text-xs text-[#fbbf24] mb-1 block">Original Price</label>
                                    <input aria-label="Price of original" type="number" step="0.01" className="w-full bg-black/30 border border-white/10 rounded p-2 text-white text-sm"
                                        value={formData.prices.original} onChange={e => handleChange('prices', 'original', e.target.value)} />
                                </div>
                                <div>
                                    <label className="text-xs text-[#fbbf24] mb-1 block">Print Price</label>
                                    <input aria-label="Price of print" type="number" step="0.01" className="w-full bg-black/30 border border-white/10 rounded p-2 text-white text-sm"
                                        value={formData.prices.print} onChange={e => handleChange('prices', 'print', e.target.value)} />
                                </div>
                                <div>
                                    <label className="text-xs text-[#fbbf24] mb-1 block">Digital Price</label>
                                    <input aria-label="Price of digital copy" type="number" step="0.01" className="w-full bg-black/30 border border-white/10 rounded p-2 text-white text-sm"
                                        value={formData.prices.digital} onChange={e => handleChange('prices', 'digital', e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
                        <button type="button" onClick={onCancel} className="px-6 py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-all">
                            Cancel
                        </button>
                        <button type="submit" disabled={loading} className="px-6 py-3 rounded-xl bg-[#fbbf24] text-black font-bold hover:bg-[#d97706] transition-all flex items-center gap-2">
                            <Save className="w-4 h-4" />
                            {loading ? 'Saving...' : 'Save Artwork'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ArtworkForm;
