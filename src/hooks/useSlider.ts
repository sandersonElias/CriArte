import { useState, useRef, useCallback, useEffect } from 'react';

export function useSlider(total: number, interval = 6000) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((k: number) => setIndex((k + total) % total), [total]);

  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  const startAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(
      () => setIndex((i) => (i + 1) % total),
      interval,
    );
  }, [total, interval]);

  const stopAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, [startAutoplay, stopAutoplay]);

  return { index, go, next, prev, startAutoplay, stopAutoplay };
}
