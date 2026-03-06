/** @jsxImportSource react */
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AIChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: '¡Hola! Soy el asistente virtual de Francesc Chimelis. ¿En qué puedo ayudarte a explorar su universo artístico?' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef(null);

    const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    useEffect(() => scrollToBottom(), [messages]);

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userMsg = { role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: [...messages, userMsg] })
            });
            const data = await res.json();
            setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
        } catch (err) {
            setMessages(prev => [...prev, { role: 'assistant', content: 'Lo siento, ha habido un problema de conexión. ¿Puedes intentarlo de nuevo?' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Botón Flotante */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-10 left-10 z-[150] w-14 h-14 bg-surface rounded-full border border-white/10 flex items-center justify-center shadow-2xl hover:border-accent/50 transition-all text-accent"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" /></svg>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.95 }}
                        className="fixed bottom-28 left-10 z-[150] w-[350px] h-[500px] bg-surface-dark border border-white/5 shadow-2xl rounded-2xl flex flex-col overflow-hidden"
                    >
                        <div className="p-6 bg-surface border-b border-white/5 flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                                <span className="text-surface-dark font-bold text-xs">AI</span>
                            </div>
                            <p class="font-heading text-[10px] text-white uppercase tracking-widest">Asistente de Arte</p>
                        </div>

                        <div className="flex-grow overflow-y-auto p-6 space-y-4 no-scrollbar">
                            {messages.map((m, i) => (
                                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-4 rounded-xl text-xs font-body leading-relaxed ${m.role === 'user' ? 'bg-accent text-surface-dark rounded-tr-none' : 'bg-white/5 text-muted-foreground rounded-tl-none border border-white/5'
                                        }`}>
                                        {m.content}
                                    </div>
                                </div>
                            ))}
                            {loading && <div className="text-[10px] text-accent animate-pulse">Escribiendo...</div>}
                            <div ref={chatEndRef} />
                        </div>

                        <div className="p-4 bg-surface border-t border-white/5 flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Pregunta sobre la obra..."
                                className="flex-grow bg-stone-900 border border-white/10 rounded-lg px-4 py-2 text-xs text-white outline-none focus:border-accent transition-colors"
                                disabled={loading}
                            />
                            <button
                                onClick={handleSend}
                                className="bg-accent text-surface-dark w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white transition-colors"
                                disabled={loading}
                            >
                                ➔
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
