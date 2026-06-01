import type { FC } from 'react';
import { FaqItem } from '../components/FaqItem';
import { useFaqViewModel } from '../../viewmodels/useFaqViewModel';
import { waLink } from '../../utils/whatsapp';

export const FaqSection: FC = () => {
  const { items, openIndex, toggle } = useFaqViewModel();

  return (
    <section className="faq-section" id="faq" data-reveal>
      <div className="faq-grid">
        {/* Sidebar */}
        <div>
          <div className="faq-sidebar__meta">— Dúvidas frequentes</div>
          <h2 className="faq-sidebar__title">
            Antes de <span className="y">encomendar</span>.
          </h2>
          <p className="faq-sidebar__body">
            Não encontrou o que precisava? Fale com a gente pelo WhatsApp —
            respondemos em até 2 horas.
          </p>
          <a
            className="btn"
            style={{ marginTop: 24 }}
            href={waLink('Olá! Tenho uma dúvida antes de encomendar.')}
            target="_blank"
            rel="noopener noreferrer"
          >
            Falar no WhatsApp →
          </a>
        </div>

        {/* Accordion */}
        <div className="faq-list" role="list">
          {items.map((item, i) => (
            <FaqItem
              key={item.q}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
