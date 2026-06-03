import { useState, useEffect } from 'react';
import { subscribeCollection } from '../services/firestoreService';
import type { FSTestimonial } from '../models/FirestoreModels';
import type { Testimonial } from '../models/Testimonial';
import { useSlider } from '../hooks/useSlider';

const CHUNK = 3; // depoimentos por slide

function chunkArray<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

export function useTestimonialsViewModel() {
  const [raw, setRaw] = useState<FSTestimonial[]>([]);

  useEffect(() => {
    const unsub = subscribeCollection<FSTestimonial>(
      'testimonials',
      (docs) => {
        setRaw(docs.filter((t) => t.active).sort((a, b) => a.order - b.order));
      },
      'order',
    );
    return unsub;
  }, []);

  const slides: Testimonial[][] = chunkArray(
    raw.map((t) => ({
      initials: t.initials,
      name: t.name,
      location: t.location,
      text: t.text,
    })),
    CHUNK,
  );

  // Garante mínimo de 1 slide para o hook não quebrar com length=0
  const total = Math.max(slides.length, 1);
  const slider = useSlider(total);

  return { slides, ...slider };
}
