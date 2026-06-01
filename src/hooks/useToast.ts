import { useState, useRef, useCallback } from 'react';

export interface ToastState {
  text: string;
  visible: boolean;
}

export function useToast(duration = 2200) {
  const [toast, setToast] = useState<ToastState>({ text: '', visible: false });
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback(
    (text: string) => {
      setToast({ text, visible: true });
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(
        () => setToast((t) => ({ ...t, visible: false })),
        duration,
      );
    },
    [duration],
  );

  return { toast, show };
}
