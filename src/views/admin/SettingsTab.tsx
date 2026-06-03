import type { FC } from 'react';
import { useAdminSettings } from '../../viewmodels/useAdminSettings';

export const SettingsTab: FC = () => {
  const { form, loading, busy, saved, error, handleChange, handleSave } =
    useAdminSettings();

  if (loading) return <div className="adm-loading">Carregando…</div>;

  return (
    <form onSubmit={handleSave}>
      {/* ── Faixa de anúncio ─────────────────────────────────────── */}
      <section className="adm-section">
        <h3 className="adm-section__title">
          <i className="ti ti-speakerphone" aria-hidden="true" />
          Faixa de anúncio
        </h3>
        <div className="adm-grid-2">
          <div className="adm-field adm-field--full">
            <label>Texto da faixa</label>
            <input
              name="announceText"
              value={form.announceText}
              onChange={handleChange}
              placeholder="Frete monitorado · 10× sem juros…"
            />
            <span className="adm-field__hint">
              Use · para separar itens. Texto em negrito: escreva entre
              &lt;strong&gt;&lt;/strong&gt;
            </span>
          </div>
          <div className="adm-field adm-field--check">
            <label>
              <input
                type="checkbox"
                name="announceActive"
                checked={form.announceActive}
                onChange={handleChange}
              />
              Faixa visível no site
            </label>
          </div>
        </div>
      </section>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="adm-section">
        <h3 className="adm-section__title">
          <i className="ti ti-home" aria-hidden="true" />
          Seção Hero (início da página)
        </h3>
        <div className="adm-grid-2">
          <div className="adm-field">
            <label>Texto do chip (destaque verde)</label>
            <input
              name="heroChip"
              value={form.heroChip}
              onChange={handleChange}
            />
          </div>
          <div className="adm-field adm-field--full">
            <label>Título principal</label>
            <input
              name="heroTitle"
              value={form.heroTitle}
              onChange={handleChange}
            />
          </div>
          <div className="adm-field adm-field--full">
            <label>Subtítulo (lede)</label>
            <textarea
              name="heroLede"
              rows={2}
              value={form.heroLede}
              onChange={handleChange}
            />
          </div>
        </div>
      </section>

      {/* ── WhatsApp ─────────────────────────────────────────────── */}
      <section className="adm-section">
        <h3 className="adm-section__title">
          <i className="ti ti-brand-whatsapp" aria-hidden="true" />
          WhatsApp
        </h3>
        <div className="adm-field" style={{ maxWidth: 360 }}>
          <label>Número (somente dígitos, com DDI)</label>
          <input
            name="waNumber"
            value={form.waNumber}
            onChange={handleChange}
            placeholder="5511999990000"
          />
          <span className="adm-field__hint">
            Ex: 5511987654321 (55 = Brasil)
          </span>
        </div>
      </section>

      {/* ── Instagram e Contato ──────────────────────────────────── */}
      <section className="adm-section">
        <h3 className="adm-section__title">
          <i className="ti ti-address-book" aria-hidden="true" />
          Contato e redes sociais
        </h3>
        <div className="adm-grid-2">
          <div className="adm-field">
            <label>Instagram</label>
            <input
              name="instagramHandle"
              value={form.instagramHandle}
              onChange={handleChange}
              placeholder="@criartes_cl"
            />
          </div>
          <div className="adm-field">
            <label>E-mail de contato</label>
            <input
              type="email"
              name="contactEmail"
              value={form.contactEmail}
              onChange={handleChange}
            />
          </div>
          <div className="adm-field">
            <label>Telefone</label>
            <input
              name="contactPhone"
              value={form.contactPhone}
              onChange={handleChange}
            />
          </div>
          <div className="adm-field">
            <label>Horário de atendimento</label>
            <input
              name="contactHours"
              value={form.contactHours}
              onChange={handleChange}
              placeholder="Seg–Sex · 9h às 18h"
            />
          </div>
        </div>
      </section>

      {/* ── Ações ────────────────────────────────────────────────── */}
      {error && <div className="adm-error">{error}</div>}

      <div className="adm-settings-foot">
        <button
          type="submit"
          className="adm-btn adm-btn--primary"
          disabled={busy}
        >
          {busy ? 'Salvando…' : 'Salvar configurações'}
        </button>
        {saved && (
          <span className="adm-saved">
            <i className="ti ti-circle-check" aria-hidden="true" />
            Salvo com sucesso!
          </span>
        )}
      </div>
    </form>
  );
};
