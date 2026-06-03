import type { FC } from 'react';
import { useAdminAuth } from '../../viewmodels/useAdminAuth';

export const LoginPage: FC = () => {
  const { email, setEmail, password, setPassword, error, busy, handleLogin } =
    useAdminAuth();

  return (
    <div className="adm-login">
      <div className="adm-login__card">
        <div className="adm-login__brand">
          <div className="adm-login__mark">CRI</div>
          <div>
            <div className="adm-login__name">CRI Artes</div>
            <div className="adm-login__sub">Painel administrativo</div>
          </div>
        </div>

        <h1 className="adm-login__title">Entrar</h1>
        <p className="adm-login__desc">
          Acesso restrito a funcionários autorizados.
        </p>

        <form onSubmit={handleLogin} className="adm-login__form">
          <div className="adm-field">
            <label htmlFor="adm-email">E-mail</label>
            <input
              id="adm-email"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="funcionario@criartes.cl"
            />
          </div>

          <div className="adm-field">
            <label htmlFor="adm-pass">Senha</label>
            <input
              id="adm-pass"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          {error && <div className="adm-error">{error}</div>}

          <button
            type="submit"
            className="adm-btn adm-btn--primary adm-btn--full"
            disabled={busy}
          >
            {busy ? 'Entrando…' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
};
