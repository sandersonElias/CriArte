import type { FC } from 'react';
import { ImageSlot } from '../components/ImageSlot';
import { waLink } from '../../utils/whatsapp';

export const CustomSection: FC = () => (
  <section className="custom-section" id="custom" data-reveal>
    <div className="custom-card">
      <div className="custom-card__body">
        <div className="custom-card__label">— Sob medida</div>
        <h2 className="custom-card__title">
          Sua ideia,
          <br />
          nossa <em>bancada</em>.
        </h2>
        <p className="custom-card__text">
          Conte o que tem em mente. Em até 48h enviamos uma proposta com
          cronograma, madeira sugerida e estimativa de investimento. Você
          acompanha cada etapa pelo WhatsApp.
        </p>
        <div className="custom-card__actions">
          <a
            className="btn btn--yellow"
            href={waLink('Olá! Quero uma peça sob medida na CRI Artes.')}
            target="_blank"
            rel="noopener noreferrer"
          >
            Falar no WhatsApp →
          </a>
          <a className="btn btn--ghost-light" href="mailto:atelie@criartes.cl">
            Enviar e-mail
          </a>
        </div>
      </div>

      <div className="custom-card__img">
        <ImageSlot placeholder="Foto ateliê / mãos trabalhando" />
      </div>
    </div>
  </section>
);
