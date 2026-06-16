import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  type DocumentData,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from './firebase';

// ─── Coleções ────────────────────────────────────────────────────────────────
export type CollectionName =
  | 'products'
  | 'categories'
  | 'testimonials'
  | 'faq'
  | 'settings'; // announce bar + outras configs globais

// ─── Tipos base ──────────────────────────────────────────────────────────────
export interface FirestoreRecord extends DocumentData {
  id: string;
  createdAt?: unknown;
  updatedAt?: unknown;
}

// ─── LEITURA (uma vez) ───────────────────────────────────────────────────────
export async function fetchCollection<T extends FirestoreRecord>(
  col: CollectionName,
  orderField = 'createdAt',
): Promise<T[]> {
  const q = query(collection(db, col), orderBy(orderField, 'asc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as T);
}

export async function fetchDocument<T extends FirestoreRecord>(
  col: CollectionName,
  id: string,
): Promise<T | null> {
  const snap = await getDoc(doc(db, col, id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as T;
}

// ─── LEITURA EM TEMPO REAL ───────────────────────────────────────────────────
export function subscribeCollection<T extends FirestoreRecord>(
  col: CollectionName,
  callback: (docs: T[]) => void,
  orderField = 'createdAt',
): Unsubscribe {
  const q = query(collection(db, col), orderBy(orderField, 'asc'));
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as T));
  });
}

export function subscribeDocument<T extends FirestoreRecord>(
  col: CollectionName,
  id: string,
  callback: (doc: T | null) => void,
): Unsubscribe {
  return onSnapshot(doc(db, col, id), (snap) => {
    callback(snap.exists() ? ({ id: snap.id, ...snap.data() } as T) : null);
  });
}

// ─── ESCRITA ─────────────────────────────────────────────────────────────────
export async function createDocument<T extends DocumentData>(
  col: CollectionName,
  data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>,
): Promise<string> {
  const ref = await addDoc(collection(db, col), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function upsertDocument<T extends DocumentData>(
  col: CollectionName,
  id: string,
  data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>,
): Promise<void> {
  await setDoc(
    doc(db, col, id),
    { ...data, updatedAt: serverTimestamp() },
    { merge: true },
  );
}

export async function updateDocument<T extends DocumentData>(
  col: CollectionName,
  id: string,
  data: Partial<Omit<T, 'id' | 'createdAt'>>,
): Promise<void> {
  await updateDoc(doc(db, col, id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteDocument(
  col: CollectionName,
  id: string,
): Promise<void> {
  await deleteDoc(doc(db, col, id));
}
