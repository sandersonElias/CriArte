import { useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';

export function useAdminAuth() {
  const { user, loading, login, logout } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const handleLogin = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setBusy(true);
      setError(null);
      try {
        await login(email, password);
      } catch (err: unknown) {
        const msg = (err as { code?: string })?.code;
        if (
          msg === 'auth/user-not-found' ||
          msg === 'auth/wrong-password' ||
          msg === 'auth/invalid-credential'
        ) {
          setError('E-mail ou senha incorretos.');
        } else if (msg === 'auth/too-many-requests') {
          setError('Muitas tentativas. Aguarde alguns minutos.');
        } else {
          setError('Erro ao entrar. Tente novamente.');
        }
      } finally {
        setBusy(false);
      }
    },
    [email, password, login],
  );

  const handleLogout = useCallback(async () => {
    await logout();
  }, [logout]);

  return {
    user,
    loading,
    email,
    setEmail,
    password,
    setPassword,
    error,
    busy,
    handleLogin,
    handleLogout,
  };
}
