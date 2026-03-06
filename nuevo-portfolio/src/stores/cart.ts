/**
 * Cart Store — Nanostores (shared across Astro + React islands)
 * Replaces CartContext.tsx from the original React SPA
 */
import { atom, computed } from 'nanostores';

export interface CartItem {
    id: string;
    artworkId: string;
    title: string;
    image: string;
    type: 'original' | 'print' | 'digital';
    price: number;
}

// State atoms
export const $cartItems = atom<CartItem[]>([]);
export const $isCartOpen = atom(false);
export const $isCheckoutOpen = atom(false);

// Computed values
export const $cartTotal = computed($cartItems, (items) =>
    items.reduce((sum, item) => sum + item.price, 0)
);

export const $cartCount = computed($cartItems, (items) => items.length);

// Actions
export function addToCart(item: Omit<CartItem, 'id'>) {
    const id = `${item.artworkId}-${item.type}-${Date.now()}`;
    $cartItems.set([...$cartItems.get(), { ...item, id }]);
    $isCartOpen.set(true);
}

export function removeFromCart(id: string) {
    $cartItems.set($cartItems.get().filter((item) => item.id !== id));
}

export function clearCart() {
    $cartItems.set([]);
}

export function toggleCart() {
    $isCartOpen.set(!$isCartOpen.get());
}

export function openCheckout() {
    $isCheckoutOpen.set(true);
}

export function closeCheckout() {
    $isCheckoutOpen.set(false);
}
