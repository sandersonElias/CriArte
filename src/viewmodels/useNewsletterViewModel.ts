import { useState, useCallback, useRef } from 'react';

export function useNewsletterViewModel() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail('');
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setSubscribed(false), 2400);
  }, []);

  return { email, setEmail, subscribed, handleSubmit };
}
