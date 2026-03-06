import { useState, useEffect } from 'react';
import { Artwork } from '../types';
import { GALLERY as STATIC_GALLERY } from '../data/artworks';

export const useArtworks = () => {
    const [artworks, setArtworks] = useState<Artwork[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchArtworks = async () => {
            try {
                const response = await fetch('/api/artworks');
                if (!response.ok) throw new Error('Failed to fetch artworks');
                const data = await response.json();
                setArtworks(data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching artworks, falling back to static data:', err);
                // Fallback to static data if API fails (good for robustness)
                setArtworks(STATIC_GALLERY);
                setError('Failed to load live data');
                setLoading(false);
            }
        };

        fetchArtworks();
    }, []);

    return { artworks, loading, error };
};
