
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


export interface Artwork {
  id: string;
  title: { es: string; en: string };
  technique: { es: string; en: string };
  image: string;
  year: string;
  dimensions: string;
  description: { es: string; en: string };
  status: 'available' | 'sold' | 'reserved';
  detailImages?: string[];
  stock?: {
    original: number;
    prints: number;
    digital: number;
  };
  prices?: {
    original: number | null;
    print: number | null;
    digital: number | null;
  };
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum Section {
  HERO = 'hero',
  GALLERY = 'gallery',
  COLLECTIONS = 'collections',
  ACQUISITION = 'acquisition',
}

export interface Translations {
  nav: {
    gallery: string;
    collections: string;
    writings: string;
    about: string;
    acquire: string;
  };
  hero: {
    location: string;
    virtualGallery: string;
    subheader: string;
    description: string;
  };
  gallery: {
    title: string;
    subtitle: string;
    swipe: string;
    filters: {
      all: string;
      available: string;
      sold: string;
      reserved: string;
    };
  };
  features: {
    title: string;
    subtitle: string;
    description: string;
    items: { title: string; desc: string }[];
  };
  acquisition: {
    title: string;
    subtitle: string;
    tiers: { name: string; price: string; subtitle: string; features: string[] }[];
    cta: {
      add: string;
      adding: string;
      another: string;
    };
  };
  cart: {
    title: string;
    empty: string;
    viewOptions: string;
    subtotal: string;
    consult: string;
    checkout: string;
    note: string;
  };
  modal: {
    year: string;
    consult: string;
    related: string;
    sold: string;
    reserved: string;
    purchaseOptions: string;
    original: {
      title: string;
      desc: string;
      inquire: string;
    };
    print: {
      title: string;
      desc: string;
    };
    digital: {
      title: string;
      desc: string;
    };
    cta: {
      inquire: string;
      add: string;
    };
  };
  cursor: string;
}
