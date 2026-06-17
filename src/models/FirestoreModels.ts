import type { FirestoreRecord } from '../services/firestoreService';

// ─── Produto ─────────────────────────────────────────────────────────────────
export interface FSProduct extends FirestoreRecord {
  name: string;
  cat: 'mobiliario' | 'sagrada' | 'decoracao' | 'sazonal';
  catLabel: string;
  wood: string;
  price: string;
  priceNote: string;
  tag?: string;
  tagVariant?: 'green' | 'yellow';
  imageUrl?: string;
  imagePublicId?: string;
  active: boolean;
  order: number;
}

// ─── Categoria ───────────────────────────────────────────────────────────────
export interface FSCategory extends FirestoreRecord {
  key: string;
  name: string;
  count: number;
  placeholder: string;
  order: number;
}

// ─── Depoimento ──────────────────────────────────────────────────────────────
export interface FSTestimonial extends FirestoreRecord {
  initials: string;
  name: string;
  location: string;
  text: string;
  rating: number;
  active: boolean;
  order: number;
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────
export interface FSFaqItem extends FirestoreRecord {
  q: string;
  a: string;
  active: boolean;
  order: number;
}

// ─── Settings ────────────────────────────────────────────────────────────────
export interface FSSettings extends FirestoreRecord {
  announceText: string;
  announceActive: boolean;
  waNumber: string;
  heroChip: string;
  heroTitle: string;
  heroLede: string;
  instagramHandle: string;
  contactEmail: string;
  contactPhone: string;
  contactHours: string;
}
