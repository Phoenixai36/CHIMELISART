import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useArtworks } from '../../hooks/useArtworks';
import { Lock, Save, Package, RefreshCcw, LogOut, TrendingUp, ShoppingBag, CreditCard, Plus, Edit2, Trash2 } from 'lucide-react';
import ArtworkForm from '../ui/ArtworkForm';
import { Artwork } from '../../types';

const AdminPage: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const { artworks, loading, error } = useArtworks();
    const [isUpdating, setIsUpdating] = useState<string | null>(null);
    const [stats, setStats] = useState<any>(null);

    // CRUD State
    const [showForm, setShowForm] = useState(false);
    const [editingArtwork, setEditingArtwork] = useState<Artwork | undefined>(undefined);

    const fetchStats = async () => {
        try {
            const resp = await fetch('/api/admin/stats');
            const data = await resp.json();
            setStats(data);
        } catch (e) { console.error('Stats load failed'); }
    };

    useEffect(() => {
        if (isAuthenticated) fetchStats();
    }, [isAuthenticated]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });
            if (response.ok) {
                setIsAuthenticated(true);
            } else {
                setLoginError('Incorrect password');
            }
        } catch (err) {
            setLoginError('Communication error');
        }
    };

    const handleSaveArtwork = async (data: any) => {
        const method = editingArtwork ? 'PUT' : 'POST';
        const url = editingArtwork ? `/api/artworks/${editingArtwork.id}` : '/api/artworks';

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                setShowForm(false);
                setEditingArtwork(undefined);
                window.location.reload(); // Refresh to see changes
            } else {
                alert('Failed to save artwork');
            }
        } catch (error) {
            console.error('Save failed', error);
            alert('Error saving artwork');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this artwork? This cannot be undone.')) return;

        try {
            const response = await fetch(`/api/artworks/${id}`, { method: 'DELETE' });
            if (response.ok) {
                window.location.reload();
            } else {
                alert('Failed to delete');
            }
        } catch (error) {
            console.error('Delete failed', error);
        }
    };

    const openEdit = (art: Artwork) => {
        setEditingArtwork(art);
        setShowForm(true);
    };

    const openNew = () => {
        setEditingArtwork(undefined);
        setShowForm(true);
    };

    const handleUpdateStock = async (id: string, updates: any) => {
        setIsUpdating(id);
        try {
            const response = await fetch(`/api/artworks/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates),
            });
            if (response.ok) {
                // Simple way to refresh after update
                window.location.reload();
            }
        } catch (err) {
            console.error('Update failed');
        } finally {
            setIsUpdating(null);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#0c0a09] flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full p-8 border border-white/10 bg-[#1c1917] rounded-2xl shadow-2xl"
                >
                    <div className="flex justify-center mb-8">
                        <div className="p-4 rounded-full bg-[#fbbf24]/10">
                            <Lock className="w-8 h-8 text-[#fbbf24]" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-heading font-bold text-center mb-2 text-[#fef3c7]">ADMIN PORTAL</h1>
                    <p className="text-white/40 text-center text-sm mb-8 uppercase tracking-widest">Inventory Management</p>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="w-full bg-black/50 border border-white/10 px-4 py-3 rounded-xl focus:border-[#fbbf24] outline-none transition-all text-white"
                            />
                            {loginError && <p className="text-red-500 text-xs mt-2">{loginError}</p>}
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#fbbf24] text-black font-bold py-3 rounded-xl hover:bg-[#d97706] transition-all"
                        >
                            ACCESS DASHBOARD
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0c0a09] pt-32 pb-20 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl font-heading font-bold text-[#fef3c7]">INVENTORY</h1>
                        <p className="text-[#fbbf24]/60 uppercase tracking-widest text-xs mt-1">Management Console</p>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={openNew}
                            className="flex items-center gap-2 px-6 py-3 bg-[#fbbf24] text-black font-bold rounded-xl hover:bg-[#d97706] transition-all shadow-lg"
                        >
                            <Plus className="w-5 h-5" /> Add Artwork
                        </button>
                        <button
                            onClick={() => setIsAuthenticated(false)}
                            className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-lg hover:bg-white/5 text-white/50 hover:text-white transition-all text-sm"
                        >
                            <LogOut className="w-4 h-4" /> Disconnect
                        </button>
                    </div>
                </div>

                {/* Stats Summary Section */}
                {stats && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                        <div className="bg-[#1c1917] p-8 border border-white/5 rounded-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10"><ShoppingBag className="w-16 h-16" /></div>
                            <h4 className="text-white/40 text-xs uppercase tracking-[0.2em] mb-2 font-bold">Total Sales</h4>
                            <div className="text-5xl font-heading text-[#fef3c7] font-bold">{stats.totalOrders}</div>
                            <div className="mt-4 text-[10px] text-[#fbbf24] uppercase tracking-widest font-bold">Completed Transactions</div>
                        </div>
                        <div className="bg-[#1c1917] p-8 border border-white/5 rounded-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10"><CreditCard className="w-16 h-16" /></div>
                            <h4 className="text-white/40 text-xs uppercase tracking-[0.2em] mb-2 font-bold">Revenue</h4>
                            <div className="text-5xl font-heading text-[#fbbf24] font-bold">{stats.revenue}€</div>
                            <div className="mt-4 text-[10px] text-white/40 uppercase tracking-widest">Total Earned</div>
                        </div>
                        <div className="bg-[#1c1917] p-8 border border-white/5 rounded-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10"><TrendingUp className="w-16 h-16" /></div>
                            <h4 className="text-white/40 text-xs uppercase tracking-[0.2em] mb-2 font-bold">Average Ticket</h4>
                            <div className="text-5xl font-heading text-white font-bold">{stats.totalOrders > 0 ? (stats.revenue / stats.totalOrders).toFixed(2) : 0}€</div>
                            <div className="mt-4 text-[10px] text-white/40 uppercase tracking-widest">Per Transaction</div>
                        </div>
                    </div>
                )}

                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-[#fef3c7] mb-6 flex items-center gap-3">
                        <Package className="w-6 h-6 text-[#fbbf24]" /> INVENTORY MANAGEMENT
                    </h2>
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <RefreshCcw className="w-8 h-8 text-[#fbbf24] animate-spin" />
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {artworks.map((art) => (
                                <motion.div
                                    key={art.id}
                                    layout
                                    className="bg-[#1c1917] border border-white/5 rounded-xl p-4 md:p-6 flex flex-col md:flex-row items-center gap-6 group hover:border-white/20 transition-all shadow-lg relative"
                                >
                                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                        <button onClick={() => openEdit(art)} className="p-2 bg-white/10 rounded-lg hover:bg-white/20 text-white" title="Edit">
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => handleDelete(art.id)} className="p-2 bg-red-500/10 rounded-lg hover:bg-red-500/20 text-red-500" title="Delete">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 overflow-hidden rounded-lg bg-black">
                                        <img src={art.image} alt={art.title.en} className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
                                    </div>

                                    <div className="flex-grow text-center md:text-left">
                                        <h3 className="text-xl font-bold text-[#fef3c7]">{art.title.en}</h3>
                                        <p className="text-white/40 text-sm mt-1 uppercase tracking-tighter">{art.technique.en}</p>
                                        <div className="text-[10px] text-white/20 mt-2 font-mono hidden md:block">{art.id}</div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full md:w-auto">
                                        <StatBox
                                            label="Original"
                                            value={art.stock?.original || 0}
                                            onUpdate={(val) => handleUpdateStock(art.id, { stock: { ...art.stock, original: val } })}
                                            disabled={isUpdating === art.id}
                                        />
                                        <StatBox
                                            label="Prints"
                                            value={art.stock?.prints || 0}
                                            onUpdate={(val) => handleUpdateStock(art.id, { stock: { ...art.stock, prints: val } })}
                                            disabled={isUpdating === art.id}
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2 w-full md:w-48">
                                        <select
                                            value={art.status}
                                            onChange={(e) => handleUpdateStock(art.id, { status: e.target.value })}
                                            aria-label="Change artwork status"
                                            className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                                        >
                                            <option value="available">AVAILABLE</option>
                                            <option value="sold">SOLD</option>
                                            <option value="reserved">RESERVED</option>
                                        </select>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Recent Orders Table */}
                {stats?.recentOrders?.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold text-[#fef3c7] mb-6 flex items-center gap-3">
                            <ShoppingBag className="w-6 h-6 text-[#fbbf24]" /> RECENT ORDERS
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="py-4 text-xs uppercase tracking-widest text-white/40">Date</th>
                                        <th className="py-4 text-xs uppercase tracking-widest text-white/40">Customer</th>
                                        <th className="py-4 text-xs uppercase tracking-widest text-white/40">Amount</th>
                                        <th className="py-4 text-xs uppercase tracking-widest text-white/40">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats.recentOrders.map((order: any) => (
                                        <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-all">
                                            <td className="py-4 font-mono text-sm text-white/60">{new Date(order.createdAt).toLocaleDateString()}</td>
                                            <td className="py-4">
                                                <div className="text-white font-bold">{order.customerName}</div>
                                                <div className="text-white/30 text-xs">{order.customerEmail}</div>
                                            </td>
                                            <td className="py-4 text-[#fbbf24] font-bold">{order.totalAmount}€</td>
                                            <td className="py-4">
                                                <span className="px-2 py-1 bg-green-500/10 text-green-500 text-[10px] uppercase font-bold rounded">
                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Modal Form */}
                <AnimatePresence>
                    {showForm && (
                        <ArtworkForm
                            artwork={editingArtwork}
                            onSubmit={handleSaveArtwork}
                            onCancel={() => setShowForm(false)}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

const StatBox: React.FC<{ label: string, value: number, onUpdate: (val: number) => void, disabled?: boolean }> = ({ label, value, onUpdate, disabled }) => (
    <div className="bg-black/30 border border-white/5 p-3 rounded-lg text-center">
        <div className="text-[10px] text-white/30 uppercase tracking-widest mb-1">{label}</div>
        <div className="flex items-center justify-center gap-3">
            <button
                onClick={() => onUpdate(value - 1)}
                disabled={disabled || value <= 0}
                className="text-[#fbbf24] hover:bg-[#fbbf24]/10 w-6 h-6 rounded flex items-center justify-center disabled:opacity-30"
            > - </button>
            <span className="text-lg font-mono font-bold text-[#fef3c7] min-w-[1.5rem]">{value}</span>
            <button
                onClick={() => onUpdate(value + 1)}
                disabled={disabled}
                className="text-[#fbbf24] hover:bg-[#fbbf24]/10 w-6 h-6 rounded flex items-center justify-center"
            > + </button>
        </div>
    </div>
);

export default AdminPage;
